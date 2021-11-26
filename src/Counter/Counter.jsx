import { useEffect, useState } from "react";

const Counter = () => {
    const [counter, setCounter] = useState(0);
    
    useEffect(() => {
        const id = setInterval(() => {
            setCounter((prev) => prev + 1);
        }, 1000);

        return () => {
            clearInterval(id);
        };
    }, []);

    
    return (
        <div>
            <h1>Counter</h1>
            <h3>{counter}</h3>
        </div> 
    );
}

export default Counter;