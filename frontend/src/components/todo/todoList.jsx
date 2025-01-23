import TodoItem from "./todoItem";

export default function TodoList( {singleList, todosOfCurrentList,index} ) {

  return (
    <div className={`felx flex-col pb-4 ml-4 mr-4 max-w-full h-fit rounded-sm shadow-xl bg-white-300 break-inside-avoid ${index!==0 ? 'mt-4':''}`} >
      <div className="w-full bg-white-400 pt-4 pb-4 pl-4 text-md  font-roboto font-light text-white-900">{singleList.title}</div>
      {(todosOfCurrentList === null || typeof todosOfCurrentList === 'undefined' || todosOfCurrentList.length === 0 )? (
              <div className="ml-4 mt-4 mb-4 font-roboto font-light text-white-900">The list is Empty</div>
            ) : (
              todosOfCurrentList?.map((item) => (
                <TodoItem key={item._id} singleTodo={item}/>
              ))
            )}
    </div>
  );
}
