export interface Question {
  type: "multipleChoice" | "textInput" | "ordering";
  category: string; // Añadida la propiedad category
  text: string;
  image?: string;
  options?: string[];
  correctAnswer: string | string[];
  points?: number;
}

export type Answer = string | string[];
