import { Link } from "react-router-dom";

const Files = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="font-bold text-3xl">Welcome to Spreadsheets!</h1>
        <p className="capitalize text-slate-400">One stop solution to organize large data..</p>
        <Link to="/spreadsheet">
          <button className="text-white bg-[#5D8363] py-2 px-5 rounded-md">
            Start Now!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Files;
