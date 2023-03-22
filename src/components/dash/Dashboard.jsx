import React from 'react'
import { useJwt } from 'react-jwt'
import { Navbar } from '../home/Navbar'
import { Sidebar } from './Sidebar'
import styles from '../styleComponents/Sidebar.module.scss'
import { Outlet } from 'react-router-dom'
export const withAuth = (WrappedComponent) => {
  return class extends React.Component {
    state = {
      isLoading: true,
      isAuthenticated: false
    }

    componentDidMount () {
      const token = localStorage.getItem('token')
      try {
        useJwt.verify(token, 'secret')
        this.setState({ isLoading: false, isAuthenticated: true })
      } catch (err) {
        this.setState({ isLoading: false, isAuthenticated: false })
      }
    }

    render () {
      const { isLoading, isAuthenticated } = this.state

      if (isLoading) return null
      if (!isAuthenticated) return <redirect to="/login" />

      return <WrappedComponent {...this.props} />
    }
  }
}

export const Dashboard = () => {
  return (
    <div>
      <Navbar/>
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
