import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const handleIncrement = (): void => {
    setCount((prev) : number => prev + 1);
    setCount((prev) : number => prev + 1);
    setCount((prev) : number => prev + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <>
      <h1>{count}</h1>
      <div>
        <button onClick={handleIncrement}>+1 증가</button>
        <button onClick={handleDecrement}>-1 감소</button>
      </div>
    </>
  );
}

export default App;