import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useContext, useRef, useState } from 'react';
import { SidebarContext } from '../../context/sidebarcontext';
import TodoList from '../todo/todoList';


export default function HomeMain() {
    
    const {setIsSidebarVisible, toggleButtonVisibility, setToggleButtonVisibilty } = useContext(SidebarContext);

    const [topics, setTopics ] = useState({});
    const topicName = useRef(null);
    const newTopicName = useRef([]);

    function toggleSidebar(){
        setIsSidebarVisible(true);
        setToggleButtonVisibilty(false)
    }

    async function updateTopic(id, index) {
        console.log(id);
        console.log(index);
        console.log();
        
        try{
            const url = `http://localhost:3000/topic/update/${id}`
            const response = await fetch(url, {
                method:'PUT',
                headers:{
                    'Content-Type' : 'application/json; charset=UTF-8'
                },
                credentials:'include',
                body: JSON.stringify({
                    title:newTopicName.current[index].value
                })
            });
            const response_body = await response.json();
            console.log(response_body);
            if(response.ok) {
                console.log(typeof topics[0].title);

                setTopics( (prevTopics) => ({
                 ...prevTopics,
                 [index]:{
                    ...prevTopics[index],
                    title:newTopicName.current[index].value
                 }   
                }))
                console.log(topics);
            }
        } catch(err) {
            console.error(err);
        }

    }

    async function deleteTopic(id) {
        console.log("To delete : " + id);
    
        try{
            const url = `http://localhost:3000/topic/delete/${id}`
            const response = await fetch(url,{
                method:'DELETE',
                headers:{
                    'Content-Type' : 'application/json; charset=UTF-8'
                },
                credentials:'include'
            });
            const response_body = await response.json();
            setTopics((prevTopics) => prevTopics.filter((topic) => topic._id !== id));
            console.log(response_body);
        } catch(err) {
            console.error(err);
        }


    }

    async function createTopic(){
        try{
            const url = "http://localhost:3000/topic/new"
            const response  = await fetch(url,{
                method:'POST',
                headers : {
                    'Content-Type' : 'application/json; charset=UTF-8'
                },
                credentials : 'include',
                body : JSON.stringify({
                    title : topicName.current.value
                })
            });
            const response_body = await response.json();
            console.log(response_body);
        } catch(err) {
            console.log(err);
        }
    }

    async function fetchTopics(){
        try{
            const url = "http://localhost:3000/topic/";
            const response = await fetch(url,{
                method:'GET',
                headers:{
                    'Content-Type' : 'application/json; charset=UTF-8'
                },
                credentials:'include'
            })
            const response_body = await response.json();
            console.log(response_body.topics);
            setTopics(response_body.topics);
        } catch(err) {
            console.log(err);
        }
    }

    return <>
        <div className="w-full h-full bg-stone-200 flex flex-col">
            <div  className={`${toggleButtonVisibility ? 'opacity-100 visible' : 'opacity-0 invisible'} 
                                        transition-opcaity duration-500 ease-in-out w-fit h-fit m-4 cursor-pointer  
                                        hover:bg-stone-500 rounded`} 
                                        onClick={toggleSidebar} >
                <MenuRoundedIcon sx={{ color: '#292524', fontSize: 30 }} />
            </div>
            {/* <div className='m-4 grid grid-cols-1 lm:grid-cols-2  md:grid-cols-3 gap-4 overflow-y-auto
                             scrollbar-thin scrollbar-thumb-stone-600 
                            scrollbar-track-stone-200'>
                <TodoList/>
                <TodoList/>
                <TodoList/>
                <TodoList/>
                <TodoList/>
                <TodoList/>
                <TodoList/>
                <TodoList/>
                <TodoList/>
                <TodoList/>
                <TodoList/>
            </div> */}
            <input ref={topicName} type='text' placeholder='topic Name'/>
            <button onClick={createTopic}>Create topic</button>
            <button onClick={fetchTopics}>Fetch Topics</button>
            {Object.values(topics).map((val, index) => (
                
                    <div className='m-1' key={index}>
                    <span>{val.title}</span>     
                    <button className="ml-2" onClick={() => deleteTopic(val._id)}>Delete</button>
                    <input  ref={newTN => newTopicName.current[index] = newTN} type="text" placeholder='New Topic Name'/>
                    <button className='ml-2' onClick={() => updateTopic(val._id, index)}>Update</button>
                    </div>
                )
            )}
        
        </div>
    </>
}