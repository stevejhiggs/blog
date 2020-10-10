import React, { useState } from "react";

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <h2>You clicked {count} times!</h2>

      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
};

export default Counter;
