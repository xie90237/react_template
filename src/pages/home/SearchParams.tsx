import { useSearchParams } from 'react-router-dom'
import { Button } from 'antd'

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()

  console.log(searchParams.get('id')) // 12

  const test = () => {
    setSearchParams({
      name: 'foo'
    }) // /foo?name=foo
  }
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="flex flex-col items-start">
        search动态参数:
        <div>id: {searchParams.get('id') || '没有'}</div>
        <div>name: {searchParams.get('name') || '没有'}</div>
      </div>
      <Button onClick={test}>setName</Button>
    </div>
  )
}

export default HomePage
