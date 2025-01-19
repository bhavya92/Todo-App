import {  useContext, useEffect, useState } from 'react'
import UserHome from './home/homePage'
import LandingPage from './landing/landing'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PageNotFound from './authentication/pageNotFound'
import CircularProgress from '@mui/material/CircularProgress';
import { fetchTopics } from '../services/topic'
import { TopicContext } from '../context/topicsContext'
import { AuthContext } from '../context/authcontext'
import { TodoProvider } from '../context/todoContext'
import { ListProvider } from '../context/listsContext'

export default function MainComponent() {
  const [ isUser , setIsUser ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const { setTopic } = useContext(TopicContext);

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
          const topicData = await fetchTopics();
          if(topicData.status === '200') {
            //set topics to context variable
            console.log(topicData.topics);
            setTopic(topicData.topics);
          } 

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
          <Route path="/home"  element={
                                        isUser ? 
                                          <TodoProvider>
                                          <ListProvider>
                                            <UserHome/>
                                          </ListProvider>
                                          </TodoProvider> : <Navigate to="/landing"/>} />
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    </AuthContext.Provider>
      
    </BrowserRouter>
    </>
  )
}
