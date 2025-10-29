import { Add } from "@mui/icons-material"
import { IconButton, TextField } from "@mui/material"
import { ChangeEvent, memo, useCallback, useEffect, useState } from "react"
import s from './FieldWithAddButton.module.css'
import { useDebounce } from "../../hoocs/useDebounce"

interface FieldWithAddButtonPropsType {
  loading: boolean
  errorText: string;
  action: (value: string) => void
}

function debounce(action: any, delay = 1000) {
  let id: number | undefined
  return function (...args: any) {
    clearTimeout(id)
    id = setTimeout(() => {
      action(...args)
    }, delay)
  }
}

export const FieldWithAddButton = memo(({ loading, errorText, action }: FieldWithAddButtonPropsType) => {
  const [value, setValue] = useState('')
  const [isError, setIsError] = useState(!!errorText)

  const valueD = useDebounce(value)

  const actionD = useCallback(debounce(action), [])

  const setValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
    // actionD(event.currentTarget.value)
    setIsError(false)
  }

  const onClickHandler = () => {
    action(value)
    setValue('')
  }

  useEffect(() => {
    setIsError(!!errorText)
  }, [errorText])

  useEffect(() => {
    if (valueD) {
      actionD(valueD)
    }

  }, [valueD])

  return <div className={s.wrapper}>
    <div>
      <TextField error={isError} size="small" value={value} onChange={setValueHandler} type='text' variant="outlined" />
      <IconButton loading={loading} size="small" color={isError ? 'error' : "primary"} onClick={onClickHandler}><Add /></IconButton>
    </div>
    {isError && <span className={s.errorText}>
      {errorText}
    </span>}

  </div>
})