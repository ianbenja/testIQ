export interface Question {
  type: "multiple-choice" | "text-input" | "ordering";
  text: string;
  category:
    | "Razonamiento Fluido"
    | "Comprensión Verbal"
    | "Memoria de Trabajo"
    | "Procesamiento Visoespacial"
    | "Conocimiento Cuantitativo";
  options?: string[];
  image?: string;
  correctAnswer: string | string[];
}

export interface Answer {
  questionIndex: number;
  answer: string | string[];
  isCorrect: boolean;
}
