import { Checkbox } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../../context/todoContext";
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { updateTodo } from "../../services/todo";

dayjs.extend(customParseFormat);


export default function DetailedTodoView() {
 
  /*

    TODO : Add remind daily functionality
    TODO : starred functionality with ui change 
    TODO : Add sub task functionality with chain animation, drag and reorder
    TODO : Change checkbox colors
  */
  
  const [ isToday, setIsToday ] = useState(null);
  const { todoInDetail, setTodoInDetail, todo, setTodo  } = useContext(TodoContext);
  const [ selectedDate, setSelectedDate ] = useState(null);
  let todayDate = dayjs().format("DD/MM/YYYY");

  useEffect( () => {
    console.log("Use effect called");
    console.log("todoInDetail");
    console.log(todoInDetail);
    if(todoInDetail.dueDate === '1/1/1') {
      console.log("The date is 1/1/1");
      setSelectedDate(null);
    } else {
      console.log("peekaboo");
      console.log(todoInDetail.dueDate);
      console.log(dayjs(todoInDetail.dueDate, "DD/MM/YYYY"));
      setSelectedDate(dayjs(todoInDetail.dueDate, "DD/MM/YYYY"));
    }

    setIsToday(todoInDetail.dueDate === todayDate)
    return () => {
      setSelectedDate(null);
    };

  },[todoInDetail])


  
  function handleDateChange(newDate) {
    
    const formattedDate = newDate.format("DD/MM/YYYY");
    todoInDetail.dueDate = formattedDate;
    setTodoInDetail( (prev) => ({
      ...prev,
      dueDate:formattedDate,
    }) ) // TODO :  here also update the local todo state array

    if(formattedDate === todayDate) {
      setIsToday(true);
    } else {
      setIsToday(false);
    }
  }

  function todayHandler(){
    //also add update the today list and update due date to today
    setSelectedDate(dayjs());
     
    setTodoInDetail((prev) => ( {
      ...prev,
      dueDate: todayDate,
    })); // TODO : here also update the local todo state array
    setIsToday(true);
  }

  async function updateHandler() {
    //TODO : here the object to send will be a temp todo object - create and discard the object according to detailedTodoView renders
    const result = await updateTodo(todoInDetail._id,todoInDetail);
  }

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
      <div className="flex justify-center items-center basis-1/2
                      rounded py-1 px-6 border mr-1 shadow-md shadow-white-400
                      font-roboto text-md tracking-wide text-white-950 h-20"
      >
        <span className="basis-1/3">Due Date</span>
        <div className="basis-2/3">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                disablePast
                format="DD/MM/YYYY"
                views={['year', 'month', 'day']}
                value={selectedDate}
                onChange={handleDateChange}
              />
          </LocalizationProvider>
        </div>
        
        
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
                      font-roboto text-md tracking-wide text-white-950 h-20"
      >
        Repeat Daily
      </div>
      <div className={`flex justify-center items-center basis-1/2 rounded p-1 
                      border ml-1 shadow-md shadow-white-400 cursor-pointer
                      font-roboto text-md tracking-wide text-white-950 ${isToday ? 'bg-white-500' : ''}`}
                      onClick={todayHandler}
      >
        Do it Today!!!
      </div>
    </div>
    <textarea className="mt-10 w-full h-52 border rounded p-2
                        shadow-md shadow-white-400 bg-white-100
                        font-roboto text-md tracking-wide text-white-950" 
                        placeholder='Description...'
    />
    <div className="flex items-center justify-center w-full border 
                    rounded p-2 bg-white-400 cursor-pointer mt-8
                    font-roboto text-md tracking-wide text-white-950"
          onClick={updateHandler}>
      Update
    </div>
  </div>;
}
