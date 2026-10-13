import React from 'react';
import { X, Sparkles, Zap, ShieldAlert, Users, Keyboard, Award } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export const RulesModal: React.FC<RulesModalProps> = ({
  isOpen,
  onClose,
  isDark,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rules-modal-title"
    >
      <div
        className={`relative w-full max-w-lg max-h-[85vh] flex flex-col rounded-3xl border shadow-2xl backdrop-blur-xl overflow-hidden ${
          isDark
            ? 'bg-slate-900/95 border-slate-700/80 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 id="rules-modal-title" className="text-lg font-bold tracking-tight">
                X-O Arena Guide & Rules
              </h2>
              <p className="text-xs text-slate-400">
                Master the cybernetic 3x3 battlefield
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-purple-400"
            aria-label="Close guide modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 text-sm leading-relaxed">
          {/* Objective */}
          <div>
            <h3 className="font-bold text-white flex items-center gap-2 mb-1.5 text-xs uppercase tracking-wider text-purple-400">
              Tactical Objective
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              Be the first player to form an unbroken horizontal, vertical, or diagonal line of 3 marks.
              If all 9 cells are filled with no victor, the round ends in a draw.
            </p>
          </div>

          {/* Game Modes */}
          <div className="pt-2 border-t border-slate-800">
            <h3 className="font-bold text-white flex items-center gap-2 mb-2 text-xs uppercase tracking-wider text-purple-400">
              Combat Modes
            </h3>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-start gap-2.5">
                <Users className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200 text-xs">Two Players:</span>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Player X and Player O alternate moves on the same device.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200 text-xs">Play vs Computer:</span>
                  <p className="text-slate-400 text-xs mt-0.5">
                    You pilot Player X (Cyan) while the tactical computer commands Player O (Fuchsia).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Difficulties */}
          <div className="pt-2 border-t border-slate-800">
            <h3 className="font-bold text-white flex items-center gap-2 mb-2 text-xs uppercase tracking-wider text-purple-400">
              AI Difficulty Modes
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-slate-300 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-300">Easy:</strong> Forgiving and relaxed, occasionally misses strategic blocks.
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/20 text-slate-300 flex items-start gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300">Medium:</strong> Smart and tactical, actively seizes wins and blocks attacks with partial heuristic checks.
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/20 text-slate-300 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-rose-300">Hard (Minimax):</strong> Mathematical perfection. Uses full game-tree Minimax search and is mathematically proven to never lose!
                </div>
              </div>
            </div>
          </div>

          {/* Keyboard & Accessibility */}
          <div className="pt-2 border-t border-slate-800">
            <h3 className="font-bold text-white flex items-center gap-2 mb-1.5 text-xs uppercase tracking-wider text-purple-400">
              <Keyboard className="w-3.5 h-3.5" />
              Keyboard Controls
            </h3>
            <p className="text-slate-400 text-xs">
              Navigate grid cells using <kbd className="px-1.5 py-0.5 bg-slate-800 rounded font-mono text-[11px] text-slate-200">Arrow Keys</kbd> or <kbd className="px-1.5 py-0.5 bg-slate-800 rounded font-mono text-[11px] text-slate-200">Tab</kbd>. Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded font-mono text-[11px] text-slate-200">Enter</kbd> or <kbd className="px-1.5 py-0.5 bg-slate-800 rounded font-mono text-[11px] text-slate-200">Space</kbd> to place your mark.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-colors focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
