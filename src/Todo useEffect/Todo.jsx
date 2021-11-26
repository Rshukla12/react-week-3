import React, { useEffect, useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import style from "./Todo.module.css";
import Pagination from "./Pagination";

const Todo = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isUpdated, setIsUpdated] = useState(0);
    const [page, setPage] = useState(1);
    
    const getTasks = ({page}) => {
        return fetch(`http://localhost:3000/tasks?_page=${page}&_limit=5`)
            .then(res => {
                return res.json();
            })
    }

    const onCreateTask = ({ title }) => {
        const newTask = {
            title: title,
            status: false,
        }
        const config = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( newTask )
        }
        setIsLoading(true);
        return fetch(`http://localhost:3000/tasks`, config)
        .then(res => res.json())
        .then( res => setIsUpdated(isUpdated+1) )
        .catch( err => {
            console.log(err);
            setIsError(true);
        })
        .finally(setIsLoading(false) );
    }
    
    const removeTask = (id) => {
        const config = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        setIsLoading(true);
        return fetch(`http://localhost:3000/tasks/${id}`, config)
        .then(res => res.json())
        .then( () =>  { 
            setIsUpdated(isUpdated+1)
        })
        .catch( err => {
            console.log(err);
            setIsError(true);
        })
    }

    const handleTaskToggle = (id) => {
        const curr = tasks.filter(item => item.id === id )[0];
        console.log(curr);
        curr.status = !curr.status
        const config = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(curr)
        }
        setIsLoading(true);
        return fetch(`http://localhost:3000/tasks/${id}`, config)
        .then( res => setIsUpdated(isUpdated+1) )
        .catch( err => {
            console.log(err);
            setIsError(true);
        });
    }
    
    useEffect(() => {
        getTasks({page})
            .then(res => {
                setTasks(res)
            })
            .catch(err => {
                setIsError(true);
            })
            .finally( setIsLoading(false) );
    }, [isUpdated, page]);

    const handlePage = (val) => {
        setPage(val)
    }

    return (
        <div className={style.todo}>
            <h1>TODO</h1>
            {isLoading ? (
                <div className={style.spinner}></div>
            ) : isError ? ( 
                <div>Error</div>
            ) : ( 
                <div>
                    <TodoInput handleCreateTask={onCreateTask} />
                    <TodoList data={tasks} handleRemoveTask={removeTask} handleTaskToggle={handleTaskToggle} />
                    <Pagination pageHandler={handlePage} maxPage={3} currentPage={page} />
                </div>
            )}
        </div>
    )
}

export default Todo;