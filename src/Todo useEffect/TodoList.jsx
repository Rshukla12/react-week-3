import TodoItem from "./TodoItem";
import style from "./Todo.module.css";

const TodoList = ({data, handleRemoveTask, handleTaskToggle}) => {
    return (
        <div className={style.list}> 
            { data.map(item => (
                <TodoItem key={item.id} item={item} handleRemoveTask={handleRemoveTask} handleTaskToggle={handleTaskToggle} />
            ))}
        </div>
    )
}

export default TodoList;