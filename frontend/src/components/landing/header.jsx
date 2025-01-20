export default function Header({onLoginClick, onSignupClick}) {
    console.log("header rendered");

    return <div  className="flex flex-col lm:flex-row justify-between items-center ">
        <span className="text-stone-800 font-medium text-base ms:text-xl md:text-2xl w-fit h-fit ml-1">Tick Maar</span>
        <div className="p-8 flex flex-col lm:flex-row">
            <button className="text-stone-100 bg-stone-800 hover:bg-stone-600 font-medium font-roboto rounded-sm text-base px-5 py-2.5 me-2 mb-2" onClick={onLoginClick}>Login</button>
            <button className="text-stone-100 bg-stone-800 hover:bg-stone-600 font-medium font-roboto rounded-sm text-base px-5 py-2.5 me-2 mb-2"onClick={onSignupClick}>New Here</button>
        </div>
    </div>
}