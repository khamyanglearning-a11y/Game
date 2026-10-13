/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  AppScreen,
  AppSettings,
  Board,
  Difficulty,
  GameMode,
  GameStatus,
  HistoryRecord,
  Player,
  ScoreState,
  WinningInfo,
} from './types/game';
import { checkWinningState, createEmptyBoard, getAIMove, isBoardFull } from './utils/gameLogic';
import {
  clearStoredHistory,
  clearStoredScores,
  DEFAULT_SCORES,
  DEFAULT_SETTINGS,
  loadStoredDifficulty,
  loadStoredHistory,
  loadStoredMode,
  loadStoredPlayTime,
  loadStoredScores,
  loadStoredSettings,
  saveStoredDifficulty,
  saveStoredHistory,
  saveStoredMode,
  saveStoredPlayTime,
  saveStoredScores,
  saveStoredSettings,
} from './utils/storage';
import {
  playClickSound,
  playDrawSound,
  playMoveSound,
  playResetSound,
  playWinSound,
} from './utils/sound';

import { WelcomeScreen } from './components/WelcomeScreen';
import { ModeSelectionScreen } from './components/ModeSelectionScreen';
import { DifficultySelectionScreen } from './components/DifficultySelectionScreen';
import { GameTopBar } from './components/GameTopBar';
import { ScoreBoard } from './components/ScoreBoard';
import { TurnBanner } from './components/TurnBanner';
import { GameBoard } from './components/GameBoard';
import { GameActionButtons } from './components/GameActionButtons';
import { SettingsModal } from './components/SettingsModal';
import { HistoryModal } from './components/HistoryModal';
import { RulesModal } from './components/RulesModal';
import { ConfirmModal } from './components/ConfirmModal';

export default function App() {
  // Navigation Flow State: welcome -> select_mode -> select_difficulty -> game
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('welcome');

  // App Persistent State
  const [scores, setScores] = useState<ScoreState>(() => loadStoredScores());
  const [settings, setSettings] = useState<AppSettings>(() => loadStoredSettings());
  const [mode, setMode] = useState<GameMode>(() => loadStoredMode());
  const [difficulty, setDifficulty] = useState<Difficulty>(() => loadStoredDifficulty());
  const [history, setHistory] = useState<HistoryRecord[]>(() => loadStoredHistory());
  const [playTimeSeconds, setPlayTimeSeconds] = useState<number>(() => loadStoredPlayTime());

  // Active Game Round State
  const [board, setBoard] = useState<Board>(createEmptyBoard);
  const [currentTurn, setCurrentTurn] = useState<Player>('X');
  const [status, setStatus] = useState<GameStatus>('in_progress');
  const [winningInfo, setWinningInfo] = useState<WinningInfo | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Modals State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isConfirmResetScoresOpen, setIsConfirmResetScoresOpen] = useState(false);
  const [isConfirmClearHistoryOpen, setIsConfirmClearHistoryOpen] = useState(false);

  // Reference to track active game instance and prevent race conditions with AI moves
  const gameRoundIdRef = useRef<number>(0);

  // Live Play Time Interval Tracker
  useEffect(() => {
    const timer = setInterval(() => {
      setPlayTimeSeconds((prev) => {
        const next = prev + 1;
        // Save to storage every 5 seconds to reduce write frequency
        if (next % 5 === 0) {
          saveStoredPlayTime(next);
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Save play time when unloading
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveStoredPlayTime(playTimeSeconds);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [playTimeSeconds]);

  // Sync settings theme to document element
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  // Persist scores
  useEffect(() => {
    saveStoredScores(scores);
  }, [scores]);

  // Persist settings
  useEffect(() => {
    saveStoredSettings(settings);
  }, [settings]);

  // Persist mode
  useEffect(() => {
    saveStoredMode(mode);
  }, [mode]);

  // Persist difficulty
  useEffect(() => {
    saveStoredDifficulty(difficulty);
  }, [difficulty]);

  // Persist history
  useEffect(() => {
    saveStoredHistory(history);
  }, [history]);

  // New Round logic (clears board only, keeps scores)
  const handleNewRound = useCallback(() => {
    gameRoundIdRef.current += 1;
    setBoard(createEmptyBoard());
    setCurrentTurn('X');
    setStatus('in_progress');
    setWinningInfo(null);
    setIsAiThinking(false);
    playResetSound(settings.soundEnabled);
  }, [settings.soundEnabled]);

  // Reset Scores logic
  const handleConfirmResetScores = () => {
    setScores(DEFAULT_SCORES);
    clearStoredScores();
    setIsConfirmResetScoresOpen(false);
    playResetSound(settings.soundEnabled);
  };

  // Clear History logic
  const handleConfirmClearHistory = () => {
    setHistory([]);
    clearStoredHistory();
    setIsConfirmClearHistoryOpen(false);
    playResetSound(settings.soundEnabled);
  };

  // Sound & Theme toggles
  const handleToggleSound = () => {
    setSettings((prev) => {
      const next = { ...prev, soundEnabled: !prev.soundEnabled };
      if (next.soundEnabled) {
        playClickSound(true);
      }
      return next;
    });
  };

  const handleToggleTheme = () => {
    setSettings((prev) => {
      playClickSound(prev.soundEnabled);
      return { ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' };
    });
  };

  // Screen Flow Handlers
  const handleWelcomeStart = () => {
    playClickSound(settings.soundEnabled);
    setCurrentScreen('select_mode');
  };

  const handleSelectTwoPlayers = () => {
    playClickSound(settings.soundEnabled);
    setMode('pvp');
    handleNewRound();
    setCurrentScreen('game');
  };

  const handleSelectVsComputer = () => {
    playClickSound(settings.soundEnabled);
    setMode('ai');
    setCurrentScreen('select_difficulty');
  };

  const handleSelectDifficulty = (selectedDiff: Difficulty) => {
    playClickSound(settings.soundEnabled);
    setDifficulty(selectedDiff);
    handleNewRound();
    setCurrentScreen('game');
  };

  // Record completed match to history
  const recordMatch = useCallback(
    (winner: Player | 'draw', finalBoard: Board) => {
      const movesCount = finalBoard.filter((cell) => cell !== null).length;
      const newRecord: HistoryRecord = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        timestamp: Date.now(),
        mode,
        difficulty: mode === 'ai' ? difficulty : undefined,
        winner,
        movesCount,
        board: [...finalBoard],
      };
      setHistory((prev) => [newRecord, ...prev]);
    },
    [mode, difficulty]
  );

  // Evaluate board for win or draw
  const handleMoveCompleted = useCallback(
    (newBoard: Board, player: Player): boolean => {
      const win = checkWinningState(newBoard);
      if (win) {
        setStatus('won');
        setWinningInfo(win);
        setScores((prev) => ({
          ...prev,
          [player.toLowerCase() as 'x' | 'o']: prev[player.toLowerCase() as 'x' | 'o'] + 1,
        }));
        recordMatch(player, newBoard);
        playWinSound(settings.soundEnabled);
        return true;
      }

      if (isBoardFull(newBoard)) {
        setStatus('draw');
        setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
        recordMatch('draw', newBoard);
        playDrawSound(settings.soundEnabled);
        return true;
      }

      return false;
    },
    [settings.soundEnabled, recordMatch]
  );

  // Cell Click Handler (for Human moves)
  const handleCellClick = (index: number) => {
    if (board[index] !== null || status !== 'in_progress' || isAiThinking) {
      return;
    }

    if (mode === 'ai' && currentTurn !== 'X') {
      return;
    }

    const player = currentTurn;
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    playMoveSound(player, settings.soundEnabled);

    const isFinished = handleMoveCompleted(newBoard, player);

    if (!isFinished) {
      const nextPlayer: Player = player === 'X' ? 'O' : 'X';
      setCurrentTurn(nextPlayer);
    }
  };

  // AI Turn Effect
  useEffect(() => {
    if (currentScreen !== 'game' || mode !== 'ai' || currentTurn !== 'O' || status !== 'in_progress') {
      return;
    }

    const currentRoundId = gameRoundIdRef.current;
    setIsAiThinking(true);

    const timer = setTimeout(() => {
      if (gameRoundIdRef.current !== currentRoundId) {
        setIsAiThinking(false);
        return;
      }

      const aiMoveIndex = getAIMove(board, difficulty);
      if (aiMoveIndex === -1) {
        setIsAiThinking(false);
        return;
      }

      const newBoard = [...board];
      newBoard[aiMoveIndex] = 'O';
      setBoard(newBoard);
      playMoveSound('O', settings.soundEnabled);

      const isFinished = handleMoveCompleted(newBoard, 'O');
      setIsAiThinking(false);

      if (!isFinished) {
        setCurrentTurn('X');
      }
    }, 450);

    return () => {
      clearTimeout(timer);
    };
  }, [currentScreen, mode, currentTurn, status, board, difficulty, settings.soundEnabled, handleMoveCompleted]);

  const isDark = settings.theme === 'dark';
  const canResetScores = scores.x > 0 || scores.o > 0 || scores.draws > 0;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 flex flex-col justify-between selection:bg-purple-500 selection:text-white ${
        isDark
          ? 'bg-[#090b14] text-slate-100'
          : 'bg-[#f8f9fc] text-slate-900'
      }`}
    >
      {/* Background Neon Ambient Mesh Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {isDark ? (
          <>
            <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-600/10 blur-[120px]" />
            <div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-purple-600/15 blur-[140px]" />
            <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-fuchsia-600/10 blur-[120px]" />
          </>
        ) : (
          <>
            <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-200/30 blur-[100px]" />
            <div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-purple-200/30 blur-[120px]" />
            <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-fuchsia-200/25 blur-[100px]" />
          </>
        )}
      </div>

      {/* Screen Router Viewport */}
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        {/* 1. WELCOME SCREEN */}
        {currentScreen === 'welcome' && (
          <WelcomeScreen
            onStart={handleWelcomeStart}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenHistory={() => setIsHistoryOpen(true)}
            scores={scores}
            playTimeSeconds={playTimeSeconds}
            isDark={isDark}
          />
        )}

        {/* 2. MODE SELECTION SCREEN */}
        {currentScreen === 'select_mode' && (
          <ModeSelectionScreen
            onBack={() => setCurrentScreen('welcome')}
            onSelectTwoPlayers={handleSelectTwoPlayers}
            onSelectVsComputer={handleSelectVsComputer}
            isDark={isDark}
          />
        )}

        {/* 3. DIFFICULTY SELECTION SCREEN */}
        {currentScreen === 'select_difficulty' && (
          <DifficultySelectionScreen
            onBack={() => setCurrentScreen('select_mode')}
            onSelectDifficulty={handleSelectDifficulty}
            isDark={isDark}
          />
        )}

        {/* 4. ACTIVE GAMEPLAY SCREEN */}
        {currentScreen === 'game' && (
          <main className="w-full flex-1 flex flex-col justify-center py-1 sm:py-2 max-w-sm mx-auto">
            {/* Top Navigation Bar */}
            <GameTopBar
              mode={mode}
              difficulty={difficulty}
              onGoHome={() => setCurrentScreen('welcome')}
              onOpenSettings={() => setIsSettingsOpen(true)}
              isDark={isDark}
            />

            {/* Scoreboard */}
            <ScoreBoard
              scores={scores}
              mode={mode}
              difficulty={difficulty}
              isDark={isDark}
            />

            {/* Turn / Win / Draw Banner */}
            <TurnBanner
              status={status}
              currentTurn={currentTurn}
              winningInfo={winningInfo}
              mode={mode}
              difficulty={difficulty}
              isAiThinking={isAiThinking}
              onNewRound={handleNewRound}
              isDark={isDark}
            />

            {/* 3x3 Tactile Game Board */}
            <GameBoard
              board={board}
              currentTurn={currentTurn}
              status={status}
              winningInfo={winningInfo}
              isAiThinking={isAiThinking}
              onCellClick={handleCellClick}
              isDark={isDark}
            />

            {/* In-Game Action Buttons: New Round & Change Mode */}
            <GameActionButtons
              onNewRound={handleNewRound}
              onChangeMode={() => setCurrentScreen('select_mode')}
              onResetScoresClick={() => setIsConfirmResetScoresOpen(true)}
              isDark={isDark}
              canResetScores={canResetScores}
            />
          </main>
        )}
      </div>

      {/* Mobile-Friendly Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onToggleSound={handleToggleSound}
        onToggleTheme={handleToggleTheme}
        playTimeSeconds={playTimeSeconds}
        scores={scores}
        onResetScoresClick={() => setIsConfirmResetScoresOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        isDark={isDark}
      />

      {/* Round History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        history={history}
        onClose={() => setIsHistoryOpen(false)}
        onClearHistoryClick={() => setIsConfirmClearHistoryOpen(true)}
        isDark={isDark}
      />

      {/* Game Rules Modal */}
      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
        isDark={isDark}
      />

      {/* Confirm Reset Scores Modal */}
      <ConfirmModal
        isOpen={isConfirmResetScoresOpen}
        title="Reset Scores to Zero?"
        message="Are you sure you want to clear the current score count for Player X, Player O, and Draws? Current match progress will be preserved."
        confirmLabel="Reset Scores"
        onConfirm={handleConfirmResetScores}
        onCancel={() => setIsConfirmResetScoresOpen(false)}
        isDestructive={true}
      />

      {/* Confirm Clear History Modal */}
      <ConfirmModal
        isOpen={isConfirmClearHistoryOpen}
        title="Clear Match History?"
        message="This will delete all past recorded rounds and statistics from your browser's local storage. This action cannot be reversed."
        confirmLabel="Clear All History"
        onConfirm={handleConfirmClearHistory}
        onCancel={() => setIsConfirmClearHistoryOpen(false)}
        isDestructive={true}
      />
    </div>
  );
}
