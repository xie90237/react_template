import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Index from 'pages/index'

import HomePage from 'pages/home/index'
import Count from 'pages/home/Count'
import Store from 'pages/home/Store'
import Form from 'pages/home/Form'
import PathParams from 'pages/home/PathParams'
import SearchParams from 'pages/home/SearchParams'
import OtherPage from 'pages/other/index'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<HomePage />}>
          <Route index element={<Count />} />
          <Route path="store" element={<Store />} />
          <Route path="count" element={<Count />} />
          <Route path="form" element={<Form />} />
          <Route path="pathParams/:id" element={<PathParams />} />
          <Route path="searchParams" element={<SearchParams />} />
        </Route>
        <Route path="/other" element={<OtherPage />} />
        <Route path="*" element={<OtherPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
