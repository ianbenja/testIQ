// src/components/questionTypes/Ordering.tsx
import React, { useState } from "react";
import type { OrderingQuestion } from "../../types";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

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
    zIndex: isDragging ? 10 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-4 rounded-lg text-lg transition-shadow
        ${
          isDragging
            ? "bg-primary-light border-primary shadow-xl text-white"
            : "bg-surface border border-gray-300 text-textPrimary"
        }`}
    >
      <span>{props.id}</span>
      <button {...attributes} {...listeners} className="cursor-grab p-2">
        <GripVertical />
      </button>
    </div>
  );
}

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
    <div className="max-w-md mx-auto">
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
        className="w-full bg-secondary text-white font-bold py-4 px-6 rounded-lg text-lg hover:bg-green-600 transition-colors duration-200"
      >
        Confirmar Orden
      </button>
    </div>
  );
};

export default Ordering;
