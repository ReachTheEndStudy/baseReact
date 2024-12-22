import { ChangeEvent, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState<any[]>(['nikita', 1231, 1231, 1231, 1231, 1231])
  const [value, setValue] = useState('')

  const setCountHandler = () => {
    setCount([...count, 1231])
  }

  const sendToConsole = (someArg: any) => {
    console.log(someArg)
  }

  const setValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }

  console.log(value)

  return <div>
    <span>{count.map(el => <button onClick={()=>sendToConsole(el)}>{el}</button>)}</span>
    <button onClick={setCountHandler}>+1</button>
    <input value={value} onChange={setValueHandler} type='text'/>
  </div>
}

export default App
