import { useRef } from "react"

const InputRef = () => {
    const focusRef = useRef(null);

    const focusInput = () => {
        focusRef.current.focus();
    }

    return (
        <div>
            <input type="text" ref={focusRef} placeholder="Input 1" />
            <br />
            <input type="text" placeholder="Input 2" />
            <br />
            <input type="text" placeholder="Input 3" />
            <br />
            <button onClick={focusInput}>Focus on Input 1</button>
        </div>
    )
}

export default InputRef;