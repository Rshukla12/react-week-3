import React from "react";
import style from "./Todo.module.css";

const TodoItem = ({ item, handleRemoveTask, handleTaskToggle }) => {
    return (
        <div className={style.item} style={{background: item.status ? "rgba(32, 185, 32, 0.493)" : "white"}}>
            <input type="checkbox" name="status" checked={item.status} onChange={() => handleTaskToggle(item.id, item.status)}/>
            <div className={style.itemText} style={{textDecoration: item.status ? "line-through" : "none" }}>{item.title}</div>
            <button onClick={()=>handleRemoveTask(item.id)}>Remove</button>
        </div>
    )
}

export default TodoItem;