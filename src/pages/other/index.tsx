import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'
import Styled from 'styled-components'
import './index.scss'

function HomePage() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  return (
    <StyledWapper>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        这是Other
      </h1>
      <h1 className="aa text-4xl font-bold tracking-tight">这是Other</h1>
      <h1 className="bb text-4xl font-bold tracking-tight">这是Other</h1>
      <div className="mt-2 flex space-x-2">
        <Button onClick={() => i18n.changeLanguage('zh-CN')}>中文</Button>
        <Button onClick={() => i18n.changeLanguage('en')}>English</Button>
        <Button onClick={() => navigate('/home')}>to home</Button>
        <Button onClick={() => navigate(-1)}>返回</Button>
      </div>
      <div className="w-full">这是国际化: {t('common.lang')}</div>
      <div className="w-full">这是当前语言: {i18n.language}</div>
    </StyledWapper>
  )
}

const StyledWapper = Styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100vw;
  background: #ffffff;
  padding: 5rem;
  overflow: hidden;
  .aa {
    color: red
  }
`

export default HomePage
