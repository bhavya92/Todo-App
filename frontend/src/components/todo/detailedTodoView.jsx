import { Checkbox } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { TodoContext } from "../../context/todoContext";

export default function DetailedTodoView() {

  const { todoInDetail  } = useContext(TodoContext);

  return <div className="w-full h-full p-8 flex flex-col">
    <div className="flex flex-col w-full h-fit pl-2 pt-2 pb-2 pr-4
                    border rounded shadow-md shadow-white-400">
      <div className="h-fit w-full flex justify-between items-center ">
        <div className="w-fit ">
          <Checkbox/>
          <span className="font-roboto text-md tracking-wide text-white-950">{todoInDetail.title}</span>
        </div>  
          <StarRoundedIcon/>
      </div>
      <div className="p-1 transition-all duration-200 ease-in-out px-2 cursor-pointer hover:bg-stone-200">
        <AddIcon/>
        <span className="ml-2 font-roboto text-md tracking-wide text-white-950">Add Subtask</span>
      </div>
    </div>
    <div className="mt-10 w-full flex flex-row">
      <div className="flex justify-center items-center basis-1/2 cursor-pointer
                      rounded p-1 border mr-1 shadow-md shadow-white-400
                      font-roboto text-md tracking-wide text-white-950"
      >
        Due Date
      </div>
      <div className="flex justify-center items-center basis-1/2 cursor-pointer
                      rounded p-1 border ml-1 shadow-md shadow-white-400
                      font-roboto text-md tracking-wide text-white-950"
      >
        Remind me
      </div>
    </div>
    <div className="mt-6 w-full flex flex-row">
      <div className="flex justify-center items-center basis-1/2 rounded p-1 
                      border mr-1 shadow-md shadow-white-400 cursor-pointer
                      font-roboto text-md tracking-wide text-white-950"
      >
        Repeat Daily
      </div>
      <div className="flex justify-center items-center basis-1/2 rounded p-1 
                      border ml-1 shadow-md shadow-white-400 cursor-pointer
                      font-roboto text-md tracking-wide text-white-950"
      >
        Do it Today!!!
      </div>
    </div>
    <textarea className="mt-10 w-full h-52 border rounded p-2
                        shadow-md shadow-white-400 bg-white-100
                        font-roboto text-md tracking-wide text-white-950" 
                        placeholder='Description...'
    />
  </div>;
}
