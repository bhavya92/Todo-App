import { useContext, useRef, useState } from "react";
import { Input } from "../ui/input/formInput";
import { Button } from "../ui/button/button";
import { send_email } from "../../services/auth";
import { AuthContext } from "../../context/authcontext";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

export default function EmailComponent() {
    const emailRef = useRef(null);
    const [errors, setErrors] = useState({});
    const { setEmailSent, setEmailEntered } = useContext(AuthContext);
    const [showProgress, setShowProgress] = useState(false);

    async function emailHandler() {
        setShowProgress(true);
        console.log("Inside email handler");
        const er = {};
        console.log(emailRef.current.value);
        if (!emailRef.current.value.trim()) {
            er.email = "Email is required";
            setErrors(er);
        } else if (!/\S+@\S+\.\S+/.test(emailRef.current.value)) {
            er.email = "Email is invalid";
            setErrors(er);
        } else {
            const result = await send_email(emailRef.current.value);
            console.log(result);
            if(result === '1') {
                console.log("Baby I am sorry, i am notsorry");
                setEmailSent(true);
                setEmailEntered(emailRef.current.value);
                setShowProgress(false);
            } else if(result === '2') {
                const er = { email : 'Email Already Exists'};
                setErrors(er);
                setShowProgress(false);
            } else {
                const er = {email: 'Something Went Wrong'};
                setErrors(er);
                setShowProgress(false);
            }
        }
        
    }

    return <div className="h-full w-full p-4 flex flex-col">
        <div>
            {errors.email && (
                <span className="text-red text-xs">{errors.email}</span>
            )}
        </div>
        <Input type="email" placeholder="Email" className="w-72 lm:w-96" ref={emailRef} />
        <Button className="w-72 lm:w-96 mt-4" onClick={emailHandler}>
            Get OTP
        </Button>
        {showProgress ? <Box sx={{ width: '100%' }}>
            <LinearProgress  color='#464646'/>
        </Box>
        : <></>}
    </div>
}