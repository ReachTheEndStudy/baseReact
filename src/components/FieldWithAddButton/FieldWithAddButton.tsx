import { Add } from "@mui/icons-material"
import { IconButton, TextField } from "@mui/material"
import { ChangeEvent, memo, useEffect, useState } from "react"
import s from './FieldWithAddButton.module.css'

interface FieldWithAddButtonPropsType {
  loading: boolean
  errorText: string;
  onClick: (value: string) => void
}

export const FieldWithAddButton = memo(({ loading, errorText, onClick }: FieldWithAddButtonPropsType) => {
  const [value, setValue] = useState('')
  const [isError, setIsError] = useState(!!errorText)

  const setValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
    setIsError(false)
  }

  const onClickHandler = () => {
    onClick(value)
    setValue('')
  }

  useEffect(() => {
    setIsError(!!errorText)
  }, [errorText])

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