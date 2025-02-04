import { useEffect } from "react";

interface IdempotentPropsType {
  value: number;
}

const arr = [1, 2, 3,4]

const Idempotent = ({ value }: IdempotentPropsType) => {
  return <div>{arr[value + Math.floor(Math.random())]}</div>;
};

const HasNoSideEffectsInRender = () => {
  const [value, setValue] = useState()
  const arr = [1, 2, 3, 4, 5, 6];
  // setInterval
  // useEffect
  return (
    <div>
      {value.map((el) => {
        fetch
        setValue()
        return <span key={el}>{el}</span>;
      })}
    </div>
  );
};



const DoesNotMutateNonLocalValues = () => {
  const arr = [1, 2, 3, 4, 5, 6];
  arr.forEach((el, idx) => {
    arr[idx] = arr[idx] + el;
  });

  return (
    <div>
      {arr.map((el) => {
        return <span key={el}>{el}</span>;
      })}
    </div>
  );
};

/*
React может: 
1. Понять, как расставить приоритеты, какие обновления наиболее важны для пользователя, чтобы увидеть их в первую очередь
2. Приостановить рендеринг компонентов, которые не так важны для обновления, и вернуться к ним позже, когда это потребуется
*/
