import React from 'react';
import { ArrowLeft, Sparkles, Zap, ShieldAlert, ChevronRight } from 'lucide-react';
import { Difficulty } from '../types/game';

interface DifficultySelectionScreenProps {
  onBack: () => void;
  onSelectDifficulty: (difficulty: Difficulty) => void;
  isDark: boolean;
}

export const DifficultySelectionScreen: React.FC<DifficultySelectionScreenProps> = ({
  onBack,
  onSelectDifficulty,
  isDark,
}) => {
  return (
    <div className="w-full max-w-sm mx-auto px-4 py-4 flex flex-col justify-between min-h-[80vh] animate-fade-in">
      <div>
        {/* Top Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <button
            onClick={onBack}
            className={`min-h-[40px] min-w-[40px] p-2 rounded-xl border transition-all flex items-center justify-center focus-visible:ring-2 focus-visible:ring-purple-400 ${
              isDark
                ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white'
                : 'bg-white border-slate-200 text-slate-700 hover:text-slate-950 shadow-xs'
            }`}
            aria-label="Back to Mode Selection"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-lg font-bold tracking-tight">Select AI Difficulty</h2>
            <p className="text-[11px] text-slate-400">Choose your level of challenge</p>
          </div>
        </div>

        {/* Difficulty Cards */}
        <div className="space-y-2.5 pt-1">
          {/* 1. Easy */}
          <button
            type="button"
            onClick={() => onSelectDifficulty('easy')}
            className={`w-full p-3 sm:p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between group active:scale-[0.98] cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              isDark
                ? 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-850 shadow-md'
                : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md shadow-xs'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-emerald-400">Easy</h3>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300">
                    Relaxed
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Casual, fun, and very forgiving moves.
                </p>
              </div>
            </div>
            <div className="w-7 h-7 rounded-lg bg-slate-800/40 flex items-center justify-center text-slate-400 group-hover:text-emerald-400 transition-colors shrink-0">
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* 2. Normal */}
          <button
            type="button"
            onClick={() => onSelectDifficulty('normal')}
            className={`w-full p-3 sm:p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between group active:scale-[0.98] cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 ${
              isDark
                ? 'bg-slate-900/80 border-slate-800 hover:border-amber-500/50 hover:bg-slate-850 shadow-md'
                : 'bg-white border-slate-200 hover:border-amber-300 hover:shadow-md shadow-xs'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-amber-400">Normal</h3>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300">
                    Balanced
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Tactical AI that seizes wins and blocks attacks.
                </p>
              </div>
            </div>
            <div className="w-7 h-7 rounded-lg bg-slate-800/40 flex items-center justify-center text-slate-400 group-hover:text-amber-400 transition-colors shrink-0">
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* 3. Hard (Minimax) */}
          <button
            type="button"
            onClick={() => onSelectDifficulty('hard')}
            className={`w-full p-3 sm:p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between group active:scale-[0.98] cursor-pointer focus-visible:ring-2 focus-visible:ring-rose-400 ${
              isDark
                ? 'bg-slate-900/80 border-slate-800 hover:border-rose-500/50 hover:bg-slate-850 shadow-md'
                : 'bg-white border-slate-200 hover:border-rose-300 hover:shadow-md shadow-xs'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-rose-400">Hard (Minimax)</h3>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-rose-500/10 text-rose-300">
                    Unbeatable
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Uses mathematical Minimax. Never loses!
                </p>
              </div>
            </div>
            <div className="w-7 h-7 rounded-lg bg-slate-800/40 flex items-center justify-center text-slate-400 group-hover:text-rose-400 transition-colors shrink-0">
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>

      {/* Info note */}
      <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 text-center">
        <p className="text-[11px] text-purple-300">
          In <strong>Hard mode</strong>, the computer calculates every outcome and will never lose.
        </p>
      </div>
    </div>
  );
};
