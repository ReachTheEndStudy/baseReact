import { useEffect, useState } from "react";

export const Refresh = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <TimeValue time={value} />
      <button onClick={() => setValue(new Date().getTime())}>
        refresh time
      </button>
    </div>
  );
};

const TimeValue = ({ time }: { time: number }) => {
  console.log("TimeValue render");

  useEffect(() => {
    console.log("TimeValue first render");

    return () => {
      console.log("TimeValue last render");
    };
  }, []);

  return <div>{time}</div>;
};
