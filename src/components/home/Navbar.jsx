import styles from '../styleComponents/Navbar.module.scss'
import { Link } from 'react-router-dom'
import pantera from '../../imgs/pantera.png'

export function Navbar () {
  return (
    <nav>
      <div className={styles.nav_container}>
        <ul>
        <Link to="/" className={styles.LogoName}><img src={pantera} alt="" width="50" /> <h3>Centro de Cómputo</h3></Link>
        </ul>
        <ul>
          <Link to="/login" className={styles.Link}>Login<i className='fa-regular fa-user'/></Link>
        </ul>
      </div>
    </nav>
  )
}
