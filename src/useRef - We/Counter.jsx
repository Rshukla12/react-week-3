import { useEffect, useRef, useState } from "react";

const Counter = () => {
    const [counter, setCounter] = useState(0);
    const [display, setDisplay] = useState(false);
    const timerRef = useRef(null);
    useEffect(() => {
        return pauseTimer;
    }, []);

    const startTimer = () => {
        if (!timerRef.current)
            timerRef.current = setInterval(() => {
                setCounter((prev) => prev + 1);
            }, 1000);
    };

    const pauseTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = null;
    }

    const resetTimer = () => {
        pauseTimer();
        setCounter(0);
    }

    return (
        <div className="App">
            {display ? <div>
                <h1>Counter</h1>
                <h3>{counter}</h3>
                <button onClick={startTimer}>Start</button>
                <button onClick={pauseTimer}>Pause</button>
                <button onClick={resetTimer}>Reset</button>
            </div> : <></>
            }
            <button onClick={() => setDisplay(!display)}>display</button>
        </div>
    );
}

export default Counter;