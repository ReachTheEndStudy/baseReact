import { ChangeEvent, useState } from "react"
import { TaskType } from "../../App"
import style from './Tasks.module.css'

interface TasksPropsType {
  tasks: TaskType
  setTask: (id: number, value: string) => void
  removeTask: (id: number, taskToRemoveId: number) => void
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
    <div className={style.creteTaskContainer}>
      <input value={value} onChange={setValueHandler} type='text' />
      <button onClick={setTaskHandler}>add task</button>
    </div>

    <div>
      {tasks.tasks.map(
        (el, index) => <div
          className={style.taskLineContainer} key={`${el}_${index}`}>
          <span>{el.name}</span> <button onClick={() => removeTask(tasks.id, el.id)}>remove</button>
        </div>
      )}
    </div>
  </div>
}

