export default function Header({onLoginClick, onSignupClick}) {
    console.log("header rendered");

    return <div  className="flex justify-between">
        <img className= "top-0 left-0 "src="" alt="Logo"></img>
        <div className="p-8">
            <button className="text-stone-100 bg-stone-800 hover:bg-stone-600 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2" onClick={onLoginClick}>Login</button>
            <button className="text-stone-100 bg-stone-800 hover:bg-stone-600 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2"onClick={onSignupClick}>New Here</button>
        </div>
    </div>
}