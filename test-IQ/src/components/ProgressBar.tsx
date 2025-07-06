// src/components/ProgressBar.tsx
import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface ProgressBarProps {
  current: number;
  total: number;
  startTime: number;
}

const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  startTime,
}) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const percentage = total > 0 ? ((current + 1) / total) * 100 : 0;

  return (
    <div className="w-full mb-8 animate-slide-in">
      <div className="flex justify-between items-center mb-2 text-textSecondary">
        <span className="text-sm font-medium font-display">
          Pregunta {current + 1} de {total}
        </span>
        <span className="flex items-center gap-2 text-sm font-semibold font-mono">
          <Clock size={16} />
          {formatTime(elapsedTime)}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-primary h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
