import { ChangeEvent, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

export function App() {
  const [list, setList] = useState<string[]>(['покупки', "зарядка"])
  const [value, setValue] = useState('')

  const setTask = () => {
    setList([value, ...list])
    setValue('')
  }

  const setValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }


  return <div>
    <div>
      <input value={value} onChange={setValueHandler} type='text' />
      <button onClick={setTask}>add task</button>
      <ul>
        {list.map((el, index) => <li key={`${el}_${index}`}>{el}</li>)}
      </ul>
    </div>
    <div>
      <input value={value} onChange={setValueHandler} type='text' />
      <button onClick={setTask}>add task</button>
      <ul>
        {list.map((el, index) => <li key={`${el}_${index}`}>{el}</li>)}
      </ul>

    </div>

  </div>
}

