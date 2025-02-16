import { ChangeEvent, useState } from "react"

interface FieldWithAddButtonPropsType {
  onClick: (value: string) => void
}

export const FieldWithAddButton = ({ onClick }: FieldWithAddButtonPropsType) => {
  const [value, setValue] = useState('')
  const setValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }

  const onClickHandler = () => {
    onClick(value)
    setValue('')
  }


  return <>
    <input value={value} onChange={setValueHandler} type='text' />
    <button onClick={onClickHandler}>add task</button>
  </>
}