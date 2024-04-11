import { useNavigate, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'

const ThreePage = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  return (
    <div className="relative flex flex-col overflow-hidden bg-white p-20">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        这是Three - ({location.pathname})
      </h1>
      <div className="mt-2 flex space-x-2">
        <Button onClick={() => navigate('example1')}>示例1</Button>
        <Button onClick={() => navigate('/home')}>to Home</Button>
        <Button onClick={() => navigate(-1)}>返回</Button>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  )
}

export default ThreePage
