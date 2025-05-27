import "./LoadingText.css";

const LoadingText = () => {
  const topText = "khách sạn";
  const fullText = "PHƯƠNG TRANG";

  return (
    <>
      <div className={`loading-overlay`}>
        <div className="loading-panel left-panel" />
        <div className="loading-panel right-panel" />
        <div className="loading-text-container">
          <p className="loading-text text-center text-[2rem]">{topText}</p>
          <p className={`loading-text text-[3rem]`}>{fullText}</p>
        </div>
      </div>
    </>
  );
};

export default LoadingText;
