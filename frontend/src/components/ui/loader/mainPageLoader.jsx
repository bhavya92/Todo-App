export default function TickLoader() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white-50">
      <div className="w-fit h-fit border shadow-lg shadow-white-400 flex p-4 bg-white-100">
        <div className="w-fit h-full  border-r flex flex-col mt-1 mr-1 p-2">
          <div className="w-4 h-4 border rounded mt-2 animate-toggleBg " />
          <div className="w-4 h-4 border rounded mt-2 animate-toggleBg " />
          <div className="w-4 h-4 border rounded mt-2 animate-toggleBg " />
          <div className="w-4 h-4 border rounded mt-2 animate-toggleBg " />
          <div className="w-4 h-4 border rounded mt-2 animate-toggleBg " />
        </div>
        <div className="flex flex-col w-full h-full p-2">
          <div className="h-4 w-full mt-2">Task one</div>
          <div className="h-4 w-full mt-2">Task Two</div>
          <div className="h-4 w-full mt-2">Task Three</div>
          <div className="h-4 w-full mt-2">Task Four</div>
          <div className="h-4 w-full mt-2">Task Five</div>
        </div>
      </div>
    </div>
  );
}
