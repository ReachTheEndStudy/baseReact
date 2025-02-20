import { ChangeEvent, memo, useCallback, useEffect, useState } from "react"
import style from './Tasks.module.css'
import { ListType, TaskType } from "../../type"
import { FieldWithAddButton } from "../FieldWithAddButton/FieldWithAddButton"
import { Delete, Edit, Save } from "@mui/icons-material"
import { Checkbox, IconButton, TextField } from "@mui/material"
import { useListsStore } from "../../store/lists"
import { useTasksStore } from "../../store/tasts"

function propsAreEqual(prevProps: Readonly<TasksPropsType>, nextProps: Readonly<TasksPropsType>): boolean {
  return true
}

interface TasksPropsType {
  listTasks: ListType
}



export const Tasks = memo(({ listTasks }: TasksPropsType) => {
  const { removeListTasks } = useListsStore()
  const { tasks, editableTask, addTasks, editTask, setEditableTask, removeTask, changeIsDoneTask, setTasks } = useTasksStore()

  const setEditableTaskNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEditableTask({ ...editableTask, name: event.currentTarget.value })
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
      <FieldWithAddButton onClick={addTasks} />
      <IconButton size="small" color="primary" onClick={() => removeListTasks(listTasks.id)}><Delete /></IconButton>
    </div>

    <div>
      {tasks.map(
        (task, index) => {
          const isEdit = task.id === editableTask.id
          return <div
            className={style.taskLineContainer} key={`${task}_${index}`}>
            <div>
              <Checkbox checked={task.isDone} onChange={() => changeIsDoneTask(task.id)} color="secondary" />
              {isEdit
                ? <TextField size="small" value={editableTask.name} onChange={setEditableTaskNameHandler} type='text' variant="outlined" />
                : <span>{task.name}</span>}
            </div>

            <div>
              <IconButton size="small" color="primary" onClick={() => editTask(task, isEdit)}>{isEdit ? <Save /> : <Edit />}</IconButton>
              <IconButton size="small" color="primary" onClick={() => removeTask(task.id)}><Delete /></IconButton>
            </div>
          </div>
        }
      )}
    </div>
  </div>
}, propsAreEqual)

