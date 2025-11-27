import { Add } from "@mui/icons-material"
import { IconButton, TextField } from "@mui/material"
import { ChangeEvent, memo, useState } from "react"
import s from './FieldWithAddButton.module.css'

interface FieldWithAddButtonPropsType {
  action: (value: string) => void
}

export const FieldWithAddButton = memo(({ action }: FieldWithAddButtonPropsType) => {
  const [value, setValue] = useState('')

  const setValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }

  const onClickHandler = () => {
    action(value)
    setValue('')
  }

  return <div className={s.wrapper}>
    <div>
      <TextField size="small" value={value} onChange={setValueHandler} type='text' variant="outlined" />
      <IconButton size="small" color='primary' onClick={onClickHandler}><Add /></IconButton>
    </div>
  </div>
})