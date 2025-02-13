import Checkbox from '@mui/material/Checkbox';
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useEffect, useRef, useState } from "react";
import { TodoContext } from "../../context/todoContext";
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { updateTodo } from "../../services/todo";
import ClearIcon from '@mui/icons-material/Clear';
import { AlertContext } from "../../context/alertcontext";

dayjs.extend(customParseFormat);


export default function DetailedTodoView() {
 
  /*
    TODO : starred functionality with ui change 
    TODO : Add sub task functionality with chain animation, drag and reorder
    TODO : Change checkbox colors
  */
  let updatedTodoObject = {}
  const [ isToday, setIsToday ] = useState(null);
  const [ reminder, setReminder ] = useState(null);
  const [ repeat, setRepeat ] = useState(null);
  const [ description, setDescription ] = useState(null);
  const { todoInDetail, setTodoInDetail, todo, setTodo  } = useContext(TodoContext);
  const [ selectedDate, setSelectedDate ] = useState(null);
  const [isStarred, setIsStarred] = useState(null);
  const { setIsAlert, setAlertMessage, setSeverity } = useContext(AlertContext);
  const descriptionRef = useRef(null);
  let todayDate = dayjs().format("DD/MM/YYYY");

  useEffect( () => {
    console.log("Use effect called");
    console.log("todoInDetail");
    console.log(`todoInDetail dudate ${todoInDetail.dueDate}`);
    setDescription(todoInDetail.description);
    if(todoInDetail.dueDate === '1/1/1') {
      console.log("The date is 1/1/1");
      setSelectedDate(null);
    } else {
      console.log("peekaboo");
      console.log(todoInDetail.dueDate);
      console.log(dayjs(todoInDetail.dueDate, "DD/MM/YYYY"));
      setSelectedDate(dayjs(todoInDetail.dueDate, "DD/MM/YYYY"));
    }

    setIsToday(todoInDetail.dueDate === todayDate);
    console.log(`daily ${todoInDetail.daily}`);
    setReminder(todoInDetail.remind);
    setRepeat(todoInDetail.daily);
    setIsStarred(todoInDetail.starred);
    console.log(`starred is ${todoInDetail.starred}`);
    return () => {
      setSelectedDate(null);
      descriptionRef.current = null;
    };

  },[todoInDetail])

  function starredHandler(){
    setIsStarred( (prev) => !prev );
  }

  function handleTextareaChange(e){
    setDescription(e.target.value);
    e.target.style.height = "auto"; 
    e.target.style.height = e.target.scrollHeight + "px"; 
  }

  function clearDateHandler(){
    setSelectedDate(null);
    setIsToday(false);
  }

  function handleDateChange(newDate) {
    
    const formattedDate = newDate.format("DD/MM/YYYY");
    todoInDetail.dueDate = formattedDate;
    setSelectedDate(dayjs(formattedDate,"DD/MM/YYYY"));

    if(formattedDate === todayDate) {
      setIsToday(true);
    } else {
      setIsToday(false);
    }
  }

  function remindHandler(){
    setReminder((prevReminder) => {
      const newReminder = !prevReminder; 
  
      console.log(`pre value ${prevReminder}`);
      console.log(`new value ${newReminder}`);
      return newReminder;
    });
  }

  function repeatHandler(){
    console.log("Inside Repeat Handler");
    setRepeat((prevRepeat) => {
      const newRepeat = !prevRepeat; 
  
      console.log(`pre value ${prevRepeat}`);
      console.log(`new value ${newRepeat}`);
      return newRepeat;
    });
  }

  function todayHandler(){
    if(isToday === null || isToday === false) {
      let formattedDate = dayjs().format("DD/MM/YYYY");
      setSelectedDate(dayjs(formattedDate,"DD/MM/YYYY"));
       
      setTodoInDetail((prev) => ( {
        ...prev,
        dueDate: todayDate,
      }));
      setIsToday(true);
    } else {
      setSelectedDate(null);
      setIsToday(false);
    }

  }

  async function updateHandler() {
    let newDescription = description;
    let newDate;
    if(selectedDate !== null)
      newDate = selectedDate.format("DD/MM/YYYY");
    else
      newDate="1/1/1"

    updatedTodoObject = {
      title:todoInDetail.title,
      starred:todoInDetail.starred,
      remind:reminder,
      daily:repeat,
      description: newDescription,
      dueDate:newDate,
      starred:isStarred,
    }


    //updating at backend
    const result = await updateTodo(todoInDetail._id,updatedTodoObject);
    if(result.status === "200") {
      console.log("Todo Updated succesfully");
      //updatinng todo state varaiable for FE
      console.log("Todo updated at backend");
      console.log(todo);
      let newTodo = todo.map((list) => ({
        ...list,
        data : list.data.map( (item) => 
            item._id === todoInDetail._id ? {...item, ...updatedTodoObject} : item
          )
      }));
      setTodo(newTodo);
      setSeverity("success");
      setAlertMessage("Todo Updated");
      setIsAlert(true);
      updatedTodoObject = {};
    } else {
      setSeverity("error");
      setAlertMessage("Something went wrong.");
      setIsAlert(true);
    }   
  }

  return <div className="w-full h-full px-8 py-12 flex flex-col">
    <div className="flex flex-col w-full h-fit pl-2 pt-2 pb-2 pr-4
                    border rounded shadow-md shadow-white-400">
      <div className="h-fit w-full flex justify-between items-center ">
        <div className="w-fit ">
          <Checkbox sx= {{ color: "#525252",
          '&.Mui-checked': {
            color: "#989898",
            }, 
          }}/>
          <span className="font-roboto text-md tracking-wide text-white-950">{todoInDetail.title}</span>
        </div>  
          <div className="w-fit h-fit cursor-pointer hover:scale-110"
              onClick={starredHandler}>
            <StarRoundedIcon sx= {{  color : `${isStarred ? "#e8b923":"#464646"}`}}/>
          </div>
      </div>
      {/* <div className="p-1 transition-all duration-200 ease-in-out px-2 cursor-pointer hover:bg-stone-200">
        <AddIcon/>
        <span className="ml-2 font-roboto text-md tracking-wide text-white-950">Add Subtask</span>
      </div> */}
    </div>
    <div className="mt-10 w-full flex flex-row">
      <div className="flex justify-center items-center basis-1/2 gap-2
                      rounded py-1 px-2 border mr-1 shadow-md shadow-white-400
                      font-roboto text-md tracking-wide text-white-950 h-20"
      >
        <span className="flex-none">Due Date</span>
        <div className="flex-1">
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
        <div className="flex-none cursor-pointer w-fit h-fit hover:scale-105"
              onClick = {clearDateHandler}
        >
          <ClearIcon sx={{ fontSize:30 }}/>
        </div>
        
      </div>
      <div className={`flex justify-center items-center basis-1/2 cursor-pointer
                      rounded p-1 border ml-1 shadow-md shadow-white-400
                      font-roboto text-md tracking-wide text-white-950 ${reminder ? 'bg-white-500' : ''}`}
            onClick={remindHandler}
      >
        Remind me
      </div>
    </div>
    <div className="mt-6 w-full flex flex-row">
      <div className={`flex justify-center items-center basis-1/2 rounded p-1 
                      border mr-1 shadow-md shadow-white-400 cursor-pointer
                      font-roboto text-md tracking-wide text-white-950 h-20 ${repeat ? 'bg-white-500' : ''}`}
            onClick={repeatHandler}
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
    <textarea className="mt-10 w-full border rounded p-2 resize-none
                        shadow-md shadow-white-400 bg-white-100 overflow-hidden
                        font-roboto text-md tracking-wide text-white-950" 
                        placeholder='Description...'
                        value={description}
                        rows="4"
                        onChange={handleTextareaChange}
    />
    <div className="flex items-center justify-center w-full border 
                    rounded p-2 bg-white-400 cursor-pointer mt-8
                    font-roboto text-md tracking-wide text-white-950"
          onClick={updateHandler}>
      Update
    </div>
  </div>;
}
