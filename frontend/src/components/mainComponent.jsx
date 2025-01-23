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
export default function MainComponent() {
  const { isloading, setIsLoading } = useContext(LoadingContext);

  const { isUser, setIsUser } = useContext(AuthContext);

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
                <TopicProvider>
                  <TodoProvider>
                    <ListProvider>
                      <UserHome />
                    </ListProvider>
                  </TodoProvider>
                </TopicProvider>
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
