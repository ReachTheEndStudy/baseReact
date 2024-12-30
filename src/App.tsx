import { ChangeEvent, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

interface TaskType {
  id: number;
  tasks: string[]
}

export function App() {
  const [list, setList] = useState<TaskType[]>(
    [{ id: 1, tasks: ['уроки', "занятия", "домашка"] }, { id: 2, tasks: ['бицепс', "бег", "плавание"] }]
  )
  const [value, setValue] = useState('')

  // const setTask = () => {
  //   setList([value, ...list])
  //   setValue('')
  // }

  const setValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }

  // const removeTask = (taskToRemove: string) => {
  //   setList(list.filter(task => task !== taskToRemove))
  // }


  return <div>
    {list.map(el => <div>
      <input value={value} onChange={setValueHandler} type='text' />
      {/* <button onClick={setTask}>add task</button> */}
      <button>add task</button>
      <ul>
        {el.tasks.map(
          // (el, index) => <li key={`${el}_${index}`}>{el} <button onClick={() => removeTask(el)}>remove</button> </li>
          (el, index) => <li key={`${el}_${index}`}>{el} <button>remove</button> </li>
        )}
      </ul>
    </div>)}
  </div>
}

