"use client";
import { useState, useEffect } from "react";
import WheelComponent from "./components/WheelComponent";
import Welcome from "./components/Welcome";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const welcomeTimeout = setTimeout(() => {
      setShowWelcome(false);
    }, 6000); // 6 seconds delay

    return () => clearTimeout(welcomeTimeout);
  }, []);
  return (
    <div className="App bg-gray-50">
      {showWelcome ? (
        <Welcome onFinish={() => setShowWelcome(false)} />
      ) : (
        <WheelComponent />
      )}
    </div>
  );
}
