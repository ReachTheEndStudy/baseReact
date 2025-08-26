import style from './App.module.css';
import { FieldWithAddButton } from './components/FieldWithAddButton/FieldWithAddButton';

export function App() {

  return <div className={style.wrapper}>
    <FieldWithAddButton onClick={console.log} />
  </div>
}

