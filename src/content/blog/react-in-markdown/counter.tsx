import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Click a button</CardTitle>
      </CardHeader>
      <CardContent>You clicked {count} times!</CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => setCount(count - 1)}>Decrement</Button>
        <Button onClick={() => setCount(count + 1)}>Increment</Button>
      </CardFooter>
    </Card>
  );
};

export default Counter;
