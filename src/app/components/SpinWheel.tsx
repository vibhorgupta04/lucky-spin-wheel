import React, { useState } from "react";
import "./SpinWheel.css";

interface SpinWheelProps {
  onSpinComplete: (result: string) => void; // Expecting a string result for the prize
}

const SpinWheel: React.FC<SpinWheelProps> = ({ onSpinComplete }) => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);

    const spinDuration = Math.random() * (10000 - 8000) + 8000;
    const prizes = ["Gift 1", "Gift 2", "Gift 3"];
    const spinResult: string =
      prizes[Math.floor(Math.random() * prizes.length)];
    setTimeout(() => {
      setResult(spinResult);
      setSpinning(false);
      onSpinComplete(spinResult);
    }, spinDuration);
  };

  return (
    <div className="spin-wheel-container">
      <button
        onClick={spin}
        disabled={spinning}
        className="big-push-button text-red-600"
      >
        {spinning ? "Spinning..." : "Spin the Wheel!"}
      </button>
      {result && <div className="result">{`You won: ${result}`}</div>}
    </div>
  );
};

export default SpinWheel;
