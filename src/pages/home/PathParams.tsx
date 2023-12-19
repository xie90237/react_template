import { Outlet } from 'react-router-dom'
import { useParams } from 'react-router-dom'

function HomePage() {
  const params = useParams()
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="flex items-center justify-start pl-[40px]">
        path动态参数: {params.id}
      </div>
    </div>
  )
}

export default HomePage
