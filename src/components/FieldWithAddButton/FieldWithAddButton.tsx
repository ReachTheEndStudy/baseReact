import { Add } from "@mui/icons-material"
import { IconButton, TextField } from "@mui/material"
import { ChangeEvent, memo, useState } from "react"

interface FieldWithAddButtonPropsType {
  onClick: (value: string) => void
}

export const FieldWithAddButton = memo(({ onClick }: FieldWithAddButtonPropsType) => {
  const [value, setValue] = useState('')
  const setValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }

  const onClickHandler = () => {
    onClick(value)
    setValue('')
  }


  return <>
    <TextField size="small" value={value} onChange={setValueHandler} type='text' variant="outlined" />
    <IconButton size="small" color="primary" onClick={onClickHandler}><Add /></IconButton>
  </>
})