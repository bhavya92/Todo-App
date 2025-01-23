import AddIcon from '@mui/icons-material/Add';
import TopicItem from './topicItem';
import { useContext, useRef } from 'react';
import { TopicContext } from '../../context/topicsContext';
import { createTopic } from '../../services/topic';


export default function DetailedTopicView() {

    const { topic, setTopic } = useContext(TopicContext);

    const newTopicRef = useRef(null);
    async function createNewTopic(){
        // do Input validation of newTopicRef
        try {
            const response = await createTopic(newTopicRef.current.value);
            if(response.status === '200') {
                newTopicRef.current.value = '';
                setTopic((topic) => [...topic, response.newTopic]);

            } else {
                console.log("Error Creating New Topic");
            }
        } catch(err) {
            console.log(err);
        }
    }
    return<div className="flex flex-col p-8 h-full w-full ">
        <div className="flex flex-row justify-between w-full h-fit p-2">
            <span className='font-cherrycreamsoda font-light text-2xl text-white-700'>
                Topics
            </span>
        </div>
        <div className='flex-col pt-8 pr-8 pl-8 pb-3
                        overflow-y-auto scrollbar-thin scrollbar-thumb-white-600 
                            scrollbar-track-white-200"'>
            <TopicItem/>
        </div>
        <div className='flex bg-white-200 
                        mr-8 ml-8 p-2 rounded-md
                        transition-all duration-300 ease-in-out cursor-pointer
                        hover:shadow-lg hover:shadow-white-600'
        >
           
            <input ref = {newTopicRef} type='text' placeholder='Add new Topic' className='  h-full flex-1 mr-8 border-r bg-white-200 border-white-300 
                                                                        focus:border-white-400 hover:border-white-400
                                                                        focus:outline-none focus:ring-0 font-roboto font-light 
                                                                        text-white-900 pl-4 placeholder-white-700'
            />
            <span className='w-fit h-fit mr-1' onClick={createNewTopic}>
                <AddIcon sx={{ color:'#1c1917', fontSize:30  }}/>
            </span> 
        </div>
    </div>
}