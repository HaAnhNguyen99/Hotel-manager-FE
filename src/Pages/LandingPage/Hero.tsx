const Hero = () => {
  const title = "Lorem ipsum dolor sit amet.";
  const des =
    "orem ipsum dolor sit amet, consectetur adipiscing elit. Proin ex dolor,";

  return (
    <div className="min-h-svh bg-gray-300 relative">
      <div className="max-w-4xl absolute bottom-36 left-12 leading-10">
        <h1 className="font-bold text-3xl">{title}</h1>
        <p>{des}</p>
      </div>
    </div>
  );
};

export default Hero;
