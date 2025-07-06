export interface Question {
  type: "multipleChoice" | "textInput" | "ordering";
  text: string;
  image?: string; // URL de la imagen (opcional)
  options?: string[];
  correctAnswer: string | string[];
  points?: number;
}

export interface Answer {
  questionText: string;
  userAnswer: string | string[];
  correctAnswer: string | string[];
  isCorrect: boolean;
  points: number;
}
