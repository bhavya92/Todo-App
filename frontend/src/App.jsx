import {  useEffect, useState } from 'react'
import './App.css'
import UserHome from './components/home/homePage'
import LandingPage from './components/landing/landing'
import { AuthContext } from './context/authcontext'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PageNotFound from './components/authentication/pageNotFound'
import CircularProgress from '@mui/material/CircularProgress';



function App() {
  const [ isUser , setIsUser ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  console.log("isAuth is " + isUser);
  
  useEffect(()=>{
    // TODO : set user object in local storage 
    //isUser true or false 
    // true -> home page
    // false -> landing

    /*
      isUser -> True -> /home  
    */
      
    const checkAuthenticated = async () => {
      console.log("In useEffect");
      const url = "http://localhost:3000/user/validate-token";
      try {
        const response = await fetch(url, {
          method:'GET',
          credentials : 'include',
        });
        if(response.ok) {
          console.log("data is valid");
          setIsUser(true);
          setLoading(false);

          //fetch all topic names
          // fetch lists of Perosnal topic 

        } else {
          console.log("data is Invalid");
          setIsUser(false);
          setLoading(false);
        }
      } catch(error) {
          console.error('Error during token validation:', error);
          setIsUser(false);
      }
    };
    checkAuthenticated();
  },[]);
  if(loading) {
    return <>
      <div className='flex justify-center items-center'>
          <CircularProgress sx={{ color: '#292524'}} size={50}/>
      </div>
    </>
  }
  return (
    <>
    <BrowserRouter>
    <AuthContext.Provider value={{
      isUser : isUser,
      setIsUser : setIsUser
    }}>
      <Routes>
          <Route path="/" element={isUser ? <Navigate to="/home"/> : <Navigate to="/landing"/>}/>
          <Route path="/landing" element={isUser ? <Navigate to = "/home"/> : <LandingPage/>} />
          <Route path="/home"  element={isUser ? <UserHome/> : <Navigate to="/landing"/>} />
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    </AuthContext.Provider>
      
    </BrowserRouter>
    </>
  )
}

export default App
