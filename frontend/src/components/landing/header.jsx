import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
export default function Header({ onLoginClick, onSignupClick }) {
  console.log("header rendered");

  return (
    <div className="flex flex-col lm:flex-row justify-between items-center ">
      <span className="text-white-800 font-medium ml-8 mt-3 text-base ms:text-2xl md:text-3xl w-fit h-fit font-rampart">
        Tick
        <DoneOutlineRoundedIcon sx={{ fontSize: 40 }} />
        Maar
      </span>

      <div className="p-8 flex flex-col lm:flex-row">
        <button
          className=" text-white-100 bg-white-800 hover:bg-white-600 
                                font-medium font-roboto rounded-sm text-base 
                                px-5 py-2.5 mt-6 me-2 mb-2"
          onClick={onLoginClick}
        >
          Login
        </button>

        <button
          className=" text-white-100 bg-white-800 hover:bg-white-600 
                                font-medium font-roboto rounded-sm text-base 
                                px-5 py-2.5 mt-6 me-2 mb-2"
          onClick={onSignupClick}
        >
          New Here
        </button>
      </div>
    </div>
  );
}
