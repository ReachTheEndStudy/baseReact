import { ChangeEvent, useCallback, useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import style from './App.module.css'
import { Tasks } from './components/Tasks/Tasks';
import { ListType, RequestType } from './type';
import { FieldWithAddButton } from './components/FieldWithAddButton/FieldWithAddButton';
import { useListsStore } from './store/lists';

export function App() {
  console.log('render App')
  // const [bears, increasePopulation] = useBearStore((state) => [state.bears, state.increasePopulation])
  // const {bears, increasePopulation} = useBearStore((state) => ({ bears: state.bears, increasePopulation: state.increasePopulation }))
  // const {bears, increasePopulation} = useBearStore((state) => state)
  // const {bears, increasePopulation} = useBearStore()
  const { requestType, listsTask, removeListTasks, addListTasks, fetchLists } = useListsStore()

  const addListTasksHandler = useCallback(addListTasks, [])

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
      <FieldWithAddButton onClick={addListTasksHandler} />
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

