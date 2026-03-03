
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardPage from './components/pages/DashPage'
import MenuPage from './components/pages/MenuPage'
import PreviewPage from './components/pages/PreviewPage'
import DishFormPage from './components/pages/FormPage'
import Layout from './components/organism/Layout'

  const App = () => {
  return (
      <BrowserRouter>
      <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/new" element={<DishFormPage />} />
        <Route path="/menu/edit/:id" element={<DishFormPage />} />
        <Route path="/preview" element={<PreviewPage />} />
      </Routes>
      </Layout>
    </BrowserRouter>
  )

}

export default App
