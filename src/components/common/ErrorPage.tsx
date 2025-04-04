const ErrorPage = ({ error }: { error?: string | null }) => {
  return (
    <div className="h-[90vh] w-[90vw] flex justify-center items-center">
      <div>
        <h1 className="text-[20rem] text-center leading-tight font-extrabold text-[#d6d6d6]">
          404
        </h1>
        <p className="text-[2rem] text-center leading-tight text-[#B3B3B3]">
          Not Found
        </p>
        <p className="text-red-600 text-base text-center">{error}</p>
      </div>
    </div>
  );
};

export default ErrorPage;
