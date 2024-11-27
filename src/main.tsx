import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './components/Home.tsx'
import PerfilPage from './components/perfil/page.tsx'
import TopPage from './components/top/page.tsx'
import ExplorePage from './components/explorar/page.tsx'
import EditarPerfil from './components/perfil/configuracion.tsx'
import RecetaDetalle from './components/recetas/recetas.tsx'
import NuevaReceta from './components/recetas/NuevaReceta.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/perfil' element={<PerfilPage/>} />
      <Route path='/top' element= {<TopPage/>} />
      <Route path='/explorar' element= {<ExplorePage/>} />
      <Route path='/perfil/update' element= {<EditarPerfil/>} />
      <Route path='/receta' element= {<RecetaDetalle/>} />
      <Route path='/recetaNueva' element={<NuevaReceta/>} />
      
      
    </Routes>
  
    </BrowserRouter>
  </StrictMode>,
)
