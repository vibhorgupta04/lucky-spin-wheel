import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import { Wheel } from "spin-wheel";
import { generateRandomPosition } from "./Welcome";

const WheelComponent = () => {
  const containerRef = useRef(null);
  const wheelRef: any = useRef(null);
  const [prizes] = useState([
    { label: "$1000", stopText: "Won $1000!" },
    { label: "LOSE", stopText: "Better luck next time!" },
    { label: "$500", stopText: "Won $500!" },
    { label: "$200", stopText: "Won $200!" },
    { label: "$50", stopText: "Won $50!" },
    { label: "$5", stopText: "Won $5!" },
    { label: "$300", stopText: "Won $300!" },
    { label: "$700", stopText: "Won $700!" },
    { label: "$400", stopText: "Won $400!" },
    { label: "$2000", stopText: "Won $2000!" },
  ]);

  const [winningPrize, setWinningPrize] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [audio, setAudio] = useState<any>(null);
  const [code, setCode] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  const playCelebrationSound = () => {
    const newAudio: any = new Audio("/clapping.mp3");
    newAudio.play();
    setAudio(newAudio);

    const soundTimeout = setTimeout(() => {
      newAudio.pause();
      newAudio.currentTime = 0;
    }, 30000);

    return soundTimeout;
  };

  const getImageElement = (img: any) => {
    let image = new Image();
    image.src = img;
    return image;
  };

  useEffect(() => {
    if (containerRef.current && !wheelRef.current) {
      const overlayImg = new Image();
      overlayImg.src = "/example-2-overlay.svg";

      const image = new Image();
      image.src = "/example-0-image.svg";
      overlayImg.onload = () => {
        setImageLoaded(true);
      };

      if (imageLoaded) {
        const wheelConfig = {
          borderColor: "#FFD700",
          borderWidth: 6,
          debug: false,
          isInteractive: false,
          itemBackgroundColors: ["#B22222", "#FFFFF0"],
          itemLabelAlign: "right",
          itemLabelBaselineOffset: 0,
          itemLabelFont: "sans-serif",
          itemLabelRadius: 0.65,
          itemLabelRadiusMax: 0.2,
          itemLabelRotation: 0,
          itemLabelStrokeColor: "#fff",
          itemLabelStrokeWidth: 0,
          lineColor: "#FFD700",
          itemLabelColors: ["#FFFFF0", "#B22222"],
          itemLabelFontSizeMax: 20,
          lineWidth: 2,
          pixelRatio: 0,
          pointerAngle: 0,
          radius: 0.95,
          rotationResistance: -100,
          rotationSpeedMax: 1000,
          overlayImage: overlayImg,
          items: prizes.map((prize) => ({
            label: prize.label,
          })),
        };

        wheelRef.current = new Wheel(containerRef.current, wheelConfig);
      }
    }

    return () => {
      if (wheelRef.current) {
        wheelRef.current = null;
      }
    };
  }, [prizes, imageLoaded]);

  const generateUniqueCode = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    return `WIN-${timestamp}-${randomNum}`;
  };

  const playSpinWheelMusic = () => {
    const newAudio: any = new Audio("/sound.mp3");
    newAudio.play();
    setAudio(newAudio);
    return newAudio;
  };

  const stopSpinWheelMusic = (audio: any) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const spinWheelToItem = async () => {
    if (!wheelRef.current) {
      console.error("Wheel is not initialized yet.");
      return;
    }

    setIsSpinning(true);
    let winningItemIndex: any;

    const getValidWinningItemIndex = () => {
      let index;
      do {
        index = Math.floor(Math.random() * prizes.length);
      } while (prizes[index].stopText === "");
      return index;
    };

    winningItemIndex = getValidWinningItemIndex();

    const duration = 4000;
    const easing = Wheel.easing?.cubicOut || ((t: any) => t);

    const audio = playSpinWheelMusic();

    wheelRef.current.spinToItem(winningItemIndex, duration, true, 2, 1, easing);

    setTimeout(() => {
      const prize: any = prizes[winningItemIndex];
      setWinningPrize(prize.stopText);
      const uniqueCode = generateUniqueCode();
      setCode(uniqueCode);

      stopSpinWheelMusic(audio);

      setIsModalOpen(true);
      playCelebrationSound();
      setShowConfetti(true);
      setIsSpinning(false);
    }, duration);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setWinningPrize(null);
    setShowConfetti(false);
    if (audio) {
      audio?.pause();
      audio.currentTime = 0;
    }
  };
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
    <div className="h-screen bg-gradient-to-r from-[#ecdec4] via-[#62f4f9] to-[#d3f3f1] text-white relative">
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      {/* Background decoration */}
      {/* Hearts */}
      <div className="absolute inset-0 overflow-hidden">{heartElements}</div>

      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden">{starElements}</div>
      {/* Wave Motion */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-[#ff6f61] opacity-60 w-40 h-20 absolute bottom-16 right-20 animate-wave"></div>
      </div>

      {!winningPrize && (
        <button
          className="top-40 left-14 absolute animate-bounce bg-[#FFFFF0] hover:bg-[#B22222] disabled:bg-[#B22222] py-2 px-6 rounded-lg text-[#B22222] border-[#FFD700] hover:text-[#FFFFF0] text-lg font-semibold shadow-lg transition duration-300 transform hover:scale-105"
          onClick={spinWheelToItem}
          disabled={isSpinning}
        >
          {isSpinning ? "Spinning..." : "Spin to Win!"}
        </button>
      )}

      {isModalOpen && (
        <div className="celebration-overlay">
          <div className="celebration-modal">
            <h2 className="text-3xl my-4 font-bold">🎉 Congratulations! 🎉</h2>
            <p className="text-2xl my-6">{winningPrize}</p>
            <button
              onClick={closeModal}
              className="my-10 mx-auto bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <style>
        {`
          .celebration-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
          }
          .celebration-modal {
            position: relative;
            z-index: 10;
            color: white;
            text-align: center;
            padding: 20px;
            background: rgba(0, 0, 0, 0.8);
            border-radius: 10px;
            margin: 40px;
            width: 50vw;
            height: 50vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
      <div className="h-full flex justify-center items-center">
        <div
          ref={containerRef}
          style={{
            width: "70vmin",
            height: "70vmin",
            borderRadius: "50%",
            position: "relative",
          }}
        />
      </div>
    </div>
  );
};

export default WheelComponent;
