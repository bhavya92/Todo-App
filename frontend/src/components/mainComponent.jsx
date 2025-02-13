import { useContext, useEffect, useState } from "react";
import UserHome from "./home/homePage";
import LandingPage from "./landing/landing";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageNotFound from "./authentication/pageNotFound";
import { TodoProvider } from "../context/todoContext";
import { ListProvider } from "../context/listsContext";
import { AuthContext } from "../context/authcontext";
import { TopicProvider } from "../context/topicsContext";
import TickLoader from "./ui/loader/mainPageLoader";
import { LoadingContext } from "../context/loadingContext";
import { SettingbarProvider } from "../context/settingbarcontext";
import { AlertProvider } from "../context/alertcontext";
export default function MainComponent() {
  
  const { isloading, setIsLoading } = useContext(LoadingContext);

  const { isUser, setIsUser, setUser } = useContext(AuthContext);


  console.log("isAuth is " + isUser);
  
  useEffect(() => {
    const checkAuthenticated = async () => {
      console.log("In useEffect");
      const url = "http://localhost:3000/user/validate-token";
      try {
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          console.log("data is valid");
          setIsUser(true);
        } else {
          console.log("data is Invalid");
          setIsUser(false);
          setIsLoading(false);
        }
        if(localStorage.length === 3) {
          let userObject = {
            email : localStorage.getItem("email"),
            firstName : localStorage.getItem("firstName"),
            lastName : localStorage.getItem("lastName"),
          }
          console.log(`${userObject.lastname}`);
          setUser(userObject);
        }
      } catch (error) {
        console.error("Error during token validation:", error);
        setIsUser(false);
      }
    };
    checkAuthenticated();
  }, []);

  if (isloading) {
    return (
      <>
        <TickLoader />
      </>
    );
  }
  // TODO : set user object in local storage
  //isUser true or false
  // true -> home page
  // false -> landing

  /*
      isUser -> True -> /home  
    */

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isUser ? <Navigate to="/home" /> : <Navigate to="/landing" />
            }
          />
          <Route
            path="/landing"
            element={isUser ? <Navigate to="/home" /> : <LandingPage />}
          />
          <Route
            path="/home"
            element={
              isUser ? (
                <SettingbarProvider>
                  <TopicProvider>
                    <TodoProvider>
                      <ListProvider>
                        <AlertProvider>
                          <UserHome/>
                        </AlertProvider>
                      </ListProvider>
                    </TodoProvider>
                  </TopicProvider>
                </SettingbarProvider>
              ) : (
                <Navigate to="/landing" />
              )
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
