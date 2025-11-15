export type Difficulty = 'Mudah' | 'Sedang' | 'Susah';

export type GameState = 'welcome' | 'setup' | 'playing' | 'finished' | 'leaderboard';

export interface Player {
  name: string;
}

export interface Score {
  name: string;
  score: number;
  date: string;
  juz: number[];
  difficulty: Difficulty;
}

export interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
  reference: string;
}
