const Progress = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-md w-[350px] px-4 py-3 flex flex-col gap-2">
        <h1 className="text-center font-bold text-3xl">Work in progress!</h1>
        <p className="text-[#B3B3B3] text-sm text-center">
          The section you're trying to access is currently under development!
        </p>
        <p className="text-center text-[#B3B3B3]">Please try again later</p>
      </div>
    </div>
  );
};

export default Progress;
