import React from 'react';
import { Trophy, RotateCcw, Loader2 } from 'lucide-react';
import { Difficulty, GameMode, GameStatus, Player, WinningInfo } from '../types/game';

interface TurnBannerProps {
  status: GameStatus;
  currentTurn: Player;
  winningInfo: WinningInfo | null;
  mode: GameMode;
  difficulty: Difficulty;
  isAiThinking: boolean;
  onNewRound: () => void;
  isDark: boolean;
}

export const TurnBanner: React.FC<TurnBannerProps> = ({
  status,
  currentTurn,
  winningInfo,
  mode,
  isAiThinking,
  onNewRound,
  isDark,
}) => {
  const isAIMode = mode === 'ai';

  if (status === 'won' && winningInfo) {
    const isX = winningInfo.winner === 'X';
    const winnerName = isX
      ? 'Player X'
      : isAIMode
        ? 'Computer'
        : 'Player O';

    return (
      <div className="w-full max-w-sm mx-auto px-3 mt-1.5">
        <div
          className={`flex items-center justify-between p-2 sm:p-2.5 rounded-xl border shadow-md transition-all ${
            isX
              ? isDark
                ? 'bg-cyan-950/60 border-cyan-500/50 shadow-cyan-950/30 text-cyan-300'
                : 'bg-cyan-50 border-cyan-300 shadow-cyan-100 text-cyan-900'
              : isDark
                ? 'bg-fuchsia-950/60 border-fuchsia-500/50 shadow-fuchsia-950/30 text-fuchsia-300'
                : 'bg-fuchsia-50 border-fuchsia-300 shadow-fuchsia-100 text-fuchsia-900'
          }`}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-2">
            <div
              className={`p-1.5 rounded-lg ${
                isX
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'bg-fuchsia-500/20 text-fuchsia-400'
              }`}
            >
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-black tracking-tight">
                {winnerName} Wins!
              </div>
              <p className="text-[10px] opacity-80">
                {isX ? 'Tactical victory!' : isAIMode ? 'AI victorious' : 'Player O wins!'}
              </p>
            </div>
          </div>

          <button
            onClick={onNewRound}
            className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-lg transition-all shadow-xs focus-visible:ring-2 focus-visible:ring-purple-400 ${
              isX
                ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
                : 'bg-fuchsia-500 hover:bg-fuchsia-400 text-white shadow-fuchsia-500/20'
            }`}
          >
            <RotateCcw className="w-3 h-3" />
            <span>Next</span>
          </button>
        </div>
      </div>
    );
  }

  if (status === 'draw') {
    return (
      <div className="w-full max-w-sm mx-auto px-3 mt-1.5">
        <div
          className={`flex items-center justify-between p-2 sm:p-2.5 rounded-xl border shadow-md transition-all ${
            isDark
              ? 'bg-slate-900/80 border-slate-700 shadow-slate-950/30 text-slate-200'
              : 'bg-slate-100 border-slate-300 shadow-slate-200 text-slate-800'
          }`}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-slate-500/20 text-slate-400">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-black tracking-tight">
                Draw! Stalemate
              </div>
              <p className="text-[10px] text-slate-400">
                Balanced battle
              </p>
            </div>
          </div>

          <button
            onClick={onNewRound}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-lg bg-purple-600 hover:bg-purple-500 text-white shadow-xs transition-all focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Next</span>
          </button>
        </div>
      </div>
    );
  }

  // Active Play State
  const isXTurn = currentTurn === 'X';

  return (
    <div className="w-full max-w-sm mx-auto px-3 mt-1.5">
      <div
        className={`flex items-center justify-between p-2 sm:p-2.5 rounded-xl border transition-all ${
          isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
        }`}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center gap-2.5">
          {/* Turn Symbol Badge */}
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-black text-sm shadow-inner ${
              isXTurn
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30'
            }`}
          >
            {isAiThinking ? (
              <Loader2 className="w-4 h-4 animate-spin text-fuchsia-400" />
            ) : (
              currentTurn
            )}
          </div>

          <div className="flex flex-col">
            <div className="text-xs sm:text-sm font-bold flex items-center gap-1.5">
              <span className={isXTurn ? 'text-cyan-400' : 'text-fuchsia-400'}>
                {isAiThinking
                  ? 'Computer Thinking...'
                  : isXTurn
                    ? "Player X's Turn"
                    : isAIMode
                      ? "Computer's Turn"
                      : "Player O's Turn"}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">
              {isAiThinking
                ? 'Calculating best move...'
                : isXTurn
                  ? 'Tap empty cell to place X'
                  : isAIMode
                    ? 'Wait for AI response'
                    : 'Tap empty cell to place O'}
            </span>
          </div>
        </div>

        {/* Turn Visual Accent Indicator */}
        <div className="flex items-center gap-1">
          <div
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              isXTurn
                ? 'bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.9)]'
                : 'bg-slate-700'
            }`}
          />
          <div
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              !isXTurn
                ? 'bg-fuchsia-400 shadow-[0_0_6px_rgba(217,70,239,0.9)]'
                : 'bg-slate-700'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
