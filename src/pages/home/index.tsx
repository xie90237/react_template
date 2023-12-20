import { useNavigate, useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'
import { useEffect } from 'react'
import { getApi } from 'api'

function HomePage() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    console.log(location)
  }, [location])
  return (
    <div className="relative flex flex-col overflow-hidden bg-white p-20">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        这是HOME - ({location.pathname})
      </h1>
      <div className="mt-2 flex space-x-2">
        <Button onClick={() => navigate('count')}>count</Button>
        <Button onClick={() => navigate('store')}>store</Button>
        <Button onClick={() => navigate('form')}>form</Button>
        <Button onClick={() => navigate('pathParams/123')}>
          path 动态参数
        </Button>
        <Button onClick={() => navigate('searchParams?id=1111')}>
          search 动态参数
        </Button>
        <Button onClick={() => navigate('/other')}>to other</Button>
        <Button onClick={() => getApi()}>请求</Button>
        <Button onClick={() => navigate(-1)}>返回</Button>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  )
}

export default HomePage
