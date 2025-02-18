import { useState, useRef, useContext, useEffect } from "react"
import { Button } from "../ui/button/button";
import { send_otp } from "../../services/auth";
import { AuthContext } from "../../context/authcontext";
import { AlertContext } from "../../context/alertcontext";

export default function OtpComponent() {

    const [otp, setOtp] = useState(Array(6).fill(''));
    const inputs = useRef([]);
    const {emailEntered, setOtpVerified, setEmailSent, setEmailEntered} = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    //const [ resendOtp, setResendOtp ] = useState(false);
    const { setIsAlert, setAlertMessage, setSeverity } = useContext(AlertContext);
    // let resendOtpCount = 0;
    // const [timeLeft, setTimeLeft] = useState(120);
    // const [startTimer, setStartTimer] = useState(true);
    
    // useEffect(() => {
    //     //TODO : start a timer of 5 mins, after 5 mins setRsendOtp(true)
    //     if(timeLeft <= 0 || !startTimer)
    //         return;
    //     const timer = setInterval(() => {
    //         setTimeLeft( (prev) => prev-1 )
    //     }, 1000);
    //     return () => clearInterval(timer);
    // },[])

    // useEffect(() => {
    //     //TODO : start a timer of 5 mins, after 5 mins setRsendOtp(true)
    //     if(startTimer === false)
    //             return;
    //     if(timeLeft <= 0 || !startTimer)
    //         return;
    //     const timer = setInterval(() => {
    //         setTimeLeft( (prev) => prev-1 )
    //     }, 1000);
    //     return () => clearInterval(timer);
    // },[startTimer])

    // function handleTimer(){
    //     setStartTimer(true);
    //     setTimeLeft(120);
    // }

    // const minutes = Math.floor(timeLeft / 60);
    // const seconds = timeLeft % 60;
    // async function handleOtpResend(){
    //     resendOtpCount = resendOtpCount + 1;
    //     if(resendOtpCount < 5) {
    //         //TODO  :Set resendOtp to fasle and start a timer again
    //     } else {
    //         //TODO : show alert too many attemps, please try again and take back to email entering
    //         //TODO :  aslo do a backend call to blacklist email for 5 mins , create a middleware
    //     }
    // }

    async function handleOtp(){
        const otp_str = otp.join("");
        const response = await send_otp(emailEntered, otp_str);
        console.log(`response is ${response}`);
        console.log(`email entered is ${emailEntered}`);
        if(response === '1') {
            setOtpVerified(true);
        } else if(response === '2') {
            const er = {
                otp:'Wrong OTP Entered',
            }
            setErrors(er);
        }  else {
            setSeverity("error");
            setAlertMessage("Somethinng went wrong.");
            setIsAlert(true);
            setEmailEntered(null);
            setEmailSent(false);
            setOtpVerified(false);    
        }
    }

    function handleChange(e, index) {
        console.log("handleChange");
        console.log(otp);
        const { value } = e.target;
        console.log(`value : ${value}`);
        if(value.match(/^\d$/)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if(index < 5) {
                console.log("Inside that if");
                inputs.current[index + 1]?.focus();
            }
        }

        if (value === '' && index > 0) {
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);
        }

    }

    function handleKeyDown(e, index) {
        console.log("han dlekeyDown");
        if (e.key === 'Backspace') {
            if (otp[index] !== '') {
                const newOtp = [...otp];
                newOtp[index] = '';
                setOtp(newOtp);
            } else if (index > 0) {
                inputs.current[index - 1]?.focus();
            }
        }
    }
    return <div className="h-full w-full p-4">
        <div>
            {errors.otp && (
                <span className="text-red text-xs">{errors.otp}</span>
            )}
        </div>
        <span className="text-sm text-white-600 font-roboto">Enter OTP below</span>
        <div className="mt-4">
            {otp.map( (_, index) => (
                <input
                    key = {index}
                    type= "text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref = { (el)=> (inputs.current[index] = el) }
                    className="w-9 h-10 mx-2 border text-center rounded-lg
                                border-white-600 outline-2 overflow-hidden
                                focus:border-white-400"
                />
            ))}
        </div>
        <Button className='w-full mt-4' onClick={handleOtp}>Verify Otp</Button>
        {/* <div>
            <span>{`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}</span>
            <span onClick={handleOtpResend}>Resend OTP</span>
        </div> */}
    </div>
}