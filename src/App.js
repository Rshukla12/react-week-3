import { useState } from 'react';
import './App.css';
import Timer from './Timer/Timer';
// import Counter from './Counter/Counter';
// import Todo from './Todo/Todo';

function App() {
  const [display, setDisplay] = useState(false);
  
  return (
    <div className="App">
      {/* <Todo /> */}
      {/* {display && <Counter />}
      <button onClick={() => setDisplay(!display)}>Display</button> */}
      <Timer init={10} end={15} />
      <Timer init={30} end={40} />
      <Timer init={5} end={7} />
    </div>
  );
}

export default App;
