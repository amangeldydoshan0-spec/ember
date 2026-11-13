import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout.tsx'
import { AboutPage } from './pages/AboutPage.tsx'
import { ContactPage } from './pages/ContactPage.tsx'
import { GalleryPage } from './pages/GalleryPage.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { MenuPage } from './pages/MenuPage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { ReservePage } from './pages/ReservePage.tsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="reserve" element={<ReservePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
