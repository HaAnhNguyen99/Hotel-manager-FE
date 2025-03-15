import { useState, useEffect } from "react";
import "./LoadingText.css"; // We'll define this below

const LoadingText = () => {
  const fullText = "PHƯƠNG TRANG HOTEL";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval); // Stop when full text is displayed
      }
    }, 100); // Adjust speed (100ms per character)

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-text-container">
      <span className="loading-text">{displayText}</span>
    </div>
  );
};

export default LoadingText;
