import { useState } from 'react';
import style from './App.module.css';
import { FieldWithAddButton } from './components/FieldWithAddButton/FieldWithAddButton';

interface WeatherDataType {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    }
  }
}

export function App() {

  const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null)

  const onClickHandler = (city: string) => {
    fetch(`https://api.weatherapi.com/v1/current.json?key=425af8de2ab647949c9165411252407&q=${city}`)
      .then(res => {
        res.json().then(res => setWeatherData(res))
      })
  }

  console.log(weatherData)

  return <div className={style.wrapper}>
    <FieldWithAddButton onClick={onClickHandler} />
    {!!weatherData ? <div>
      <div>{weatherData.location.name} - {weatherData.current.temp_c}</div>
      <div>Погодные условия: {weatherData.current.condition.text} <img src={weatherData.current.condition.icon} /></div>

    </div> : <div>Сделайте запрос</div>}
  </div>
}

