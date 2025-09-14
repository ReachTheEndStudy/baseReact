import { Add } from "@mui/icons-material"
import { IconButton, TextField } from "@mui/material"
import { ChangeEvent, memo, useState } from "react"

interface FieldWithAddButtonPropsType {
  loading: boolean
  onClick: (value: string) => void
}

export const FieldWithAddButton = memo(({ loading, onClick }: FieldWithAddButtonPropsType) => {
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
    <IconButton loading={loading} size="small" color="primary" onClick={onClickHandler}><Add /></IconButton>
  </>
})