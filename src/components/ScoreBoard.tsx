import React from 'react';
import { Bot, User, Scale } from 'lucide-react';
import { Difficulty, GameMode, ScoreState } from '../types/game';

interface ScoreBoardProps {
  scores: ScoreState;
  mode: GameMode;
  difficulty: Difficulty;
  isDark: boolean;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  scores,
  mode,
  difficulty,
  isDark,
}) => {
  const isAIMode = mode === 'ai';

  return (
    <div className="w-full max-w-sm mx-auto px-3 mt-1">
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        {/* Player X */}
        <div
          className={`relative overflow-hidden rounded-xl p-2 sm:p-2.5 border transition-all ${
            isDark
              ? 'bg-slate-900/70 border-cyan-500/30 shadow-md shadow-cyan-950/20'
              : 'bg-white border-cyan-200 shadow-xs shadow-cyan-100/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="p-1 rounded-md bg-cyan-500/10 text-cyan-400">
                <User className="w-3 h-3" />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-cyan-400 truncate max-w-[55px] sm:max-w-none">
                Player X
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold text-cyan-400/80">
              X
            </span>
          </div>

          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-lg sm:text-xl font-black font-mono tabular-nums text-cyan-400 neon-glow-cyan">
              {scores.x}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              Wins
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-80" />
        </div>

        {/* Draws */}
        <div
          className={`relative overflow-hidden rounded-xl p-2 sm:p-2.5 border transition-all ${
            isDark
              ? 'bg-slate-900/70 border-slate-700/50 shadow-md'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="p-1 rounded-md bg-slate-500/10 text-slate-400">
                <Scale className="w-3 h-3" />
              </div>
              <span className={`text-[11px] sm:text-xs font-semibold tracking-wide ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Ties
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-400">
              Draw
            </span>
          </div>

          <div className="mt-1 flex items-baseline justify-between">
            <span className={`text-lg sm:text-xl font-black font-mono tabular-nums ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              {scores.draws}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              Ties
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-500/40" />
        </div>

        {/* Player O / Computer */}
        <div
          className={`relative overflow-hidden rounded-xl p-2 sm:p-2.5 border transition-all ${
            isDark
              ? 'bg-slate-900/70 border-fuchsia-500/30 shadow-md shadow-fuchsia-950/20'
              : 'bg-white border-fuchsia-200 shadow-xs shadow-fuchsia-100/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="p-1 rounded-md bg-fuchsia-500/10 text-fuchsia-400">
                {isAIMode ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
              </div>
              <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-fuchsia-400 truncate max-w-[55px] sm:max-w-none">
                {isAIMode ? 'AI' : 'Player O'}
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold text-fuchsia-400/80">
              O
            </span>
          </div>

          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-lg sm:text-xl font-black font-mono tabular-nums text-fuchsia-400 neon-glow-fuchsia">
              {scores.o}
            </span>
            <span className="text-[10px] text-slate-400 font-medium capitalize">
              {isAIMode ? `${difficulty}` : 'Wins'}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-fuchsia-500 to-purple-500 opacity-80" />
        </div>
      </div>
    </div>
  );
};
