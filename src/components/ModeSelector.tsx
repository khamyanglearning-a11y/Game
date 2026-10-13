import React from 'react';
import { Users, Cpu, ShieldAlert, Zap, Sparkles } from 'lucide-react';
import { Difficulty, GameMode } from '../types/game';

interface ModeSelectorProps {
  mode: GameMode;
  difficulty: Difficulty;
  onSelectMode: (mode: GameMode) => void;
  onSelectDifficulty: (difficulty: Difficulty) => void;
  isDark: boolean;
  disabled?: boolean;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  mode,
  difficulty,
  onSelectMode,
  onSelectDifficulty,
  isDark,
  disabled = false,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      {/* Game Mode Selector */}
      <div
        className={`flex items-center p-1 rounded-xl border ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}
        role="group"
        aria-label="Select Game Mode"
      >
        <button
          type="button"
          disabled={disabled}
          onClick={() => onSelectMode('pvp')}
          className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-purple-400 ${
            mode === 'pvp'
              ? isDark
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/40'
                : 'bg-white text-purple-900 shadow-sm'
              : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4 shrink-0" />
          <span>Two Players</span>
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={() => onSelectMode('ai')}
          className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-purple-400 ${
            mode === 'ai'
              ? isDark
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/40'
                : 'bg-white text-purple-900 shadow-sm'
              : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Cpu className="w-4 h-4 shrink-0" />
          <span>vs Computer</span>
        </button>
      </div>

      {/* Difficulty Setting (Visible in AI Mode) */}
      {mode === 'ai' && (
        <div className="flex items-center gap-1.5 sm:gap-2 self-center sm:self-auto">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:inline">
            AI Difficulty:
          </span>

          <div
            className={`flex items-center p-1 rounded-xl border ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}
            role="group"
            aria-label="Select AI Difficulty"
          >
            {/* Easy */}
            <button
              type="button"
              disabled={disabled}
              onClick={() => onSelectDifficulty('easy')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-purple-400 ${
                difficulty === 'easy'
                  ? isDark
                    ? 'bg-emerald-600/90 text-white shadow-xs'
                    : 'bg-emerald-600 text-white shadow-xs'
                  : isDark
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Easy: Casual and forgiving"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Easy</span>
            </button>

            {/* Normal */}
            <button
              type="button"
              disabled={disabled}
              onClick={() => onSelectDifficulty('normal')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-purple-400 ${
                difficulty === 'normal'
                  ? isDark
                    ? 'bg-amber-600/90 text-white shadow-xs'
                    : 'bg-amber-600 text-white shadow-xs'
                  : isDark
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Normal: Tactical and balanced"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Normal</span>
            </button>

            {/* Hard (Minimax) */}
            <button
              type="button"
              disabled={disabled}
              onClick={() => onSelectDifficulty('hard')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-purple-400 ${
                difficulty === 'hard'
                  ? isDark
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-rose-600 text-white shadow-xs'
                  : isDark
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Hard: Minimax Algorithm - Unbeatable"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Hard (Minimax)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
