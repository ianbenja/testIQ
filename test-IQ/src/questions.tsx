import { Question } from "./types";

// Se ha cambiado la declaración para exportar la constante directamente.
export const questions: Question[] = [
  // --- Razonamiento Fluido (Gf) ---
  {
    type: "multiple-choice",
    category: "Razonamiento Fluido",
    text: "¿Qué figura completa la secuencia lógica en la matriz?",
    image:
      "https://placehold.co/400x200/e2e8f0/2d3748?text=Ejemplo+de+Matriz+de+Raven",
    options: ["Opción A", "Opción B", "Opción C", "Opción D"],
    correctAnswer: "Opción C",
  },
  {
    type: "multiple-choice",
    category: "Razonamiento Fluido",
    text: "Agua es a tubería como ______ es a cable.",
    options: ["Electricidad", "Luz", "Calor", "Fibra"],
    correctAnswer: "Electricidad",
  },
  // --- Comprensión Verbal (Gc) ---
  {
    type: "multiple-choice",
    category: "Comprensión Verbal",
    text: '¿Cuál es el significado de la palabra "perspicaz"?',
    options: [
      "Que habla mucho",
      "Que comprende las cosas con agudeza",
      "Que es muy lento",
      "Que es físicamente fuerte",
    ],
    correctAnswer: "Que comprende las cosas con agudeza",
  },
  {
    type: "multiple-choice",
    category: "Comprensión Verbal",
    text: "¿En qué se parecen la libertad y la justicia?",
    options: [
      "Son emociones",
      "Son lugares",
      "Son conceptos abstractos e ideales sociales",
      "Son objetos físicos",
    ],
    correctAnswer: "Son conceptos abstractos e ideales sociales",
  },
  // --- Memoria de Trabajo (Gsm) ---
  {
    type: "text-input",
    category: "Memoria de Trabajo",
    text: "Observa la siguiente secuencia de números por 5 segundos y luego escríbela en orden inverso: 8 - 4 - 9 - 2 - 7",
    correctAnswer: "72948",
  },
  {
    type: "ordering",
    category: "Memoria de Trabajo",
    text: "Ordena la siguiente secuencia de letras y números, primero los números de menor a mayor y luego las letras en orden alfabético: B - 5 - A - 2 - D",
    options: ["B", "5", "A", "2", "D"],
    correctAnswer: ["2", "5", "A", "B", "D"],
  },
  // --- Procesamiento Visoespacial (Gv) ---
  {
    type: "multiple-choice",
    category: "Procesamiento Visoespacial",
    text: "Si rotas esta figura 90 grados en sentido horario, ¿cómo se vería?",
    image: "https://placehold.co/200x200/e2e8f0/2d3748?text=Figura+Original",
    options: ["Opción A", "Opción B", "Opción C", "Opción D"],
    correctAnswer: "Opción A",
  },
  // --- Conocimiento Cuantitativo (Gq) ---
  {
    type: "text-input",
    category: "Conocimiento Cuantitativo",
    text: "Un tren viaja a 80 km/h. ¿Cuánto tardará en recorrer 20 km? (Escribe solo el número de minutos)",
    correctAnswer: "15",
  },
];
