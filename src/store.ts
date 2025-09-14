import { create } from 'zustand'

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

interface UseWeatherType {
    weather: WeatherDataType | null
    loading: boolean
    fetchWeather: (city: string) => Promise<void>
}

export const useWeather = create<UseWeatherType>((set) => ({
    weather: null,
    loading: false,
    fetchWeather: async (city: string) => {
        try {
            set({ loading: true })
            // const res = await fetch(`https://321312api.com/v1/current.json?key=425af8de2ab647949c9165411252407&q=${city}`)
            const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=425af8de2ab647949c9165411252407&q=${city}`)


            const transformRes = await res.json()
            if (res.ok) {
                set({ weather: transformRes })
            } else {
                throw new Error(transformRes.error.message)
            }

        } catch (e) {
            if (e instanceof Error) {
                console.error(e.message ? e.message : 'Неизвестная ошибка')
            } else {
                console.error('Неизвестная ошибка')
            }
        } finally {
            set({ loading: false })
        }
    },
}))