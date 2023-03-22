import './App.scss'
import { Login } from './components/login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './components/dash/Dashboard'
import { Avisos } from './components/Pages/Aviso/GetAviso'
import { Carreras } from './components/Pages/Carrera/Carreras'
import { Estadisticas } from './components/Pages/Estadistica/Estadisticas'
import { Home } from './components/Pages/Home'
import { Horarios } from './components/Pages/Horario/Horarios'
import { Labs } from './components/Pages/Lab/Labs'
import { Materias } from './components/Pages/Materia/Materias'
import { Inicio } from './components/home/Inicio'
import { Usuario } from './components/Pages/Usuario/Usuario'
function App () {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact={true} element={<Inicio/>} />
          <Route path="/login" exact={true} element={<Login />} />
          <Route path="/dashboard" exact={true} element={<Dashboard />}>
            <Route path="inicio" exact={true} element={<Home/>} />
            <Route path="usuarios" exact={true} element={<Usuario/>} />
            <Route path="materias"exact={true} element={<Materias/>} />
            <Route path="carreras" exact={true} element={<Carreras/>} />
            <Route path="labs" exact={true} element={<Labs/>} />
            <Route path="horarios" exact={true} element={<Horarios/>} />
            <Route path="avisos" exact={true} element={<Avisos/>} />
            <Route path="estadisticas" exact={true} element={<Estadisticas/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
