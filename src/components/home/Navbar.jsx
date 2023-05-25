import React from 'react'
import { Button, Popover, OverlayTrigger, Navbar } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import { Link, useNavigate } from 'react-router-dom'
import pantera from '../../imgs/pantera.png'
import Nav from 'react-bootstrap/Nav'
import styles from '../styleComponents/BarraNavegacion.module.scss'
import popstyle from './Pop.module.scss'
import { useLogOut } from '../../hooks/useLogOut'

export function BarraNavegacion ({ user, login }) {
  const navigate = useNavigate()
  const logOut = useLogOut()
  const logout = async () => {
    try {
      await logOut()
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  const popover = (
    <Popover id="popover-user" className={popstyle.pop} variant='dark'>
      <Popover.Body>
        <div>
          <strong>Usuario </strong>
          <span>{user}</span>
        </div>
        <div>
          <Button variant='primary' onClick={logout} >Cerrar sesión</Button>
        </div>
      </Popover.Body>
    </Popover>
  )

  return (
    <>
      <Navbar className={styles.nav_container} variant="dark" expand="sm">
        <Container fluid>
          <Navbar.Brand>
            <img
              src={pantera}
              width="50"
              className="d-inline-block align-left"
              alt=""
            />
            <Link to="/" className={styles.Link}>
              Centro de Cómputo
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              {user
                ? (
                <OverlayTrigger
                  trigger="focus"
                  placement="bottom"
                  overlay={popover}
                >
                  <Nav.Link className={styles.Link}>{user}</Nav.Link>
                </OverlayTrigger>
                  )
                : (
                <Link to="/login" className={styles.Link}>
                  {login}
                </Link>
                  )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
