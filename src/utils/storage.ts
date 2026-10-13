import { AppSettings, Difficulty, GameMode, HistoryRecord, ScoreState } from '../types/game';

const STORAGE_KEYS = {
  SCORES: 'xo_arena_scores_v1',
  SETTINGS: 'xo_arena_settings_v1',
  HISTORY: 'xo_arena_history_v1',
  MODE: 'xo_arena_mode_v1',
  DIFFICULTY: 'xo_arena_difficulty_v1',
  PLAY_TIME: 'xo_arena_play_time_seconds_v1',
};

export const DEFAULT_SCORES: ScoreState = {
  x: 0,
  o: 0,
  draws: 0,
};

export const DEFAULT_SETTINGS: AppSettings = {
  soundEnabled: true,
  theme: 'dark',
};

export function loadStoredScores(): ScoreState {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SCORES);
    if (!raw) return DEFAULT_SCORES;
    const parsed = JSON.parse(raw);
    return {
      x: typeof parsed.x === 'number' ? parsed.x : 0,
      o: typeof parsed.o === 'number' ? parsed.o : 0,
      draws: typeof parsed.draws === 'number' ? parsed.draws : 0,
    };
  } catch {
    return DEFAULT_SCORES;
  }
}

export function saveStoredScores(scores: ScoreState): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(scores));
  } catch {
    // Ignore quota or private storage errors
  }
}

export function loadStoredSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      soundEnabled: typeof parsed.soundEnabled === 'boolean' ? parsed.soundEnabled : true,
      theme: parsed.theme === 'light' ? 'light' : 'dark',
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveStoredSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch {
    // Ignore
  }
}

export function loadStoredMode(): GameMode {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MODE);
    return raw === 'pvp' ? 'pvp' : 'ai';
  } catch {
    return 'ai';
  }
}

export function saveStoredMode(mode: GameMode): void {
  try {
    localStorage.setItem(STORAGE_KEYS.MODE, mode);
  } catch {
    // Ignore
  }
}

export function loadStoredDifficulty(): Difficulty {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DIFFICULTY);
    if (raw === 'easy' || raw === 'normal' || raw === 'hard') {
      return raw;
    }
    // Backward compatibility if 'medium' was saved
    if (raw === 'medium') {
      return 'normal';
    }
    return 'normal';
  } catch {
    return 'normal';
  }
}

export function saveStoredDifficulty(difficulty: Difficulty): void {
  try {
    localStorage.setItem(STORAGE_KEYS.DIFFICULTY, difficulty);
  } catch {
    // Ignore
  }
}

export function loadStoredPlayTime(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PLAY_TIME);
    if (!raw) return 0;
    const parsed = parseInt(raw, 10);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  } catch {
    return 0;
  }
}

export function saveStoredPlayTime(seconds: number): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PLAY_TIME, Math.floor(seconds).toString());
  } catch {
    // Ignore
  }
}

export function loadStoredHistory(): HistoryRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.slice(0, 50);
    }
    return [];
  } catch {
    return [];
  }
}

export function saveStoredHistory(history: HistoryRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history.slice(0, 50)));
  } catch {
    // Ignore
  }
}

export function clearStoredScores(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.SCORES);
  } catch {
    // Ignore
  }
}

export function clearStoredHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  } catch {
    // Ignore
  }
}
