import { memo, useCallback, useMemo, useState } from "react"

export const Counter = () => {
  console.log('render Counter')
  const [value, setValue] = useState(0)

  // const setValueHandler = useMemo(() => {
  //   return () => {
  //     setValue(v => v + 1)
  //   }
  // }, [])
  const setValueHandler = useCallback(() => {
    setValue(v => v + 1)
  }, [])

  return <div>
    <span>{value}</span>
    <CounterPlusOne plusOne={setValueHandler} />
  </div>
}


// oldProps = {number, ...}  newProps = {number, ...}
// oldPlusOne !== newPlusOne
const CounterPlusOne = memo(({ plusOne }: { plusOne: () => void }) => {
  console.log('render CounterPlusOne')
  return <button onClick={plusOne}>+1</button>
})