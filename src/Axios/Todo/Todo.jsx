import React, { useEffect, useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import style from "./Todo.module.css";
import axios from "axios";

const Todo = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const getTasks = () => {
        axios.get("http://localhost:3000/tasks")
            .then(res => {
                console.log(res)
                setTasks(res.data)
            })
            .catch(err => {
                console.log(err)
            })
            .then( setIsLoading(false) );
    }

    const onCreateTask = ({ title }) => {
        const newTask = {
            title: title,
            status: false,
        }
        const config = {
            method: "post",
            data: newTask,
            url: `http://localhost:3000/tasks`
        }
        setIsLoading(true);
        axios(config)
        .then(res => {
            console.log(res)
            getTasks();
        })
        .catch( err => {
            console.log(err);
        })
    }
    
    // const removeTask = (id) => {
    //     const config = {
    //         method: "DELETE",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }
    //     setIsLoading(true);
    //     return fetch(`http://localhost:3000/tasks/${id}`, config)
    //     .then(res => res.json())
    //     .then( () =>  { 
    //     })
    //     .catch( err => {
    //         console.log(err);
    //     })
    // }

    const handleTaskToggle = (id) => {
        const curr = tasks.filter(item => item.id === id )[0];
        console.log(curr);
        curr.status = !curr.status
        const config = {
            method: "patch",
            data: curr,
            url: `http://localhost:3000/tasks/${id}`
        }
        setIsLoading(true);
        return axios(config)
        .then(res => {
            console.log(res)
            getTasks();
        })
        .catch( err => {
            console.log(err);
        })
    }

    
    useEffect(() => {
        getTasks();
            
    }, []);

    const updateAll = async () => {
        const ids = tasks.map( el => el.id );
        const updates = ids.forEach(id => handleTaskToggle(id) );
        Promise.allSettled(updates)
    }

    return (
        <div className={style.todo}>
            <h1>TODO</h1>
            {isLoading ? (
                <div className={style.spinner}></div>
            ) :  ( 
                <div>
                    <TodoInput handleCreateTask={onCreateTask} />
                    <TodoList data={tasks} handleTaskToggle={handleTaskToggle}/>
                </div>
            )}
            <button onClick={updateAll}>Update All</button>
        </div>
    )
}

export default Todo;