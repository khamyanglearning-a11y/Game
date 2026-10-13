import { Board, Cell, Difficulty, Player, WinningDirection, WinningInfo } from '../types/game';

export const WINNING_LINES: Array<{ combo: [number, number, number]; direction: WinningDirection }> = [
  { combo: [0, 1, 2], direction: 'row-0' },
  { combo: [3, 4, 5], direction: 'row-1' },
  { combo: [6, 7, 8], direction: 'row-2' },
  { combo: [0, 3, 6], direction: 'col-0' },
  { combo: [1, 4, 7], direction: 'col-1' },
  { combo: [2, 5, 8], direction: 'col-2' },
  { combo: [0, 4, 8], direction: 'diag-main' },
  { combo: [2, 4, 6], direction: 'diag-anti' },
];

export function createEmptyBoard(): Board {
  return Array(9).fill(null);
}

export function checkWinningState(board: Board): WinningInfo | null {
  for (const { combo, direction } of WINNING_LINES) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line: combo, direction };
    }
  }
  return null;
}

export function isBoardFull(board: Board): boolean {
  return board.every(cell => cell !== null);
}

export function getAvailableMoves(board: Board): number[] {
  const moves: number[] = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      moves.push(i);
    }
  }
  return moves;
}

/**
 * Minimax algorithm for Tic-Tac-Toe.
 * Guarantees optimal play for Computer ('O') against Human ('X').
 * Never loses when playing Hard mode.
 */
function minimax(
  currentBoard: Board,
  depth: number,
  isMaximizing: boolean,
  aiPlayer: Player = 'O',
  humanPlayer: Player = 'X'
): { score: number; move?: number } {
  const winInfo = checkWinningState(currentBoard);

  if (winInfo) {
    if (winInfo.winner === aiPlayer) {
      return { score: 10 - depth };
    } else if (winInfo.winner === humanPlayer) {
      return { score: depth - 10 };
    }
  }

  const available = getAvailableMoves(currentBoard);
  if (available.length === 0) {
    return { score: 0 };
  }

  if (isMaximizing) {
    let maxScore = -Infinity;
    let bestMove = available[0];

    for (const move of available) {
      currentBoard[move] = aiPlayer;
      const result = minimax(currentBoard, depth + 1, false, aiPlayer, humanPlayer);
      currentBoard[move] = null;

      if (result.score > maxScore) {
        maxScore = result.score;
        bestMove = move;
      }
    }

    return { score: maxScore, move: bestMove };
  } else {
    let minScore = Infinity;
    let bestMove = available[0];

    for (const move of available) {
      currentBoard[move] = humanPlayer;
      const result = minimax(currentBoard, depth + 1, true, aiPlayer, humanPlayer);
      currentBoard[move] = null;

      if (result.score < minScore) {
        minScore = result.score;
        bestMove = move;
      }
    }

    return { score: minScore, move: bestMove };
  }
}

/**
 * Calculates the next move for the AI based on the selected difficulty.
 */
export function getAIMove(board: Board, difficulty: Difficulty): number {
  const availableMoves = getAvailableMoves(board);
  if (availableMoves.length === 0) return -1;

  // 1. HARD DIFFICULTY: Pure Minimax - Unbeatable
  if (difficulty === 'hard') {
    // If it's the very first move and center is available, center is optimal
    if (board.filter(c => c !== null).length === 0) {
      return 4; // Center
    }
    const result = minimax([...board], 0, true, 'O', 'X');
    return result.move !== undefined ? result.move : availableMoves[0];
  }

  // Helper: check if someone can win in one move
  const findWinningMove = (player: Player): number | null => {
    for (const move of availableMoves) {
      board[move] = player;
      const win = checkWinningState(board);
      board[move] = null;
      if (win && win.winner === player) {
        return move;
      }
    }
    return null;
  };

  // 2. NORMAL DIFFICULTY:
  // - Always take immediate win
  // - 85% chance to block immediate human win
  // - If center is free, 50% chance to take center
  // - Otherwise 60% chance optimal minimax, 40% random move
  if (difficulty === 'normal') {
    const aiWin = findWinningMove('O');
    if (aiWin !== null) return aiWin;

    const humanWin = findWinningMove('X');
    if (humanWin !== null && Math.random() < 0.85) {
      return humanWin;
    }

    if (board[4] === null && Math.random() < 0.5) {
      return 4;
    }

    if (Math.random() < 0.6) {
      const result = minimax([...board], 0, true, 'O', 'X');
      if (result.move !== undefined) return result.move;
    }

    // Pick random available move
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
  }

  // 3. EASY DIFFICULTY:
  // - 25% chance to take an immediate win if present
  // - 15% chance to block
  // - Otherwise random available move
  if (difficulty === 'easy') {
    const aiWin = findWinningMove('O');
    if (aiWin !== null && Math.random() < 0.25) return aiWin;

    const humanWin = findWinningMove('X');
    if (humanWin !== null && Math.random() < 0.15) return humanWin;

    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
  }

  return availableMoves[0];
}
