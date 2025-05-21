import { useState, useEffect } from "react";
import "./LoadingText.css";

const LoadingText = () => {
  const fullText = "PHƯƠNG TRANG HOTEL";
  const [displayText, setDisplayText] = useState("");
  const [startFadeOut, setStartFadeOut] = useState(false);
  const [splitScreen, setSplitScreen] = useState(false);
  const [hideOverlay, setHideOverlay] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setStartFadeOut(true);

        // Wait for fade out animation, then split screen
        setTimeout(() => {
          setSplitScreen(true);
        }, 3000); // fade out duration

        // Hide overlay after both animations
        setTimeout(() => {
          setHideOverlay(true);
        }, 4000); // total duration (fade + split)
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {!hideOverlay && (
        <div className={`loading-overlay ${splitScreen ? "split" : ""}`}>
          <div className="loading-panel left-panel" />
          <div className="loading-panel right-panel" />
          <div className="loading-text-container">
            <span className={`loading-text ${startFadeOut ? "fade-out" : ""}`}>
              {displayText}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingText;
