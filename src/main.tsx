import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { Refresh } from "./theory/reconciliation/refresh.tsx";
import { Id } from "./theory/reconciliation/id.tsx";

const Counter = () => {
  const [value, setValue] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    console.log("Counter");
    return () => {
      console.log("return");
    };
  });

  return (
    <div>
      <span>{value}</span>
      <button onClick={() => setValue((v) => v + 1)}>+1</button>
      {/* <button onClick={() => setIsVisible(!isVisible)}>setIsVisible</button>
    {isVisible && <Interval />} */}
    </div>
  );
};

// const Interval = () => {
//   useEffect(() => {
//     console.log('Interval')
//     const inter = setInterval(() => {
//       console.log('hello')
//     }, 1000)

//     return ()=>{
//       clearInterval(inter)
//     }
//   }, [])

//   return <div>hello</div>
// }

// createRoot(document.getElementById('root')!).render(<Counter />)
// createRoot(document.getElementById("root")!).render(<Refresh />);
createRoot(document.getElementById("root")!).render(<Id />);

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
