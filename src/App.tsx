import { ChangeEvent, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Tasks } from './components/Tasks/Tasks';

export interface TaskType {
  id: number;
  tasks: string[];
  name: string;
}

export function App() {
  const [value, setValue] = useState('')
  const setValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }
  const [list, setList] = useState<TaskType[]>(
    [
      { id: 1, name: 'Развитие', tasks: ['уроки', "занятия", "домашка"] },
      { id: 2, name: 'Спорт', tasks: ['бицепс', "бег", "плавание"] }
    ]
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

  const addListTasks = () => {
    if (value) {
      const newListTasks = { id: new Date().getTime(), name: value, tasks: [] }
      setList([newListTasks, ...list])
      setValue('')
    }
  }

  return <div className='wrapper'>
    <input value={value} onChange={setValueHandler} type='text' />
    <button onClick={addListTasks}>add list tasks</button>
    <div className='listTasksContainer'>
      {list.map(tasks => <Tasks tasks={tasks} setTask={setTask} removeTask={removeTask} />)}
    </div>
  </div>
}

