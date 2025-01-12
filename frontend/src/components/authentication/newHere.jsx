export default function SignupPage({closeSignup}) {

    return (
        <div   className="relative bg-mercury-300 w-fit h-fit px-6 py-3 rounded z-50 m-8">
            <div className="absolute top-1 right-1 w-fit h-fit cursor-pointer" onClick={closeSignup}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </div>
            <form className="flex items-center flex-col mt-4">
                <div className="flex flex-row  w-72">
                    <input type="text" placeholder="Fisrt Name" className="basis-1/2 h-6 w-32 mr-1 text-sm rounded py-4 px-2 mt-2 focus:border focus:border-mercury-900 focus:outline-none focus:ring-0"/>
                    <input type="text" placeholder="Last Name" className="basis-1/2 h-6 w-32 mt-2 ml-1 text-sm rounded py-4 px-2 focus:border focus:border-mercury-900 focus:outline-none focus:ring-0"/>    
                </div>
                <input type="email" placeholder="Email" className="h-6 w-72 text-sm rounded py-4 px-2 mt-4 focus:border focus:border-mercury-900 focus:outline-none focus:ring-0"/>
                <input type="password" placeholder="Password" className="h-6 w-72 mt-4 text-sm rounded py-4 px-2 focus:border focus:border-mercury-900 focus:outline-none focus:ring-0"/>
                <input type="password" placeholder="Confirm Password" className="h-6 w-72 mt-4 text-sm rounded py-4 px-2 focus:border focus:border-mercury-900 focus:outline-none focus:ring-0"/>
                <button className="text-mercury-50 bg-mercury-800 w-72 p-2 mt-8 rounded hover:outline hover:outline-2 hover:outline-mercury-900">Sign Up</button>
            </form>
        </div>
    )

}