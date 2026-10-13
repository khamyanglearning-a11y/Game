import React, { useRef } from 'react';
import { Board, Cell, GameStatus, Player, WinningInfo } from '../types/game';

interface GameBoardProps {
  board: Board;
  currentTurn: Player;
  status: GameStatus;
  winningInfo: WinningInfo | null;
  isAiThinking: boolean;
  onCellClick: (index: number) => void;
  isDark: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  currentTurn,
  status,
  winningInfo,
  isAiThinking,
  onCellClick,
  isDark,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isGameOver = status !== 'in_progress';
  const isInteractionDisabled = isGameOver || isAiThinking;

  // Handle arrow key navigation across 3x3 grid
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let targetIndex: number | null = null;
    const row = Math.floor(index / 3);
    const col = index % 3;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        targetIndex = row > 0 ? (row - 1) * 3 + col : null;
        break;
      case 'ArrowDown':
        e.preventDefault();
        targetIndex = row < 2 ? (row + 1) * 3 + col : null;
        break;
      case 'ArrowLeft':
        e.preventDefault();
        targetIndex = col > 0 ? row * 3 + (col - 1) : null;
        break;
      case 'ArrowRight':
        e.preventDefault();
        targetIndex = col < 2 ? row * 3 + (col + 1) : null;
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isInteractionDisabled && board[index] === null) {
          onCellClick(index);
        }
        return;
      default:
        return;
    }

    if (targetIndex !== null && gridRef.current) {
      const buttons = gridRef.current.querySelectorAll<HTMLButtonElement>('button[data-cell]');
      buttons[targetIndex]?.focus();
    }
  };

  // Winning Line SVG coordinates (based on 300x300 viewBox)
  const getLineCoordinates = () => {
    if (!winningInfo) return null;
    switch (winningInfo.direction) {
      case 'row-0':
        return { x1: 25, y1: 50, x2: 275, y2: 50 };
      case 'row-1':
        return { x1: 25, y1: 150, x2: 275, y2: 150 };
      case 'row-2':
        return { x1: 25, y1: 250, x2: 275, y2: 250 };
      case 'col-0':
        return { x1: 50, y1: 25, x2: 50, y2: 275 };
      case 'col-1':
        return { x1: 150, y1: 25, x2: 150, y2: 275 };
      case 'col-2':
        return { x1: 250, y1: 25, x2: 250, y2: 275 };
      case 'diag-main':
        return { x1: 30, y1: 30, x2: 270, y2: 270 };
      case 'diag-anti':
        return { x1: 270, y1: 30, x2: 30, y2: 270 };
      default:
        return null;
    }
  };

  const lineCoords = getLineCoordinates();
  const winnerIsX = winningInfo?.winner === 'X';

  return (
    <div className="w-full max-w-sm mx-auto px-4 mt-2 sm:mt-4">
      <div
        className={`relative aspect-square w-full max-w-[270px] sm:max-w-[310px] mx-auto p-2 sm:p-3 rounded-2xl border transition-all duration-300 ${
          isDark
            ? 'bg-slate-950/80 border-purple-500/30 shadow-xl shadow-purple-950/40 neon-box-purple'
            : 'bg-white/95 border-purple-200 shadow-lg shadow-purple-100/70'
        }`}
      >
        {/* Subtle Neon Grid Glow Backdrop */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 via-purple-500/10 to-fuchsia-500/5 pointer-events-none" />

        {/* 3x3 Grid */}
        <div
          ref={gridRef}
          role="grid"
          aria-label="Tic-Tac-Toe Arena Grid"
          className="relative grid grid-cols-3 grid-rows-3 gap-2 sm:gap-2.5 w-full h-full"
        >
          {board.map((cell: Cell, index: number) => {
            const isWinningCell = winningInfo?.line.includes(index);
            const isEmpty = cell === null;
            const row = Math.floor(index / 3) + 1;
            const col = (index % 3) + 1;

            return (
              <button
                key={index}
                data-cell={index}
                role="gridcell"
                tabIndex={0}
                aria-label={`Row ${row}, Column ${col}, ${isEmpty ? 'empty' : cell}`}
                aria-disabled={isInteractionDisabled || !isEmpty}
                disabled={isInteractionDisabled || !isEmpty}
                onClick={() => onCellClick(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`group relative flex items-center justify-center rounded-xl border transition-all duration-200 select-none touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:z-10 ${
                  isWinningCell
                    ? winnerIsX
                      ? 'bg-cyan-950/60 border-cyan-400 neon-box-cyan animate-cell-win z-10'
                      : 'bg-fuchsia-950/60 border-fuchsia-400 neon-box-fuchsia animate-cell-win z-10'
                    : isDark
                      ? 'bg-slate-900/80 border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/90 active:scale-95'
                      : 'bg-slate-50 border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 active:scale-95 shadow-2xs'
                } ${
                  isEmpty && !isInteractionDisabled
                    ? 'cursor-pointer'
                    : 'cursor-default'
                }`}
              >
                {/* Render Marked Cell */}
                {cell === 'X' && (
                  <div className="relative w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center text-cyan-400 neon-glow-cyan animate-in zoom-in-75 duration-200">
                    <svg
                      viewBox="0 0 64 64"
                      className="w-full h-full fill-none stroke-current stroke-[7] stroke-linecap-round"
                    >
                      <line x1="14" y1="14" x2="50" y2="50" />
                      <line x1="50" y1="14" x2="14" y2="50" />
                    </svg>
                  </div>
                )}

                {cell === 'O' && (
                  <div className="relative w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center text-fuchsia-400 neon-glow-fuchsia animate-in zoom-in-75 duration-200">
                    <svg
                      viewBox="0 0 64 64"
                      className="w-full h-full fill-none stroke-current stroke-[7] stroke-linecap-round"
                    >
                      <circle cx="32" cy="32" r="18" />
                    </svg>
                  </div>
                )}

                {/* Ghost Preview on Hover when empty and active */}
                {isEmpty && !isInteractionDisabled && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-20 group-focus-visible:opacity-30 transition-opacity">
                    {currentTurn === 'X' ? (
                      <svg
                        viewBox="0 0 64 64"
                        className="w-7 h-7 sm:w-9 sm:h-9 fill-none stroke-cyan-400 stroke-[5] stroke-linecap-round"
                      >
                        <line x1="16" y1="16" x2="48" y2="48" />
                        <line x1="48" y1="16" x2="16" y2="50" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 64 64"
                        className="w-7 h-7 sm:w-9 sm:h-9 fill-none stroke-fuchsia-400 stroke-[5] stroke-linecap-round"
                      >
                        <circle cx="32" cy="32" r="16" />
                      </svg>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Animated Winning Line SVG Overlay */}
        {lineCoords && (
          <svg
            className="absolute inset-3 sm:inset-4 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] h-[calc(100%-1.5rem)] sm:h-[calc(100%-2rem)] pointer-events-none z-20"
            viewBox="0 0 300 300"
          >
            <defs>
              <linearGradient
                id="winning-line-grad"
                x1={lineCoords.x1}
                y1={lineCoords.y1}
                x2={lineCoords.x2}
                y2={lineCoords.y2}
                gradientUnits="userSpaceOnUse"
              >
                {winnerIsX ? (
                  <>
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="50%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </>
                ) : (
                  <>
                    <stop offset="0%" stopColor="#e879f9" />
                    <stop offset="50%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#e879f9" />
                  </>
                )}
              </linearGradient>
              <filter id="neon-line-blur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background Halo Stroke */}
            <line
              x1={lineCoords.x1}
              y1={lineCoords.y1}
              x2={lineCoords.x2}
              y2={lineCoords.y2}
              stroke={winnerIsX ? '#06b6d4' : '#d946ef'}
              strokeWidth="12"
              strokeLinecap="round"
              opacity="0.5"
              className="animate-draw-line"
              filter="url(#neon-line-blur)"
            />

            {/* Core Intense Stroke */}
            <line
              x1={lineCoords.x1}
              y1={lineCoords.y1}
              x2={lineCoords.x2}
              y2={lineCoords.y2}
              stroke="url(#winning-line-grad)"
              strokeWidth="6"
              strokeLinecap="round"
              className="animate-draw-line"
            />
          </svg>
        )}
      </div>
    </div>
  );
};
