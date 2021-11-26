import { useState } from 'react';
import './App.css';
import Counter from './Counter/Counter';
// import Todo from './Todo/Todo';

function App() {
  const [display, setDisplay] = useState(false);
  
  return (
    <div className="App">
      {/* <Todo /> */}
      {display && <Counter />}
      <button onClick={() => setDisplay(!display)}>Display</button>
    </div>
  );
}

export default App;
