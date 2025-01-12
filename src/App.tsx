import { ChangeEvent, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import style from './App.module.css'
import { Tasks } from './components/Tasks/Tasks';

export interface TaskType {
  id: number;
  tasks: { id: number, name: string }[];
  name: string;
}

export function App() {
  const [value, setValue] = useState('')
  const setValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }
  const [list, setList] = useState<TaskType[]>(
    [
      { id: 1, name: 'Развитие', tasks: [{ id: 1, name: "уроки" }, { id: 2, name: "занятия" }, { id: 3, name: "домашка" }] },
      { id: 2, name: 'Спорт', tasks: [{ id: 1, name: "бицепс" }, { id: 2, name: "бег" }, { id: 3, name: "плавание" }] }
    ]
  )

  const setTask = (id: number, value: string) => {
    const tasks = list.find(el => el.id === id)
    if (tasks) {
      tasks.tasks = [{ id: new Date().getTime(), name: value }, ...tasks.tasks]
      setList([...list])
    }
  }

  const removeTask = (id: number, taskToRemoveId: number) => {
    const tasks = list.find(el => el.id === id)
    if (tasks) {
      const newTasksTasks = tasks.tasks.filter(el => el.id !== taskToRemoveId)
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

  return <div className={style.wrapper}>
    <div className={style.creteListTasksContainer}>
      <input value={value} onChange={setValueHandler} type='text' />
      <button onClick={addListTasks}>add list tasks</button>
    </div>

    <div className={style.listTasksContainer}>
      {list.map(tasks => <Tasks tasks={tasks} setTask={setTask} removeTask={removeTask} />)}
    </div>
  </div>
}

