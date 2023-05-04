import './CurrentCard.scss'
export const CurrentCard = ({ imagen, materia, docente, inicio, fin }) => {
  return (
    <div className='currentProperties container-fluid'>
      <div className='image-container'>
        <img className='image container-fluid' src={imagen} alt='Perfil docente'/>
      </div>
      <div className='titulo'>
        <p>{docente}</p>
      </div>
      <div className='titulo'>
        <p>{materia}</p>
      </div>
      <div className='titulo'>
        <p>{inicio} - {fin}</p>
      </div>
    </div>
  )
}
