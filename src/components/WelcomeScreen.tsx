import React from 'react';
import { Play, Settings, History, Shield, Users, Bot, Clock } from 'lucide-react';
import { ScoreState } from '../types/game';

interface WelcomeScreenProps {
  onStart: () => void;
  onOpenSettings: () => void;
  onOpenHistory: () => void;
  scores: ScoreState;
  playTimeSeconds: number;
  isDark: boolean;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  onOpenSettings,
  onOpenHistory,
  scores,
  playTimeSeconds,
  isDark,
}) => {
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    }
    return `${minutes}m ${seconds}s`;
  };

  const totalMatches = scores.x + scores.o + scores.draws;

  return (
    <div className="w-full max-w-sm mx-auto px-4 py-3 sm:py-5 flex flex-col items-center justify-between min-h-[80vh] animate-fade-in">
      {/* Top Bar with Quick Action Buttons */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[11px] font-semibold text-purple-400">
          <Clock className="w-3 h-3" />
          <span className="font-mono tabular-nums">{formatTime(playTimeSeconds)}</span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* History / Records */}
          <button
            onClick={onOpenHistory}
            className={`min-h-[38px] min-w-[38px] p-2 rounded-xl border transition-all flex items-center justify-center focus-visible:ring-2 focus-visible:ring-purple-400 ${
              isDark
                ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white'
                : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 shadow-xs'
            }`}
            title="Match History"
            aria-label="Match History"
          >
            <History className="w-4 h-4" />
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className={`min-h-[38px] min-w-[38px] p-2 rounded-xl border transition-all flex items-center justify-center focus-visible:ring-2 focus-visible:ring-purple-400 ${
              isDark
                ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white'
                : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 shadow-xs'
            }`}
            title="Game Settings"
            aria-label="Game Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero Branding & Logo */}
      <div className="flex flex-col items-center text-center my-auto py-3">
        {/* Animated Cyber Logo Mark */}
        <div className="relative mb-3.5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-purple-600/30 to-fuchsia-500/20 border-2 border-purple-500/40 p-2 sm:p-2.5 flex items-center justify-center shadow-xl shadow-purple-900/40 neon-box-purple">
            <div className="grid grid-cols-2 gap-1.5 w-full h-full">
              <div className="flex items-center justify-center rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 font-mono font-black text-2xl sm:text-3xl neon-glow-cyan">
                X
              </div>
              <div className="flex items-center justify-center rounded-lg bg-fuchsia-950/40 border border-fuchsia-500/30 text-fuchsia-400 font-mono font-black text-2xl sm:text-3xl neon-glow-fuchsia">
                O
              </div>
              <div className="flex items-center justify-center rounded-lg bg-fuchsia-950/40 border border-fuchsia-500/30 text-fuchsia-400 font-mono font-black text-2xl sm:text-3xl neon-glow-fuchsia">
                O
              </div>
              <div className="flex items-center justify-center rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 font-mono font-black text-2xl sm:text-3xl neon-glow-cyan">
                X
              </div>
            </div>
          </div>

          {/* Decorative glowing pulse halo */}
          <div className="absolute -inset-1.5 rounded-2xl bg-purple-500/10 blur-md -z-10 pointer-events-none" />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center justify-center gap-1.5">
          <span className="text-cyan-400 neon-glow-cyan">X-O</span>
          <span className={isDark ? 'text-white' : 'text-slate-900'}>ARENA</span>
        </h1>
        <p className="mt-1 text-xs text-slate-400 max-w-[240px] font-medium leading-relaxed">
          Tactical Tic-Tac-Toe with unbeatable AI and local 2-Player combat.
        </p>

        {/* Mini Highlights */}
        <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3 text-purple-400" />
            <span>2 Players</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1">
            <Bot className="w-3 h-3 text-cyan-400" />
            <span>Smart AI</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-fuchsia-400" />
            <span>Minimax</span>
          </div>
        </div>
      </div>

      {/* Bottom Action Area (Natural Thumb Zone) */}
      <div className="w-full space-y-2.5 pt-2">
        {/* Primary Start Game CTA */}
        <button
          type="button"
          onClick={onStart}
          className="w-full min-h-[46px] h-12 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-base tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-purple-900/40 active:scale-[0.98] transition-all focus-visible:ring-2 focus-visible:ring-purple-400 select-none cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>START GAME</span>
        </button>

        {/* Quick Stats Strip */}
        {totalMatches > 0 && (
          <div
            className={`w-full p-2 rounded-xl border flex items-center justify-around text-center ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
            }`}
          >
            <div>
              <div className="text-[10px] text-cyan-400 font-semibold">Player X</div>
              <div className="text-base font-bold font-mono tabular-nums">{scores.x}</div>
            </div>
            <div className="w-px h-6 bg-slate-700/50" />
            <div>
              <div className="text-[10px] text-slate-400 font-semibold">Ties</div>
              <div className="text-base font-bold font-mono tabular-nums">{scores.draws}</div>
            </div>
            <div className="w-px h-6 bg-slate-700/50" />
            <div>
              <div className="text-[10px] text-fuchsia-400 font-semibold">AI / O</div>
              <div className="text-base font-bold font-mono tabular-nums">{scores.o}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
