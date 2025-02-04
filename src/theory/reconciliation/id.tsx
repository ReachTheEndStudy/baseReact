import { memo, useEffect, useState } from "react";

export const Id = () => {
  const [value, setValue] = useState([1, 2, 3]);

  return (
    <div>
      <button onClick={() => setValue(value.filter((el) => el !== 2))}>
        remove 2 element
      </button>
      {value.map((el, index) => (
        <Line value={el} key={index}/>
      ))}
      {}
    </div>
  );
};

const Line = memo(({ value }: { value: number }) => {
  useEffect(() => {
    console.log(`Line number ${value} first render`);

    return () => {
      console.log(`Line number ${value} last render`);
    };
  });

  return <span>{value}</span>;
});
