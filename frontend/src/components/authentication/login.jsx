import { login } from "../../services/auth";
import { Button } from "../ui/button/button";

export default function LoginPage({closeLogin}) {
    async function loginHandler(){
       
        await login();
        console.log("login await end");
    }
    return (
        <div  className="relative bg-stone-300 w-fit h-fit px-6 py-3 rounded z-50 m-8">
            <div className="absolute top-1 right-1 w-fit h-fit cursor-pointer" onClick={closeLogin}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </div>
            <form className="flex items-center flex-col mt-4">
                <input type="email" placeholder="Email" className="h-6 w-72 text-sm rounded py-4 px-2 mt-2 focus:border focus:border-stone-900 focus:outline-none focus:ring-0"/>
                <input type="password" placeholder="Password" className="h-6 w-72 mt-4 text-sm rounded py-4 px-2 focus:border focus:border-stone-900 focus:outline-none focus:ring-0"/>
                <Button className = "w-72 mt-8" onSubmit={loginHandler}>Login</Button>
            </form>
        </div>
    )

}