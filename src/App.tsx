import style from './App.module.css';
import { FieldWithAddButton } from './components/FieldWithAddButton/FieldWithAddButton';
import { useWeather } from './store';



export function App() {
  const {weather, loading, errorText, fetchWeather} = useWeather()

  return <div className={style.wrapper}>
    <FieldWithAddButton onClick={fetchWeather} loading={loading} errorText={errorText}/>
    {!!weather ? <div>
      <div>{weather.location.name} - {weather.current.temp_c}</div>
      <div>Погодные условия: {weather.current.condition.text} <img src={weather.current.condition.icon} /></div>

    </div> : <div>Сделайте запрос</div>}
  </div>
}

