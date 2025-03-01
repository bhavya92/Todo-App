import { useContext, useState } from "react";
import { login } from "../../services/auth";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/formInput";
import { AuthContext } from "../../context/authcontext";

import PropTypes from "prop-types";

export default function LoginPage({ closeLogin }) {
  const { setIsUser,setUser } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  
  const er = {};

  const validateForm = (formValues) => {
    console.log("Email is " + formValues[0].value);
    if (!formValues[0].value.trim()) {
      er.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues[0].value)) {
      er.email = "Email is invalid";
    }

    if (!formValues[1].value) {
      er.password = "Password is required";
    } else if (formValues[1].value.length < 8) {
      er.password = "At least 8 characters";
    }
    return er;
  };
  // TODO : Add try catch logic
  async function loginHandler(event) {
    event.preventDefault();
    const newErrors = validateForm(event.target);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const response = await login(event.target);
      if (response.error === "Unauthorized") {
        const newError = {
          loginError: "Email or Password is Incorrect",
        };
        setErrors(newError);
      }
      //Navigate to home with token
      if (response.message === "Login Success") {
        //local storage isUSer true
        console.log(`firstName in local storage ${localStorage.getItem("firstName")}`);
        const userObject = {
          email : localStorage.getItem("email"),
          firstName : localStorage.getItem("firstName"),
          lastName  : localStorage.getItem("lastName"),
        }
        setUser({...userObject});
        setIsUser(true);
      }
    } else {
      console.log("Login failed due to validation errors.");
    }
  }
  return (
    <div
      className="relative bg-white-300 w-fit h-fit px-6 py-3 
                    rounded z-50 m-8 shadow-xl shadow-white-700"
    >
      <div
        className="absolute top-1 right-1 w-fit h-fit cursor-pointer"
        onClick={closeLogin}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </div>
      <form className="flex flex-col mt-4" onSubmit={loginHandler}>
        <div className="mt-4">
          {errors.email && (
            <span className="text-roboto text-red text-xs">{errors.email}</span>
          )}
        </div>
        <Input type="email" placeholder="Email" className="w-72" />

        <div className="mt-4">
          {errors.password && (
            <span className="text-roboto text-red text-xs">
              {errors.password}
            </span>
          )}
        </div>
        <Input type="password" placeholder="Password" className="w-72" />
        <Button className="w-72 mt-8" type="submit">
          Login
        </Button>
        <div className="flex justify-center items-center">
          <div className="mt-4">
            {errors.loginError && (
              <span className="text-roboto text-red text-s">
                {errors.loginError}
              </span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

LoginPage.propTypes = { closeLogin: PropTypes.func.isRequired };
