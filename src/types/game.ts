export type Player = 'X' | 'O';
export type Cell = Player | null;
export type Board = Cell[];

export type GameMode = 'pvp' | 'ai';
export type Difficulty = 'easy' | 'normal' | 'hard';
export type GameStatus = 'in_progress' | 'won' | 'draw';
export type AppScreen = 'welcome' | 'select_mode' | 'select_difficulty' | 'game';

export type WinningDirection = 
  | 'row-0' 
  | 'row-1' 
  | 'row-2' 
  | 'col-0' 
  | 'col-1' 
  | 'col-2' 
  | 'diag-main' 
  | 'diag-anti';

export interface WinningInfo {
  winner: Player;
  line: [number, number, number];
  direction: WinningDirection;
}

export interface ScoreState {
  x: number;
  o: number;
  draws: number;
}

export interface HistoryRecord {
  id: string;
  timestamp: number;
  mode: GameMode;
  difficulty?: Difficulty;
  winner: Player | 'draw';
  movesCount: number;
  board: Board;
}

export interface AppSettings {
  soundEnabled: boolean;
  theme: 'dark' | 'light';
}
