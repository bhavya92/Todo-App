import LoopRoundedIcon from '@mui/icons-material/LoopRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

export default function TodoItem(){
    return<div className="flex items-center">
        <div className=' m-2'>
            <input type='checkbox' className="w-4 h-4 rounded bg-stone-400 accent-stone-500 border-stone-600"/>
        </div>
        <div className='grow m-2 text-xs text-ellipsis overflow-hidden whitespace-nowrap'>
           <span >Todo Items goes here </span>
        </div>
        <div className='transition-all duration-200 ease-in-out flex-none m-2 w-fit h-fit  cursor-pointer hover:scale-110 '>
            <StarRoundedIcon/>
        </div>
        <div className='transition-all duration-200 ease-in-out flex-none m-2 w-fit h-fit  cursor-pointer hover:scale-110 '>
            <LoopRoundedIcon/>
        </div>
       
    </div>
}