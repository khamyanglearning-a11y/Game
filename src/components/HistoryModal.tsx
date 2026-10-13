import React, { useState } from 'react';
import { X, Trash2, Calendar, Trophy, RotateCcw, Filter, CheckCircle2 } from 'lucide-react';
import { GameMode, HistoryRecord } from '../types/game';

interface HistoryModalProps {
  isOpen: boolean;
  history: HistoryRecord[];
  onClose: () => void;
  onClearHistoryClick: () => void;
  isDark: boolean;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  history,
  onClose,
  onClearHistoryClick,
  isDark,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | GameMode>('all');

  if (!isOpen) return null;

  const filteredHistory = history.filter((item) => {
    if (filterMode === 'all') return true;
    return item.mode === filterMode;
  });

  const formatDate = (timestamp: number) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }) + ' · ' + date.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Recent match';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="history-modal-title"
    >
      <div
        className={`relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl border shadow-2xl backdrop-blur-xl overflow-hidden transition-all ${
          isDark
            ? 'bg-slate-900/95 border-slate-700/80 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 id="history-modal-title" className="text-lg font-bold tracking-tight">
                Round History
              </h2>
              <p className="text-xs text-slate-400">
                {history.length} {history.length === 1 ? 'round recorded' : 'rounds recorded'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-purple-400"
            aria-label="Close history modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter and Clear Controls */}
        <div className="px-6 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-950/40">
          {/* Mode Filter */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1" />
            <button
              onClick={() => setFilterMode('all')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filterMode === 'all'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({history.length})
            </button>
            <button
              onClick={() => setFilterMode('pvp')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filterMode === 'pvp'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Two Players
            </button>
            <button
              onClick={() => setFilterMode('ai')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filterMode === 'ai'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              vs Computer
            </button>
          </div>

          {/* Clear History Button */}
          {history.length > 0 && (
            <button
              type="button"
              onClick={onClearHistoryClick}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 transition-all focus-visible:ring-2 focus-visible:ring-rose-400"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {filteredHistory.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <RotateCcw className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">No recorded rounds yet</p>
              <p className="text-xs text-slate-500 mt-1">
                Complete a game of Tic-Tac-Toe to see round analytics here.
              </p>
            </div>
          ) : (
            filteredHistory.map((item) => {
              const isXWin = item.winner === 'X';
              const isOWin = item.winner === 'O';
              const isDraw = item.winner === 'draw';

              return (
                <div
                  key={item.id}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    isDark
                      ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  {/* Left Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Winner Badge */}
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          isXWin
                            ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                            : isOWin
                              ? 'bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/30'
                              : 'bg-slate-500/10 text-slate-400 border border-slate-500/30'
                        }`}
                      >
                        {isDraw ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Trophy className="w-3 h-3" />
                        )}
                        <span>
                          {isXWin
                            ? 'Player X Won'
                            : isOWin
                              ? item.mode === 'ai'
                                ? 'Computer Won'
                                : 'Player O Won'
                              : 'Draw'}
                        </span>
                      </span>

                      {/* Mode & Difficulty */}
                      <span className="text-xs font-medium text-slate-400">
                        {item.mode === 'ai'
                          ? `vs AI (${item.difficulty || 'Normal'})`
                          : 'Two Players'}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                      <span>{formatDate(item.timestamp)}</span>
                      <span>·</span>
                      <span className="font-mono tabular-nums">
                        {item.movesCount} moves
                      </span>
                    </div>
                  </div>

                  {/* Mini Board Snapshot (3x3 grid thumbnail) */}
                  <div className="shrink-0">
                    <div className="grid grid-cols-3 gap-0.5 p-1 rounded-lg bg-slate-950/70 border border-slate-800 w-14 h-14 sm:w-16 sm:h-16">
                      {item.board.map((cell, cIdx) => (
                        <div
                          key={cIdx}
                          className="flex items-center justify-center rounded-xs bg-slate-900/80 text-[10px] font-mono font-black"
                        >
                          {cell === 'X' && (
                            <span className="text-cyan-400">X</span>
                          )}
                          {cell === 'O' && (
                            <span className="text-fuchsia-400">O</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-colors focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
