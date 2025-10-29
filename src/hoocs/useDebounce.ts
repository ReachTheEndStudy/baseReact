import { useEffect, useState } from "react"

export const useDebounce = (value: string, delay = 1000) => {
    const [valueD, setValueD] = useState(value)

    useEffect(() => {
        const id = setTimeout(() => {
            setValueD(value)
        }, delay)

        return () => {
            clearTimeout(id)
        }

    }, [value])

    return valueD
}