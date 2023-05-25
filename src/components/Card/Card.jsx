import React from 'react'
import styles from '../styleComponents/Card.module.scss'
import { Details } from './Details'
export function Card ({
  laboratorio,
  materia,
  inicio,
  fin,
  grupo,
  semestre,
  status,
  imagen,
  carrera,
  usuario
}) {
  const ocupado = (status === 0) ? 'Libre' : 'Ocupado'
  return (
    <div className={`container-fluid ${styles.cardContainer}`}>
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
      {ocupado === 'Libre'
        ? (
        <div className={styles.desOcupado}>
          <p>{ocupado}</p>
        </div>
          )
        : (
        <div className={styles.ocupado}>
          <p>{ocupado}</p>
        </div>
          )}
      <div className={styles.cardCareer}>
        <p>{carrera}</p>
      </div>
    </div>
  )
}
