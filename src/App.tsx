import { ChangeEvent, useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import style from './App.module.css'
import { Tasks } from './components/Tasks/Tasks';
import { ListType, RequestType } from './type';
import { FieldWithAddButton } from './components/FieldWithAddButton/FieldWithAddButton';

export function App() {
  const [listsTask, setListsTask] = useState<ListType[]>([])
  const [requestType, setRequestType] = useState<RequestType>('Loading')

  const addListTasks = (value: string) => {
    if (value) {
      const newListTasks: ListType = { id: new Date().getTime(), name: value }
      setListsTask([newListTasks, ...listsTask])
      setRequestType('Success')
    }
  }

  const removeListTasks = (id: number) => {
    setListsTask(listsTask.filter(list => list.id !== id))
  }

  const fetchLists = () => {
    setRequestType('Loading')
    setTimeout(() => {
      const lists = localStorage.getItem('lists')
      if (lists) {
        const listsTransform = JSON.parse(lists)

        if (Math.random() < 0.8) {
          setListsTask(listsTransform)
          setRequestType(listsTransform.length ? 'Success' : 'Empty')
        } else {
          setRequestType('Error')
        }
      } else {
        setRequestType(Math.random() < 0.1 ? 'Error' : 'Empty')
      }
    }, 2000)
  }

  useEffect(() => {
    fetchLists()
  }, [])

  useEffect(() => {
    if (requestType === 'Success' || requestType === 'Empty') {
      localStorage.setItem('lists', JSON.stringify(listsTask))
    }
  }, [listsTask])

  return <div className={style.wrapper}>
    <div className={style.creteListTasksContainer}>
      <FieldWithAddButton onClick={addListTasks} />
    </div>
    {requestType === 'Loading' && <div className={style.spinner} />}
    {requestType === 'Empty' && <div className={style.emptyAndError}>Начните создавать задачи</div>}
    {requestType === 'Error' && <div className={style.emptyAndError}><button onClick={fetchLists}>Повторите запрос</button></div>}
    {requestType === 'Success' && <div className={style.listTasksContainer}>
      {listsTask.map(listTasks => <Tasks
        key={listTasks.id}
        listTasks={listTasks}
        removeListTasks={removeListTasks}
      />)}
    </div>}
  </div>
}

