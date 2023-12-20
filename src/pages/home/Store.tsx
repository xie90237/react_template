import { useEffect, useState } from 'react'
import { Button } from 'antd'
import { useTestStore } from 'store'

const Count = () => {
  const { count, setCount, addCount } = useTestStore((state) => state)
  const fetchCount = useTestStore((state) => state.fetchCount)
  const getCountVo = useTestStore((state) => state.getCountVo)
  const [countA, setCountA] = useState(0)

  useEffect(() => {
    setCountA(count)
  }, [count])

  return (
    <>
      <div>{count}</div>
      <Button onClick={() => setCount(5)}>set 5</Button>
      <Button onClick={() => addCount(1)}>+1</Button>
      <Button onClick={() => fetchCount()}>fetchAdd</Button>
      <div>监听(countA): {countA}</div>
      <div>getCountVo: {getCountVo()}</div>
    </>
  )
}

export default Count
