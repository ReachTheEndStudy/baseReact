import { ChangeEvent, memo, useCallback, useEffect, useState } from "react"
import style from './Tasks.module.css'
import { ListType, TaskType } from "../../type"
import { FieldWithAddButton } from "../FieldWithAddButton/FieldWithAddButton"

function propsAreEqual(prevProps: Readonly<TasksPropsType>, nextProps: Readonly<TasksPropsType>): boolean {
  return true
}

interface TasksPropsType {
  listTasks: ListType
  removeListTasks: (id: number) => void
}

const emptyTask = { id: -1, name: '', isDone: false }

export const Tasks = memo(({ listTasks, removeListTasks }: TasksPropsType) => {
  console.log('render tasks ' + listTasks.name)
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [editableTask, setEditableTask] = useState<TaskType>(emptyTask)


  const setTaskHandler = useCallback((value: string) => {
    if (value) {
      setTasks(tasks => [{ id: new Date().getTime(), name: value, isDone: false }, ...tasks])
    }
  }, [])

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
    setTasks(tasks.map(task => task.id === id ? { ...task, isDone: !task.isDone } : task))
  }

  useEffect(() => {
    const tasks = localStorage.getItem(listTasks.id.toString())

    if (tasks) {
      setTasks(JSON.parse(tasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(listTasks.id.toString(), JSON.stringify(tasks))
  }, [tasks])

  return <div className={style.wrapper}>
    <h3>{listTasks.name}</h3>
    <div className={style.creteTaskContainer}>
      <FieldWithAddButton onClick={setTaskHandler} />
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
}, propsAreEqual)

