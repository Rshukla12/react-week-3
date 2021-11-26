import { useEffect, useState } from "react";

const Timer = ({init, end}) => {
    const [counter, setCounter] = useState(init);
    
    useEffect(() => {
        const id = setInterval(() => {
            setCounter((prev) => { 
                if ( prev === end-1 ) clearInterval(id);
                return (prev + 1);
            })
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

export default Timer