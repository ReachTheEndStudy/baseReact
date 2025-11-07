import { create } from 'zustand'
import { z } from "zod/mini";

const WeatherDataSchema = z.object({
    location: z.object({
        name: z.string()
    }),
    current: z.object({
        temp_c: z.number(),
        condition: z.object({
            text: z.string(),
            icon: z.string()
        }),
    }),
})

type WeatherDataType = z.infer<typeof WeatherDataSchema>


interface UseWeatherType {
    weather: WeatherDataType | null
    loading: boolean
    errorText: string;
    fetchWeather: (city: string) => Promise<void>
}

export const useWeather = create<UseWeatherType>((set) => ({
    weather: null,
    loading: false,
    errorText: '',
    fetchWeather: async (city: string) => {
        try {
            set({ loading: true, errorText: '', weather: null })
            if (!city) {
                throw new Error('Введи хоть что-нибуть')
            }
            if (!/^[a-zA-Z-_\s]+$/.test(city)) {
                throw new Error('Введите англ буквы или _ или -')
            }
            // const res = await fetch(`https://321312api.com/v1/current.json?key=425af8de2ab647949c9165411252407&q=${city}`)
            const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=425af8de2ab647949c9165411252407&q=${city}`)


            const transformRes = await res.json()
            if (res.ok) {
                WeatherDataSchema.parse(transformRes)
                set({ weather: transformRes })
            } else {
                throw new Error(transformRes.error.message)
            }

        } catch (e) {
            let innerErrorText = 'Неизвестная ошибка'
            if (e instanceof Error && e.message) {
                innerErrorText = e.message
            }
            console.error(innerErrorText)
            set({ errorText: innerErrorText })
        } finally {
            set({ loading: false })
        }
    },
}))