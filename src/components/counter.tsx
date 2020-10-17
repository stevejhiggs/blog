import React, { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  border-radius: 3px;
  border: 2px solid DodgerBlue;
  color: white;
  background-color: CornflowerBlue;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <h2>You clicked {count} times!</h2>

      <Button onClick={() => setCount(count - 1)}>Decrement</Button>
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
    </>
  );
};

export default Counter;
