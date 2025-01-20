import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarcontext";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LoopRoundedIcon from "@mui/icons-material/LoopRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import TopicRoundedIcon from "@mui/icons-material/TopicRounded";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HomeIcon from "@mui/icons-material/Home";
import DataSaverOffRoundedIcon from "@mui/icons-material/DataSaverOffRounded";
import CircleIcon from "@mui/icons-material/Circle";

import { TopicContext } from "../../context/topicsContext";

export default function SideBar() {
  const {
    setToggleButtonVisibilty,
    isSidebarVisible,
    setIsSidebarVisible,
    showTopicDropdown,
    setShowTopicDropdown,
    showPersonalDropdown,
    setShowPersonalDropdown,
  } = useContext(SidebarContext);

  const { topic } = useContext(TopicContext);

  function closeSidebar() {
    setIsSidebarVisible(false);
    setToggleButtonVisibilty("inline");
  }

  function toggleTopicDropdown() {
    setShowTopicDropdown((s) => !s);
  }

  function togglePersonalDropdown() {
    setShowPersonalDropdown((s) => !s);
  }

  return (
    <>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden bg-stone-400
                         ${isSidebarVisible ? "w-56" : "w-0"} 
                         ${isSidebarVisible ? "w-56 opacity-100" : "w-0 opacity-0"}
                         shadow-lg shadow-stone-700 rounded-sm z-20 
                         `}
      >
        <div className="flex flex-row-reverse m-2 h-fit" onClick={closeSidebar}>
          <span className="transition-all duration-300 ease-in-out w-fit h-fit cursor-pointer hover:bg-stone-500 rounded-sm">
            <CloseRoundedIcon sx={{ color: "#292524", fontSize: 30 }} />
          </span>
        </div>
        <div
          className="transition-all duration-300 ease-in-out 
                            pl-4 pt-4 flex flex-col "
        >
          <div
            className="m-1 transition-all duration-300 ease-in-out 
                                cursor-pointer flex items-center 
                                hover:bg-stone-500  hover:scale-105 
                                w-40 p-1 rounded-sm"
          >
            <HomeIcon sx={{ color: "#292524", fontSize: 20 }} />
            <span className="text-stone-800 ml-2 font-roboto text-light">
              Home
            </span>
          </div>

          <div
            className="m-1 transition-all duration-300 ease-in-out 
                                cursor-pointer flex items-center 
                                hover:bg-stone-500  hover:scale-105 
                                w-40 p-1 rounded-sm"
          >
            <DataSaverOffRoundedIcon sx={{ color: "#292524", fontSize: 20 }} />
            <span className="text-stone-800 ml-2 font-roboto text-light">
              Dashboard
            </span>
          </div>

          <div
            className="m-1 transition-all duration-300 ease-in-out 
                                cursor-pointer flex items-center 
                                hover:bg-stone-500  hover:scale-105 
                                w-40 p-1 rounded-sm"
          >
            <LoopRoundedIcon sx={{ color: "#292524", fontSize: 20 }} />
            <span className="text-stone-800 ml-2 font-roboto text-light">
              Daily
            </span>
          </div>

          <div
            className="m-1 transition-all duration-300 ease-in-out 
                                cursor-pointer flex items-center 
                                hover:bg-stone-500  hover:scale-105 
                                w-40 p-1 rounded-sm"
          >
            <StarRoundedIcon sx={{ color: "#292524", fontSize: 20 }} />
            <span className="text-stone-800 ml-2 font-roboto text-light">
              Starred
            </span>
          </div>

          <div
            className="m-1 transition-all duration-300 ease-in-out 
                                cursor-pointer flex items-center 
                                hover:bg-stone-500  hover:scale-105 
                                w-40 p-1 rounded-sm"
          >
            <CalendarMonthRoundedIcon sx={{ color: "#292524", fontSize: 20 }} />
            <span className="text-stone-800 ml-2 font-roboto text-light">
              Calendar
            </span>
          </div>

          <div
            className="m-1 transition-all duration-300 ease-in-out 
                                cursor-pointer flex items-center 
                                hover:bg-stone-500  hover:scale-105 
                                w-40 p-1 rounded-sm"
          >
            <NotificationsNoneRoundedIcon
              sx={{ color: "#292524", fontSize: 20 }}
            />
            <span className="text-stone-800 ml-2 font-roboto text-light">
              Reminders
            </span>
          </div>

          <div
            className="m-1 transition-all duration-300 ease-in-out 
                                cursor-pointer flex items-center 
                                hover:bg-stone-500  hover:scale-105 
                                w-40 p-1 rounded-sm justify-between"
          >
            <div className="flex items-center">
              <TopicRoundedIcon sx={{ color: "#292524", fontSize: 20 }} />
              <span className="text-stone-800 ml-2 font-roboto text-light">
                Topics
              </span>
            </div>
            <div
              className="rounded-full hover:bg-stone-600 w-fit h-fit"
              onClick={toggleTopicDropdown}
            >
              <ArrowDropDownIcon sx={{ color: "#292524", fontSize: 25 }} />
            </div>
          </div>

          <div
            className={`transition-[height,opacity,padding] duration-100 ease-in-out 
                                ${showTopicDropdown ? "" : "hidden"}  `}
          >
            {topic === null ? (
              <div>No Topic Found</div>
            ) : (
              topic.map((item) => (
                <div className="ml-4" key={item._id}>
                  <CircleIcon sx={{ color: "#292524", fontSize: 10 }} />
                  <span className="ml-2 cursor-pointer font-roboto">
                    {item.title}
                  </span>
                </div>
              ))
            )}
          </div>

          <div
            className="m-1 transition-all duration-300 ease-in-out 
                                cursor-pointer flex items-center 
                                hover:bg-stone-500  hover:scale-105 
                                w-40 p-1 rounded justify-between"
          >
            <div className="flex items-center">
              <ChecklistRoundedIcon sx={{ color: "#292524", fontSize: 20 }} />
              <span className="text-stone-800 ml-2 text-light font-roboto">
                Personal
              </span>
            </div>
            <div
              className="rounded-full hover:bg-stone-600 w-fit h-fit"
              onClick={togglePersonalDropdown}
            >
              <ArrowDropDownIcon sx={{ color: "#292524", fontSize: 25 }} />
            </div>
          </div>

          <div
            className={`transition-[height,opacity,padding] duration-100 ease-in-out ${showPersonalDropdown ? "h-fit opacity-100 p-2" : "h-0 opacity-0 p-0"}`}
          >
            Hello Hello
          </div>
        </div>
      </div>
    </>
  );
}
