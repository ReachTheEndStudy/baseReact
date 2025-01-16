import { ChangeEvent, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import style from './App.module.css'
import { Tasks } from './components/Tasks/Tasks';
import { listsData, ListType } from './data';





export function App() {
  const [value, setValue] = useState('')
  const setValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }
  const [listsTask, setListsTask] = useState<ListType[]>(listsData)

  const addListTasks = () => {
    if (value) {
      const newListTasks: ListType = { id: new Date().getTime(), name: value }
      setListsTask([newListTasks, ...listsTask])
      setValue('')
    }
  }

  const removeListTasks = (id: number) => {
    setListsTask(listsTask.filter(list => list.id !== id))
  }

  return <div className={style.wrapper}>
    <div className={style.creteListTasksContainer}>
      <input value={value} onChange={setValueHandler} type='text' />
      <button onClick={addListTasks}>add list tasks</button>
    </div>

    <div className={style.listTasksContainer}>
      {listsTask.map(listTasks => <Tasks
        key={listTasks.id}
        listTasks={listTasks}
        removeListTasks={removeListTasks}
      />)}
    </div>
  </div>
}

