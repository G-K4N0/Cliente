import React from 'react'
import { BarraNavegacion } from '../home/Navbar'
import { Sidebar } from './Sidebar'
import styles from '../styleComponents/Sidebar.module.scss'
import { Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export const Dashboard = () => {
  const { auth } = useAuth()
  return (
    <div>
      { auth.user ? <BarraNavegacion user={auth.user}/> : <BarraNavegacion login="Iniciar sesión"/> }
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className= {styles.outletDash}>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}
