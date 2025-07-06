// src/types.tsx

/**
 * Interfaz para el resultado de una respuesta.
 * Almacena no solo si fue correcta, sino también la dificultad
 * y la categoría de la pregunta para un análisis detallado.
 */
export interface AnswerResult {
  questionId: number;
  isCorrect: boolean;
  difficulty: number;
  category: string;
}

export type QuestionType = "multiple-choice" | "text-input" | "ordering";

/**
 * Interfaz base que contiene las propiedades comunes a todas las preguntas.
 * Se añaden propiedades opcionales para las preguntas de memorización.
 */
export interface BaseQuestion {
  id: number;
  type: QuestionType;
  category: string;
  text: string; // La instrucción para el usuario (ej: "Escribe en orden inverso")
  difficulty: number;
  image?: string;
  // --- Propiedades para preguntas de memoria ---
  stimulus?: string; // El contenido a mostrar durante la memorización (ej: "8 - 4 - 9 - 2 - 7")
  memorizationTime?: number; // Tiempo en segundos para memorizar
}

/**
 * Interfaz para preguntas de opción múltiple.
 */
export interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple-choice";
  options: string[];
  answer: string;
}

/**
 * Interfaz para preguntas de entrada de texto.
 */
export interface TextInputQuestion extends BaseQuestion {
  type: "text-input";
  answer: string;
}

/**
 * Interfaz para preguntas de ordenamiento.
 */
export interface OrderingQuestion extends BaseQuestion {
  type: "ordering";
  items: string[];
  answer: string[];
}

/**
 * Un tipo de unión que puede representar cualquier tipo de pregunta en la aplicación.
 */
export type AnyQuestion =
  | MultipleChoiceQuestion
  | TextInputQuestion
  | OrderingQuestion;
