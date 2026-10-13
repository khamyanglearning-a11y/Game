import React from 'react';
import { ArrowLeft, Users, Bot, ChevronRight } from 'lucide-react';

interface ModeSelectionScreenProps {
  onBack: () => void;
  onSelectTwoPlayers: () => void;
  onSelectVsComputer: () => void;
  isDark: boolean;
}

export const ModeSelectionScreen: React.FC<ModeSelectionScreenProps> = ({
  onBack,
  onSelectTwoPlayers,
  onSelectVsComputer,
  isDark,
}) => {
  return (
    <div className="w-full max-w-sm mx-auto px-4 py-4 flex flex-col justify-between min-h-[80vh] animate-fade-in">
      {/* Top Bar */}
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <button
            onClick={onBack}
            className={`min-h-[40px] min-w-[40px] p-2 rounded-xl border transition-all flex items-center justify-center focus-visible:ring-2 focus-visible:ring-purple-400 ${
              isDark
                ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white'
                : 'bg-white border-slate-200 text-slate-700 hover:text-slate-950 shadow-xs'
            }`}
            aria-label="Back to Welcome Page"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-lg font-bold tracking-tight">Select Game Mode</h2>
            <p className="text-[11px] text-slate-400">Choose who you want to battle</p>
          </div>
        </div>

        {/* Mode Options Cards */}
        <div className="space-y-3 pt-1">
          {/* Option 1: Two Players */}
          <button
            type="button"
            onClick={onSelectTwoPlayers}
            className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left transition-all flex items-center justify-between group active:scale-[0.98] cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-400 ${
              isDark
                ? 'bg-slate-900/80 border-slate-800 hover:border-purple-500/60 hover:bg-slate-850 shadow-md'
                : 'bg-white border-slate-200 hover:border-purple-300 hover:shadow-md shadow-xs'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold">Two Players</h3>
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-purple-500/20 text-purple-300">
                    Local
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Take turns on this device. Player X vs Player O.
                </p>
              </div>
            </div>

            <div className="w-7 h-7 rounded-lg bg-slate-800/50 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-purple-600 transition-colors shrink-0">
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>

          {/* Option 2: Play vs Computer */}
          <button
            type="button"
            onClick={onSelectVsComputer}
            className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left transition-all flex items-center justify-between group active:scale-[0.98] cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-400 ${
              isDark
                ? 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/60 hover:bg-slate-850 shadow-md'
                : 'bg-white border-slate-200 hover:border-cyan-300 hover:shadow-md shadow-xs'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold">vs Computer</h3>
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-cyan-500/20 text-cyan-300">
                    AI Bot
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Play as X against the tactical computer bot.
                </p>
              </div>
            </div>

            <div className="w-7 h-7 rounded-lg bg-slate-800/50 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-cyan-600 transition-colors shrink-0">
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>

      {/* Helpful Hint */}
      <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 text-center">
        <p className="text-[11px] text-slate-400">
          Tip: Selecting <strong className="text-slate-300">vs Computer</strong> lets you pick AI difficulty.
        </p>
      </div>
    </div>
  );
};
