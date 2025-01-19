import TodoItem from "./todoItem";

export default function TodoList(){
    return<div className="max-w-full h-auto rounded-lg shadow-xl bg-stone-300">
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
    </div>
}