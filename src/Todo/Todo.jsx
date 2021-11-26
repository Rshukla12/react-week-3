import React, { useEffect, useState } from "react";
import parseLinkHeader from "parse-link-header";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import style from "./Todo.module.css";
import Pagination from "./Pagination";

const Todo = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isUpdated, setIsUpdated] = useState(0);
    const [url, setUrl] = useState(`http://localhost:3000/tasks?_page=1&_limit=5`);
    const [linkHeaders, setLinkHeaders] = useState({});

    const getTasks = (url) => {
        return fetch(url)
            .then(res => {
                setLinkHeaders(parseLinkHeader( res.headers.get( "Link" ) ) );
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
            if ( tasks.length === 1 )
            setUrl(linkHeaders["first"].url)
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
        getTasks(url)
            .then(res => {
                setTasks(res)
            })
            .catch(err => {
                setIsError(true);
            })
            .finally( setIsLoading(false) );
    }, [isUpdated, url]);

    const handlePage = (url) => {
        setUrl(linkHeaders[url].url);
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
                    <Pagination pageHandler={handlePage} linkHeaders={linkHeaders} />
                </div>
            )}
        </div>
    )
}

export default Todo;