import { ChangeEvent, useState } from "react"
import { TaskType } from "../../App"
import style from './Tasks.module.css'

interface TasksPropsType {
  tasks: TaskType
  setTask: (id: number, value: string) => void
  removeTask: (id: number, taskToRemove: string) => void
}

export const Tasks = ({ tasks, setTask, removeTask }: TasksPropsType) => {
  const [value, setValue] = useState('')
  const setValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }
  const setTaskHandler = () => {
    if (value) {
      setTask(tasks.id, value)
      setValue('')
    }
  }

  return <div className={style.wrapper}>
    <h3>{tasks.name}</h3>
    <input value={value} onChange={setValueHandler} type='text' />
    <button onClick={setTaskHandler}>add task</button>
    <ul>
      {tasks.tasks.map(
        (el, index) => <li key={`${el}_${index}`}>{el} <button onClick={() => removeTask(tasks.id, el)}>remove</button> </li>
      )}
    </ul>
  </div>
}

