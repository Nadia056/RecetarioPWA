import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes,Navigate  } from 'react-router'
import Home from './components/Home.tsx'
import PerfilPage from './components/perfil/page.tsx'
import TopPage from './components/top/page.tsx'
import ExplorePage from './components/explorar/page.tsx'
import EditarPerfil from './components/perfil/configuracion.tsx'
import RecetaDetalle from './components/recetas/recetas.tsx'
import NuevaReceta from './components/recetas/NuevaReceta.tsx'
import ProtectedRoute from './ProtectedRoute.tsx'
import EditarReceta from './components/recetas/EditarReceta.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/perfil" element={<ProtectedRoute><PerfilPage /></ProtectedRoute>} />
        <Route path="/top" element={<ProtectedRoute><TopPage /></ProtectedRoute>} />
        <Route path="/explorar" element={<ProtectedRoute><ExplorePage /></ProtectedRoute>} />
        <Route path="/perfil/update" element={<ProtectedRoute><EditarPerfil /></ProtectedRoute>} />
        <Route path="/receta/:id" element={<ProtectedRoute><RecetaDetalle /></ProtectedRoute>} />
        <Route path="/recetaNueva" element={<ProtectedRoute><NuevaReceta /></ProtectedRoute>} />
        <Route path="/editarReceta/:id" element={<ProtectedRoute><EditarReceta /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

    </BrowserRouter>
  </StrictMode>,
)
