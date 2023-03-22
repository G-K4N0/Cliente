import React from 'react'
import styles from '../styleComponents/Card.module.scss'
import { Details } from './Details'
export function Card (props) {
  return (
    <div id={props.id} className={styles.cardContainer}>
      <div className={styles.nameLab}>
        <h1>{ props.laboratorio }</h1>
      </div>
      <div className={styles.materiaName}>
        <h3>{ props.materia}</h3>
      </div>
      <Details
      inicio= {props.inicio}
      fin= { props.fin }
      grupo = { props.grupo }
      semestre = { props.semestre }
      status = { props.status }
      usuario = { props.usuario }
      imagen = { props.imagenv}
      />
      <h2 className={styles.cardCareer} >{ props.carrera }</h2>
    </div>
  )
}
