import { useEffect } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import style from './App.module.css';
import { FieldWithAddButton } from './components/FieldWithAddButton/FieldWithAddButton';
import { Tasks } from './components/Tasks/Tasks';
import { useListsStore } from './store/lists';

export function App() {
  const { lists, requestType, addListTasks, fetchLists } = useListsStore()
  useEffect(() => {
    fetchLists()
  }, [])

  useEffect(() => {
    if (requestType === 'Success' || requestType === 'Empty') {
      localStorage.setItem('lists', JSON.stringify(lists))
    }
  }, [lists])

  return <div className={style.wrapper}>
    <div className={style.creteListTasksContainer}>
      <FieldWithAddButton onClick={addListTasks} />
    </div>
    {requestType === 'Loading' && <div className={style.spinner} />}
    {requestType === 'Empty' && <div className={style.emptyAndError}>Начните создавать задачи</div>}
    {requestType === 'Error' && <div className={style.emptyAndError}><button onClick={fetchLists}>Повторите запрос</button></div>}
    {requestType === 'Success' && <div className={style.listTasksContainer}>
      {lists.map(listTasks => <Tasks
        key={listTasks.id}
        listTasks={listTasks}
      />)}
    </div>}
  </div>
}

