import { useState, useEffect } from "react";

export const generateRandomPosition = () => {
  return {
    top: `${Math.random() * 100}vh`,
    left: `${Math.random() * 100}vw`,
    animationDelay: `${Math.random() * 2}s`,
  };
};

const Welcome = ({ onFinish }: { onFinish: () => void }) => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(2), 3000);
    const timer2 = setTimeout(onFinish, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  const confettiElements = Array.from({ length: 15 }).map((_, index) => (
    <div
      key={`confetti-${index}`}
      style={generateRandomPosition()}
      className="bg-[#f1c40f] w-2 h-2 absolute animate-confetti"
    ></div>
  ));

  const heartElements = Array.from({ length: 3 }).map((_, index) => (
    <div
      key={`heart-${index}`}
      style={generateRandomPosition()}
      className="bg-[#ff3366] opacity-70 w-8 h-8 rounded-full absolute animate-heart"
    ></div>
  ));

  const starElements = Array.from({ length: 20 }).map((_, index) => (
    <div
      key={`star-${index}`}
      style={generateRandomPosition()}
      className="bg-[#fff] opacity-90 w-2 h-2 rounded-full absolute animate-star"
    ></div>
  ));

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-[#caefd7] via-[#f5bfd7] to-[#abc9e9] text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">{confettiElements}</div>

      {/* Clouds */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-[#ffffff] opacity-60 w-40 h-20 rounded-lg absolute top-16 left-16 animate-cloud"></div>
        <div className="bg-[#f8f8f8] opacity-40 w-36 h-18 rounded-lg absolute top-48 right-20 animate-cloud"></div>
      </div>

      {/* Hearts */}
      <div className="absolute inset-0 overflow-hidden">{heartElements}</div>

      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden">{starElements}</div>

      {/* Line */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-[#ffffff] opacity-60 w-48 h-1 absolute top-8 left-16 animate-line"></div>
        <div className="bg-[#f0f0f0] opacity-40 w-36 h-1 absolute top-32 right-20 animate-line"></div>
      </div>

      {/* Wave Motion */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-[#ffeb3b] opacity-70 w-40 h-20 absolute top-32 left-16 animate-wave"></div>
        <div className="bg-[#ff6f61] opacity-60 w-40 h-20 absolute bottom-16 right-20 animate-wave"></div>
      </div>

      {/* First step: Logo and Welcome message */}
      <div
        className={`transition-opacity duration-1000 ${
          step === 1 ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-6xl font-extrabold text-[#333333] animate__animated animate__fadeInUp">
          Hey there, ready to spin? 🎉
        </h1>
      </div>

      {/* Second step: Wish you a Good Luck message (in the same position) */}
      <div
        className={`transition-opacity duration-1000 ${
          step === 2 ? "opacity-100" : "opacity-0"
        } absolute top-1/2 transform -translate-y-1/2`}
      >
        <h2 className="text-4xl font-semibold text-[#444444] animate__animated animate__zoomIn">
          Good Luck, you're gonna win BIG! 🍀
        </h2>
      </div>
    </div>
  );
};

export default Welcome;
