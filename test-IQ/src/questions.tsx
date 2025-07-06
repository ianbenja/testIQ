// src/questions.tsx
import { AnyQuestion } from "./types";

// Este archivo ya está bien estructurado, solo nos aseguramos de que use el tipo 'AnyQuestion'.
// El contenido que me pasaste anteriormente se mantiene.
export const questions: AnyQuestion[] = [
  // --- Razonamiento Fluido (Gf) ---
  {
    id: 21,
    type: "multiple-choice",
    category: "Razonamiento Fluido",
    text: "Completa la analogía: Guante es a mano como zapato es a...",
    options: ["Pie", "Pierna", "Dedo", "Ropa"],
    answer: "Pie",
    difficulty: 2,
  },
  {
    id: 22,
    type: "multiple-choice",
    category: "Razonamiento Fluido",
    text: "Agua es a tubería como ______ es a cable.",
    options: ["Electricidad", "Luz", "Calor", "Fibra"],
    answer: "Electricidad",
    difficulty: 3,
  },
  {
    id: 23,
    type: "multiple-choice",
    category: "Razonamiento Fluido",
    text: "Si todos los Zips son Zaps y algunos Zaps son Zops, ¿cuál de las siguientes afirmaciones es definitivamente cierta?",
    options: [
      "Todos los Zips son Zops",
      "Algunos Zips son Zops",
      "Ningún Zip es Zop",
      "No se puede determinar",
    ],
    answer: "No se puede determinar",
    difficulty: 6,
  },
  // --- Comprensión Verbal (Gc) ---
  {
    id: 24,
    type: "multiple-choice",
    category: "Comprensión Verbal",
    text: '¿Cuál es el significado de la palabra "perspicaz"?',
    options: [
      "Que habla mucho",
      "Que comprende las cosas con agudeza",
      "Que es muy lento",
      "Que es físicamente fuerte",
    ],
    answer: "Que comprende las cosas con agudeza",
    difficulty: 5,
  },
  {
    id: 25,
    type: "multiple-choice",
    category: "Comprensión Verbal",
    text: "¿Cuál es el antónimo de 'locuaz'?",
    options: ["Hablador", "Extrovertido", "Taciturno", "Alegre"],
    answer: "Taciturno",
    difficulty: 7,
  },
  // --- Memoria de Trabajo (Gsm) ---
  {
    id: 26,
    type: "text-input",
    category: "Memoria de Trabajo",
    text: "Memoriza y luego escribe la siguiente secuencia en orden inverso: 8 - 4 - 9 - 2 - 7",
    answer: "72948",
    difficulty: 7,
  },
  {
    id: 27,
    type: "ordering",
    category: "Memoria de Trabajo",
    text: "Ordena la siguiente secuencia, primero los números de menor a mayor y luego las letras en orden alfabético: B - 5 - A - 2 - D",
    items: ["B", "5", "A", "2", "D"],
    answer: ["2", "5", "A", "B", "D"],
    difficulty: 6,
  },
  {
    id: 28,
    type: "text-input",
    category: "Memoria de Trabajo",
    text: "Calcula mentalmente: (5 * 6) + 12 - 7. Escribe solo el resultado.",
    answer: "35",
    difficulty: 5,
  },
  // --- Procesamiento Visoespacial (Gv) ---
  {
    id: 29,
    type: "multiple-choice",
    category: "Procesamiento Visoespacial",
    text: "Si doblas un papel cuadrado por la mitad dos veces y luego cortas una esquina, ¿cuántos agujeros habrá cuando lo desdobles?",
    options: ["1", "2", "3", "4"],
    answer: "4",
    difficulty: 6,
  },
  {
    id: 30,
    type: "text-input",
    category: "Procesamiento Visoespacial",
    text: "Imagina un cubo de 3x3x3. Si pintas todas sus caras exteriores de rojo y luego lo cortas en cubos de 1x1x1, ¿cuántos cubos pequeños no tendrán ninguna cara pintada?",
    answer: "1",
    difficulty: 8,
  },
  // --- Conocimiento Cuantitativo (Gq) ---
  {
    id: 31,
    type: "text-input",
    category: "Conocimiento Cuantitativo",
    text: "Un tren viaja a 80 km/h. ¿Cuánto tardará en recorrer 20 km? (Escribe solo el número de minutos)",
    answer: "15",
    difficulty: 4,
  },
  {
    id: 32,
    type: "text-input",
    category: "Conocimiento Cuantitativo",
    text: "Si 5 impresoras tardan 5 minutos en imprimir 5 folletos, ¿cuánto tardaría 1 impresora en imprimir 1 folleto?",
    answer: "5",
    difficulty: 7,
  },
  {
    id: 33,
    type: "multiple-choice",
    category: "Conocimiento Cuantitativo",
    text: "En una clase hay 15 niños y 25 niñas. ¿Qué porcentaje de la clase son niñas?",
    options: ["40%", "60%", "62.5%", "75%"],
    answer: "62.5%",
    difficulty: 5,
  },
];
