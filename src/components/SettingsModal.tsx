import React from 'react';
import {
  X,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Clock,
  Info,
  Trash2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  History,
} from 'lucide-react';
import { AppSettings, ScoreState } from '../types/game';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onToggleSound: () => void;
  onToggleTheme: () => void;
  playTimeSeconds: number;
  scores: ScoreState;
  onResetScoresClick: () => void;
  onOpenHistory?: () => void;
  isDark: boolean;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onToggleSound,
  onToggleTheme,
  playTimeSeconds,
  scores,
  onResetScoresClick,
  onOpenHistory,
  isDark,
}) => {
  if (!isOpen) return null;

  const formatPlayTime = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    }
    return `${minutes}m ${seconds}s`;
  };

  const hasScoresToReset = scores.x > 0 || scores.o > 0 || scores.draws > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
    >
      <div
        className={`relative w-full max-w-md max-h-[90vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden transition-all ${
          isDark
            ? 'bg-slate-900/95 border-slate-700/80 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 id="settings-modal-title" className="text-lg font-bold tracking-tight">
                Settings
              </h2>
              <p className="text-xs text-slate-400">Controls, play time & about</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-purple-400"
            aria-label="Close Settings dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* 1. PLAY TIME SECTION */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              isDark
                ? 'bg-slate-950/60 border-purple-500/30 shadow-inner'
                : 'bg-purple-50/50 border-purple-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
                    Play Time Tracker
                  </span>
                  <div className="text-xl font-black font-mono tabular-nums text-purple-400">
                    {formatPlayTime(playTimeSeconds)}
                  </div>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-1 rounded-full bg-purple-500/10 text-purple-300">
                Live
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Total active gameplay time recorded and saved on this device.
            </p>
          </div>

          {/* 2. AUDIO & THEME CONTROLS */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400 px-1">
              Preferences
            </h3>

            {/* Sound Option */}
            <div
              className={`p-4 rounded-2xl border flex items-center justify-between ${
                isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    settings.soundEnabled
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'bg-slate-700/30 text-slate-400'
                  }`}
                >
                  {settings.soundEnabled ? (
                    <Volume2 className="w-5 h-5" />
                  ) : (
                    <VolumeX className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-bold">Sound Effects</div>
                  <div className="text-xs text-slate-400">
                    {settings.soundEnabled ? 'Synthesized audio enabled' : 'Muted'}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onToggleSound}
                className={`min-h-[44px] min-w-[56px] px-3.5 py-2 rounded-xl text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-purple-400 ${
                  settings.soundEnabled
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-sm'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
                aria-pressed={settings.soundEnabled}
              >
                {settings.soundEnabled ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Dark Mode Option */}
            <div
              className={`p-4 rounded-2xl border flex items-center justify-between ${
                isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isDark
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'bg-amber-500/20 text-amber-500'
                  }`}
                >
                  {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </div>
                <div>
                  <div className="text-sm font-bold">Dark Mode</div>
                  <div className="text-xs text-slate-400">
                    {isDark ? 'Neon Cyber Dark' : 'Bright Clean Light'}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onToggleTheme}
                className={`min-h-[44px] min-w-[56px] px-3.5 py-2 rounded-xl text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-purple-400 ${
                  isDark
                    ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-sm'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm'
                }`}
                aria-pressed={isDark}
              >
                {isDark ? 'DARK' : 'LIGHT'}
              </button>
            </div>
          </div>

          {/* 3. ABOUT SECTION */}
          <div className="space-y-2 pt-2">
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400 px-1 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              <span>About X-O Arena</span>
            </h3>

            <div
              className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2.5 ${
                isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                <span className="font-bold text-sm text-cyan-400">X-O Arena v2.0</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                  Tactical Edition
                </span>
              </div>

              <p className="text-slate-300">
                A modern, mobile-friendly Tic-Tac-Toe web game featuring local 2-Player pass & play and an unbeatable AI engine.
              </p>

              <div className="space-y-1.5 pt-1 text-slate-400">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-200">Unbeatable Minimax:</strong> In Hard mode, the AI calculates all game permutations to ensure it never loses.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Smartphone className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-200">Mobile Touch Friendly:</strong> Optimized with 44px+ hitboxes, clean thumb flow, and responsive layout.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. HISTORY & RESET ACTIONS */}
          <div className="pt-2 space-y-2">
            {onOpenHistory && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenHistory();
                }}
                className={`w-full min-h-[44px] py-2.5 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                  isDark
                    ? 'border-slate-800 bg-slate-800/60 text-slate-200 hover:bg-slate-800 hover:text-white'
                    : 'border-slate-200 bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}
              >
                <History className="w-4 h-4 text-purple-400" />
                <span>View Match History & Records</span>
              </button>
            )}

            <button
              type="button"
              disabled={!hasScoresToReset}
              onClick={() => {
                onClose();
                onResetScoresClick();
              }}
              className={`w-full min-h-[44px] py-2.5 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                hasScoresToReset
                  ? 'border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 active:scale-95'
                  : 'opacity-40 cursor-not-allowed border-slate-800 text-slate-500'
              }`}
            >
              <Trash2 className="w-4 h-4" />
              <span>Reset Saved Scores to Zero</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2 text-sm font-bold rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-colors focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
