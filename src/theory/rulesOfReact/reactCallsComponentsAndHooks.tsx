// React должен решить, когда функция компонента будет вызвана во время рендеринга

const SomeComponent = () => <div>hello</div>;

const NeverCallComponentFunctionsDirectly = () => {
  const arr = [1, 2, 3, 4, 5, 6];
  return (
    <div>
      <SomeComponent />
      {arr.map((el) => {
        return <span key={el}>{el}</span>;
      })}
    </div>
  );
};

const useDataWithLogging = () => {
  // ... some code
};
const useDataWithLogging = () => {
  // ... some code
};

const DontDynamicallyMutateHook = () => {
  const [data, setData] = useDataWithLogging(2version);

  return <div>{data}</div>;
};

const DontDynamicallyUseHooks = () => {
  return <SomeComponent useData={useData} />;
};
