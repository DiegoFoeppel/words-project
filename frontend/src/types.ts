export const LearningStatus = {
  New: "new",
  Learning: "learning",
  Mastered: "mastered",
} as const;

export type LearningStatus =
  (typeof LearningStatus)[keyof typeof LearningStatus];

export type Quiz = {
  id: number;
  english: string;
  german: string;
  sentence: string;
  translation: string;
};

export type QuizUpdate = Omit<Quiz, "english" | "german">;

export type Word = {
  id: number;
  english: string;
  word: string;
  source: string;
  translation: string;
  status: LearningStatus;
  createdAt: Date;
  updatedAt: Date;
  sentence: string;
};

export type WordProps = {
  words: Word[];
  onDelete: (id: Number) => void;
  onEdit: (word: Word) => void;
};
