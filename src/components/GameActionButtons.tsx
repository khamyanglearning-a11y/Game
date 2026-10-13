import React from 'react';
import { RotateCcw, Shuffle, Trash2 } from 'lucide-react';

interface GameActionButtonsProps {
  onNewRound: () => void;
  onChangeMode: () => void;
  onResetScoresClick: () => void;
  isDark: boolean;
  canResetScores: boolean;
}

export const GameActionButtons: React.FC<GameActionButtonsProps> = ({
  onNewRound,
  onChangeMode,
  onResetScoresClick,
  isDark,
  canResetScores,
}) => {
  return (
    <div className="w-full max-w-sm mx-auto px-4 mt-2 sm:mt-3 space-y-1.5">
      <div className="flex items-center gap-2">
        {/* New Round */}
        <button
          type="button"
          onClick={onNewRound}
          className={`flex-1 min-h-[42px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-purple-400 whitespace-nowrap active:scale-95 cursor-pointer ${
            isDark
              ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-900/30'
              : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/20'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>New Round</span>
        </button>

        {/* Change Mode */}
        <button
          type="button"
          onClick={onChangeMode}
          className={`min-h-[42px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl font-semibold text-xs sm:text-sm border transition-all focus-visible:ring-2 focus-visible:ring-purple-400 whitespace-nowrap active:scale-95 cursor-pointer ${
            isDark
              ? 'border-slate-800 bg-slate-900/90 text-slate-300 hover:text-white hover:border-slate-700'
              : 'border-slate-200 bg-white text-slate-700 hover:text-slate-950 shadow-xs'
          }`}
        >
          <Shuffle className="w-3.5 h-3.5 text-purple-400" />
          <span>Mode</span>
        </button>
      </div>

      {/* Reset Scores link */}
      {canResetScores && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onResetScoresClick}
            className="flex items-center gap-1 text-[10px] font-medium text-slate-400 hover:text-rose-400 transition-colors py-0.5 px-1.5 rounded"
          >
            <Trash2 className="w-2.5 h-2.5 text-rose-400/80" />
            <span>Reset scores</span>
          </button>
        </div>
      )}
    </div>
  );
};
