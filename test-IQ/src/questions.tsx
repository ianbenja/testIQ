import type { Question } from "./types";

// Se han eliminado todas las imágenes y se han agregado más preguntas.
export const questions: Question[] = [
  // --- Razonamiento Fluido (Gf) ---
  {
    type: "multipleChoice",
    category: "Razonamiento Fluido",
    text: "Completa la analogía: Guante es a mano como zapato es a...",
    options: ["Pie", "Pierna", "Dedo", "Ropa"],
    correctAnswer: "Pie",
  },
  {
    type: "multipleChoice",
    category: "Razonamiento Fluido",
    text: "Agua es a tubería como ______ es a cable.",
    options: ["Electricidad", "Luz", "Calor", "Fibra"],
    correctAnswer: "Electricidad",
  },
  {
    type: "multipleChoice",
    category: "Razonamiento Fluido",
    text: "Si todos los Zips son Zaps y algunos Zaps son Zops, ¿cuál de las siguientes afirmaciones es definitivamente cierta?",
    options: [
      "Todos los Zips son Zops",
      "Algunos Zips son Zops",
      "Ningún Zip es Zop",
      "No se puede determinar",
    ],
    correctAnswer: "No se puede determinar",
  },
  // --- Comprensión Verbal (Gc) ---
  {
    type: "multipleChoice",
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
    type: "multipleChoice",
    category: "Comprensión Verbal",
    text: "¿Cuál es el antónimo de 'locuaz'?",
    options: ["Hablador", "Extrovertido", "Taciturno", "Alegre"],
    correctAnswer: "Taciturno",
  },
  // --- Memoria de Trabajo (Gsm) ---
  {
    type: "textInput",
    category: "Memoria de Trabajo",
    text: "Memoriza y luego escribe la siguiente secuencia en orden inverso: 8 - 4 - 9 - 2 - 7",
    correctAnswer: "72948",
  },
  {
    type: "ordering",
    category: "Memoria de Trabajo",
    text: "Ordena la siguiente secuencia, primero los números de menor a mayor y luego las letras en orden alfabético: B - 5 - A - 2 - D",
    options: ["B", "5", "A", "2", "D"],
    correctAnswer: ["2", "5", "A", "B", "D"],
  },
  {
    type: "textInput",
    category: "Memoria de Trabajo",
    text: "Calcula mentalmente: (5 * 6) + 12 - 7. Escribe solo el resultado.",
    correctAnswer: "35",
  },
  // --- Procesamiento Visoespacial (Gv) ---
  {
    type: "multipleChoice",
    category: "Procesamiento Visoespacial",
    text: "Si doblas un papel cuadrado por la mitad dos veces y luego cortas una esquina, ¿cuántos agujeros habrá cuando lo desdobles?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "4",
  },
  {
    type: "textInput",
    category: "Procesamiento Visoespacial",
    text: "Imagina un cubo de 3x3x3. Si pintas todas sus caras exteriores de rojo y luego lo cortas en cubos de 1x1x1, ¿cuántos cubos pequeños no tendrán ninguna cara pintada?",
    correctAnswer: "1",
  },
  // --- Conocimiento Cuantitativo (Gq) ---
  {
    type: "textInput",
    category: "Conocimiento Cuantitativo",
    text: "Un tren viaja a 80 km/h. ¿Cuánto tardará en recorrer 20 km? (Escribe solo el número de minutos)",
    correctAnswer: "15",
  },
  {
    type: "textInput",
    category: "Conocimiento Cuantitativo",
    text: "Si 5 impresoras tardan 5 minutos en imprimir 5 folletos, ¿cuánto tardaría 1 impresora en imprimir 1 folleto?",
    correctAnswer: "5",
  },
  {
    type: "multipleChoice",
    category: "Conocimiento Cuantitativo",
    text: "En una clase hay 15 niños y 25 niñas. ¿Qué porcentaje de la clase son niñas?",
    options: ["40%", "60%", "62.5%", "75%"],
    correctAnswer: "62.5%",
  },
];
