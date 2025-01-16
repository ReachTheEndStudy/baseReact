import { ChangeEvent, useState } from "react"
import style from './Tasks.module.css'
import { ListType, tasksData, TaskType } from "../../data"

interface TasksPropsType {
  listTasks: ListType
  removeListTasks: (id: number) => void
}

const emptyTask = { id: -1, name: '', isDone: false }

export const Tasks = ({ listTasks, removeListTasks }: TasksPropsType) => {
  const [value, setValue] = useState('')
  const [tasks, setTasks] = useState<TaskType[]>(tasksData[listTasks.id])
  const [editableTask, setEditableTask] = useState<TaskType>(emptyTask)
  const setValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }

  const setTaskHandler = () => {
    if (value) {
      setTasks([{ id: new Date().getTime(), name: value, isDone: false }, ...tasks])
      setValue('')
    }
  }

  const removeListTasksHandler = () => {
    removeListTasks(listTasks.id)
  }

  const editTask = (task: TaskType, isEdit: boolean) => {
    if (isEdit) {
      setTasks(tasks.map(task => task.id === editableTask.id ? editableTask : task))
      setEditableTask(emptyTask)
    } else {
      setEditableTask(task)
    }
  }

  const setEditableTaskName = (event: ChangeEvent<HTMLInputElement>) => {
    setEditableTask({ ...editableTask, name: event.currentTarget.value })
  }

  const removeTask = (id: number) => {
    setTasks(tasks.filter(tasks => tasks.id !== id))
  }

  const changeIsDoneTask = (id: number) => {
    console.log(tasks.map(task => task.id === id ? { ...task, idDone: !task.isDone } : task))
    setTasks(tasks.map(task => task.id === id ? { ...task, idDone: !task.isDone } : task))
  }

  return <div className={style.wrapper}>
    <h3>{listTasks.name}</h3>
    <div className={style.creteTaskContainer}>
      <input value={value} onChange={setValueHandler} type='text' />
      <button onClick={setTaskHandler}>add task</button>
      <button onClick={removeListTasksHandler}>remove list tasks</button>
    </div>

    <div>
      {tasks.map(
        (task, index) => {
          const isEdit = task.id === editableTask.id
          return <div
            className={style.taskLineContainer} key={`${task}_${index}`}>
            <div>
              <input type='checkbox' checked={task.isDone} onChange={() => changeIsDoneTask(task.id)} />
              {isEdit ? <input type="text" value={editableTask.name} onChange={setEditableTaskName} /> : <span>{task.name}</span>}
            </div>

            <div>
              <button onClick={() => editTask(task, isEdit)}>{isEdit ? 'save' : 'edit'}</button>
              <button onClick={() => removeTask(task.id)}>remove</button>
            </div>
          </div>
        }
      )}
    </div>
  </div>
}

