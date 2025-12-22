import { useEffect } from "react";
import { useWeather } from "../../store";
import { useLocation } from "wouter";
import { Button } from "@mui/material";

interface CityScreenPropsType {
    city: string;
}

export const CityScreen = ({ city }: CityScreenPropsType) => {
    const { weather, loading, errorText, fetchWeather } = useWeather()
    const [, setLocation] = useLocation();

    useEffect(() => {
        fetchWeather(city)
    }, [])

    if (loading) {
        return <div>Загрузка...</div>
    }
    return <div><Button onClick={() => setLocation('/')}>Home</Button>{!!weather ? <div>
        <div>{weather.location.name} - {weather.current.temp_c}</div>
        <div>Погодные условия: {weather.current.condition.text} <img src={weather.current.condition.icon} /></div>

    </div> : <div>{errorText}</div>}</div>
}