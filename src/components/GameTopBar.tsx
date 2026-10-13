import React from 'react';
import { ArrowLeft, Settings } from 'lucide-react';
import { Difficulty, GameMode } from '../types/game';

interface GameTopBarProps {
  mode: GameMode;
  difficulty: Difficulty;
  onGoHome: () => void;
  onOpenSettings: () => void;
  isDark: boolean;
}

export const GameTopBar: React.FC<GameTopBarProps> = ({
  mode,
  difficulty,
  onGoHome,
  onOpenSettings,
  isDark,
}) => {
  const getModeLabel = () => {
    if (mode === 'pvp') return 'Two Players';
    const diffLabel = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    return `vs AI · ${diffLabel}`;
  };

  return (
    <header className="w-full max-w-sm mx-auto px-4 py-1.5 sm:py-2 flex items-center justify-between">
      {/* Left: Back / Home button */}
      <button
        onClick={onGoHome}
        className={`min-h-[40px] min-w-[40px] p-2 rounded-xl border transition-all flex items-center justify-center focus-visible:ring-2 focus-visible:ring-purple-400 active:scale-95 ${
          isDark
            ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white'
            : 'bg-white border-slate-200 text-slate-700 hover:text-slate-950 shadow-xs'
        }`}
        title="Return to Menu"
        aria-label="Return to Menu"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>

      {/* Center: Mode Badge */}
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-semibold">
          X-O ARENA
        </span>
        <span
          className={`text-[11px] font-bold px-2 py-0.5 rounded-full mt-0.5 border ${
            mode === 'pvp'
              ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
              : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
          }`}
        >
          {getModeLabel()}
        </span>
      </div>

      {/* Right: Settings Control */}
      <div className="flex items-center">
        {/* Settings button */}
        <button
          onClick={onOpenSettings}
          className={`min-h-[40px] min-w-[40px] p-2 rounded-xl border transition-all flex items-center justify-center focus-visible:ring-2 focus-visible:ring-purple-400 active:scale-95 ${
            isDark
              ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white'
              : 'bg-white border-slate-200 text-slate-700 hover:text-slate-950 shadow-xs'
          }`}
          title="Settings"
          aria-label="Open Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
