import { useEffect, useRef, useState } from "react";


export default function UseRefForm() {
  const imageRef = useRef(null);
  const elemRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [formState, setFormState] = useState({
    image: ""
  });

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


  const moveToTop = () => {
    elemRef.current.scrollTop = 0;
  }

  return (
    <div>
      <h1>Form</h1>
      <form>
        <input type="file" ref={imageRef} onChange={handleImage} />
        {imageSrc && <img src={imageSrc} alt="profile" />}
      </form>
      <div
        ref={elemRef}
        style={{
          width: 100,
          height: 100,
          margin: "2rem auto",
          border: "1px black solid",
          overflow: "scroll"
        }}
      >
        <div 
          style={{ width: 50, height: 1024, border: "1px black solid" }}
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum quod nemo minima ut reiciendis debitis consectetur, hic architecto, accusamus dicta recusandae eius voluptates doloremque reprehenderit quaerat totam consequuntur pariatur voluptas.
        </div>
      </div>
      <button onClick={moveToTop}>Scroll To Top</button>
    </div>
  );
};