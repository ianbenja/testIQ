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

// --- Definiciones para los diferentes tipos de preguntas ---

export type QuestionType = "multiple-choice" | "text-input" | "ordering";

/**
 * Interfaz base que contiene las propiedades comunes a todas las preguntas.
 */
export interface BaseQuestion {
  id: number;
  type: QuestionType;
  category: string;
  text: string;
  difficulty: number;
}

/**
 * Interfaz para preguntas de opción múltiple.
 */
export interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple-choice";
  options: string[];
  answer: string;
  image?: string;
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
 * Esto nos da flexibilidad y seguridad de tipos.
 */
export type AnyQuestion =
  | MultipleChoiceQuestion
  | TextInputQuestion
  | OrderingQuestion;
