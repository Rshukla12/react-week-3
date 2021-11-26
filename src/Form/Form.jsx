import { useEffect, useRef, useState } from "react";

const Form = () => {
    const imageRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [formState, setFormState] = useState({
        name: "",
        gender: "",
        married: false,
        role: "",
        image: ""
    });

    const handleChange = (e) => {
        let { name, value, checked, type } = e.target;
        value = type === "checkbox" ? checked : value;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleFormUpdate = (e) => {
        e.preventDefault();
        console.log(formState);
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        setFormState({
            ...formState,
            image: file
        });
    };

    useEffect(() => {
        if (formState.image) {
            const src = URL.createObjectURL(formState.image);
            setImageSrc(src);
        }
    }, [formState]);

    return (
        <div>
            <h1>Form</h1>
            <form onSubmit={handleFormUpdate}>
                <div>
                    <label htmlFor="name"> Name </label>
                    <input name="name" onChange={handleChange} value={formState.name} />
                </div>
                <div>
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" onChange={handleChange}>
                        <option value="M">M</option>
                        <option value="F">F</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="role">Role</label>
                    <select name="role" onChange={handleChange}>
                        <option value="Student">Student</option>
                        <option value="Instructor">Instructor</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="Married">Are You Married</label>
                    <input
                        type="checkbox"
                        name="married"
                        checked={formState.married}
                        onChange={handleChange}
                    />
                </div>
                <input type="file" ref={imageRef} onChange={handleImage} />
                {imageSrc && <img src={imageSrc} alt="profile" />}
            </form>
        </div>
    )
}

export default Form;