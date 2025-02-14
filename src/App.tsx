import { ChangeEvent, useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import style from './App.module.css'
import { Tasks } from './components/Tasks/Tasks';
import { ListType } from './type';
import { FieldWithAddButton } from './components/FieldWithAddButton/FieldWithAddButton';





export function App() {
  const [listsTask, setListsTask] = useState<ListType[]>([])

  const addListTasks = (value: string) => {
    if (value) {
      const newListTasks: ListType = { id: new Date().getTime(), name: value }
      setListsTask([newListTasks, ...listsTask])
    }
  }

  const removeListTasks = (id: number) => {
    setListsTask(listsTask.filter(list => list.id !== id))
  }

  useEffect(() => {
    const lists = localStorage.getItem('lists')

    if (lists) {
      setListsTask(JSON.parse(lists))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(listsTask))
  }, [listsTask])

  return <div className={style.wrapper}>
    <div className={style.creteListTasksContainer}>
      <FieldWithAddButton onClick={addListTasks} />
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

