import React from 'react'
import styles from '../styleComponents/Card.module.scss'
import { Details } from './Details'
export function Card ({ id, laboratorio, materia, inicio, fin, grupo, semestre, status, imagen, carrera, usuario }) {
  return (
    <div id={id} className={styles.cardContainer}>
      <div className={styles.nameLab}>
        <h1>{laboratorio}</h1>
      </div>
      <div className={styles.materiaName}>
        <h3>{materia}</h3>
      </div>
      <Details
        inicio={inicio}
        fin={fin}
        grupo={grupo}
        semestre={semestre}
        status={status}
        usuario={usuario}
        imagen={imagen}
      />
      <div className={styles.ocupado}>
          <p>Ocupado</p>
        </div>
        <div className={styles.cardCareer}>
        <p>{carrera}</p>
        </div>
    </div>
  )
}
