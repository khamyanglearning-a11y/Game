import React from 'react';
import { Volume2, VolumeX, Sun, Moon, History, HelpCircle } from 'lucide-react';
import { AppSettings } from '../types/game';

interface HeaderProps {
  settings: AppSettings;
  onToggleSound: () => void;
  onToggleTheme: () => void;
  onOpenHistory: () => void;
  onOpenRules: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  onToggleSound,
  onToggleTheme,
  onOpenHistory,
  onOpenRules,
  historyCount,
}) => {
  const isDark = settings.theme === 'dark';

  return (
    <header className="w-full max-w-4xl mx-auto px-4 py-4 flex items-center justify-between border-b border-slate-700/40">
      {/* Brand Wordmark */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-fuchsia-500/20 border border-purple-500/30 shadow-inner">
          <span className="font-mono font-black text-lg bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
            XO
          </span>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-1.5">
            <span className="text-cyan-400 neon-glow-cyan">X-O</span>
            <span className={isDark ? 'text-white' : 'text-slate-900'}>ARENA</span>
          </h1>
          <span className="text-[11px] tracking-wider uppercase text-slate-400 font-medium hidden sm:inline">
            Neon Tactical Combat
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Rules & Guide */}
        <button
          onClick={onOpenRules}
          className={`p-2.5 rounded-xl border transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-400 ${
            isDark
              ? 'border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white hover:border-slate-700'
              : 'border-slate-200 bg-white text-slate-700 hover:text-slate-950 hover:border-slate-300 shadow-xs'
          }`}
          title="Game Rules & Guide"
          aria-label="Game Rules & Guide"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* History Modal Trigger */}
        <button
          onClick={onOpenHistory}
          className={`relative p-2.5 rounded-xl border transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-400 ${
            isDark
              ? 'border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white hover:border-slate-700'
              : 'border-slate-200 bg-white text-slate-700 hover:text-slate-950 hover:border-slate-300 shadow-xs'
          }`}
          title="Round History"
          aria-label="View Round History"
        >
          <History className="w-4 h-4" />
          {historyCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center font-mono">
              {historyCount > 9 ? '9+' : historyCount}
            </span>
          )}
        </button>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          className={`p-2.5 rounded-xl border transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-400 ${
            settings.soundEnabled
              ? isDark
                ? 'border-cyan-500/40 bg-cyan-950/30 text-cyan-400'
                : 'border-cyan-400 bg-cyan-50 text-cyan-700'
              : isDark
                ? 'border-slate-800 bg-slate-900/80 text-slate-400'
                : 'border-slate-200 bg-white text-slate-400'
          }`}
          title={settings.soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
          aria-label={settings.soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
        >
          {settings.soundEnabled ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className={`p-2.5 rounded-xl border transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-400 ${
            isDark
              ? 'border-purple-500/30 bg-purple-950/30 text-purple-300 hover:text-white hover:border-purple-500/50'
              : 'border-amber-300 bg-amber-50 text-amber-700 hover:border-amber-400 shadow-xs'
          }`}
          title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
