// src/components/questionTypes/Ordering.tsx
import React, { useState } from "react";
import { OrderingQuestion } from "../../types";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Componente interno para cada elemento que se puede arrastrar
function SortableItem(props: { id: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : "auto", // Asegura que el elemento arrastrado esté por encima de los demás
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-4 rounded-lg text-lg text-center cursor-grab transition-shadow
        ${
          isDragging
            ? "bg-blue-100 border-blue-400 shadow-xl"
            : "bg-white border border-gray-300"
        }`}
    >
      {props.id}
    </div>
  );
}

// Componente principal de la pregunta de ordenamiento
const Ordering: React.FC<{
  question: OrderingQuestion;
  onAnswer: (answer: string[]) => void;
}> = ({ question, onAnswer }) => {
  const [items, setItems] = useState(question.items);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((currentItems) => {
        const oldIndex = currentItems.findIndex((item) => item === active.id);
        const newIndex = currentItems.findIndex((item) => item === over.id);
        return arrayMove(currentItems, oldIndex, newIndex);
      });
    }
  };

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="space-y-3 mb-6">
            {items.map((item) => (
              <SortableItem key={item} id={item} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <button
        onClick={() => onAnswer(items)}
        className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Confirmar Orden
      </button>
    </div>
  );
};

export default Ordering;
