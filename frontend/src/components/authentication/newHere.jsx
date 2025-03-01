import { Button } from "../ui/button/button";
import { signup } from "../../services/auth";
import { Input } from "../ui/input/formInput";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authcontext";
import { createTopic } from "../../services/topic";
import EmailComponent from "./emailcomponent";
import OtpComponent from "./otpComponent";
import { AlertContext } from "../../context/alertcontext";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
export default function SignupPage({ closeSignup }) {
  const [errors, setErrors] = useState({});
  const { setIsUser, setUser, emailSent, otpVerified, emailEntered } = useContext(AuthContext);
  const { severity, alertMessage, isAlert } = useContext(AlertContext);
  // useEffect(() => {

  // },[emailSent])

  function redirectToHome() {
    setIsUser(true);
  }

  const validateForm = (formValues) => {
    const er = {};
    if (!formValues[0].value.trim()) {
      er.name = "First and Last Name are required";
    } else if (formValues[0].value.length < 2) {
      er.name = "At least 2 characters";
    } else if (formValues[0].value.length > 20) {
      er.name = "Less than 20 characters";
    }

    if (!formValues[1].value.trim()) {
      er.name = "First and Last Name are required";
    } else if (formValues[1].value.length < 2) {
      er.name = "At least 2 characters";
    } else if (formValues[1].value.length > 20) {
      er.name = "Less than 20 characters";
    }

    if (!formValues[2].value) {
      er.password = "Password is required";
    } else if (formValues[3].value.length < 8) {
      er.password = "At least 8 characters";
    }

    if (formValues[2].value !== formValues[3].value) {
      er.confirmPassword = "Passwords do not match";
    }

    return er;
  };
  // TODO :  Add try catch logic
  async function signupHandler(event) {
    event.preventDefault();
    const newErrors = validateForm(event.target);
    setErrors(newErrors);
    console.log("In signupHandler");
    if (Object.keys(newErrors).length === 0) {
      const firstName = event.target[0].value;
      const lastName = event.target[1].value;
      const password = event.target[2].value;
      const response = await signup(emailEntered, password, firstName, lastName);

      if (response.status === "409") {
        const newErrors = { signupError: "User Already Exists" };
        setErrors(newErrors);
      }
      if (response.status === "200") {
        const userObject = {
          email: localStorage.getItem("email"),
          firstName: localStorage.getItem("firstName"),
          lastName: localStorage.getItem("lastName"),
        }
        setUser(userObject);
        const newTopicJson = await createTopic();
        if (newTopicJson.status === "200") {
          redirectToHome();
        }

        if (newTopicJson.status === "409") {
          console.log("json " + newTopicJson);
        }

        if (newTopicJson.status === "500") {
          console.log("json " + newTopicJson);
        }
      }
    } else {
      console.log("Signup failed due to validation errors.");
    }
  }
  return (
    <div className="relative bg-white-300 w-fit h-fit px-6 py-3 rounded z-50 shadow-xl shadow-white-700">
      <div
        className="absolute top-2 right-2 w-fit h-fit cursor-pointer"
        onClick={closeSignup}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </div>
      {emailSent ? (otpVerified ?
        <form className="flex flex-col mt-6" onSubmit={signupHandler}>
          <div>
            {errors.name && (
              <span className="text-red text-xs">{errors.name}</span>
            )}
          </div>
          <div className="flex flex-row w-72 lm:w-96">
            <Input
              className="w-32 lm:w-48 basis-1/2 mt-1"
              type="text"
              placeholder="Fisrt Name"
            />
            <Input
              type="text"
              placeholder="Last Name"
              className="w-32 lm:w-48 basis-1/2 mt-1"
            />
          </div>

          <div className="mt-4">
            {errors.password && (
              <span className="text-red text-xs">{errors.password}</span>
            )}
          </div>
          <Input
            type="password"
            placeholder="Password"
            className="w-72 lm:w-96"
          />

          <div className="mt-4">
            {errors.confirmPassword && (
              <span className="text-red text-xs">{errors.confirmPassword}</span>
            )}
          </div>
          <Input
            type="password"
            placeholder="Confirm Password"
            className="w-72 lm:w-96"
          />

          <Button className="w-72 lm:w-96 mt-4" type="submit">
            Sign Up
          </Button>
        </form>
        : <OtpComponent />
      )

        : <EmailComponent />}

      <div className="flex justify-center items-center">
        <div className="mt-4">
          {errors.signupError && (
            <span className="text-red text-s">{errors.signupError}</span>
          )}
        </div>
      </div>
      {isAlert ? 
            <div className="absolute bottom-2 z-10">
            <Stack sx={{ width:'300px'}} spacing={2}>
              <Alert severity={`${severity}`}>
                <AlertTitle>{severity}</AlertTitle>
                {alertMessage}
              </Alert>
            </Stack>
          </div> : <></>
          }
    </div>
  );
}
