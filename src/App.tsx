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

  const setTask = (id: number, value: string) => {
    const tasks = list.find(el => el.id === id)
    if (tasks) {
      tasks.tasks = [value, ...tasks.tasks]
      setList([...list])
    }
  }

  const removeTask = (id: number, taskToRemove: string) => {
    const tasks = list.find(el => el.id === id)
    if (tasks) {
      const newTasksTasks = tasks.tasks.filter(el => el !== taskToRemove)
      tasks.tasks = newTasksTasks
      setList([...list])
    }
  }

  return <div>
    {list.map(tasks => <Tasks tasks={tasks} setTask={setTask} removeTask={removeTask} />)}
  </div>
}

interface TasksPropsType {
  tasks: TaskType
  setTask: (id: number, value: string) => void
  removeTask: (id: number, taskToRemove: string) => void
}

const Tasks = ({ tasks, setTask, removeTask }: TasksPropsType) => {
  const [value, setValue] = useState('')
  const setValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }
  const setTaskHandler = () => {
    setTask(tasks.id, value)
    setValue('')
  }

  return <div>
    <input value={value} onChange={setValueHandler} type='text' />
    <button onClick={setTaskHandler}>add task</button>
    <ul>
      {tasks.tasks.map(
        (el, index) => <li key={`${el}_${index}`}>{el} <button onClick={() => removeTask(tasks.id, el)}>remove</button> </li>
      )}
    </ul>
  </div>
}

