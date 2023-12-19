import { useEffect, useState } from 'react'
import { Button } from 'antd'

const Count = () => {
  const [count, setCount] = useState(0)
  const [countA, setCountA] = useState(0)
  const handelAdd = () => {
    setCount(count + 1)
  }

  useEffect(() => {
    setCountA(count)
  }, [count])

  return (
    <>
      <div>{count}</div>
      <Button onClick={handelAdd}>+1</Button>
      <div>监听(countA): {countA}</div>
    </>
  )
}

export default Count
