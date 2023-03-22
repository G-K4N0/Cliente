import { useEffect, useState } from 'react'
import { getAllLabsRequest } from '../../../services/usarLab.js'
export function Labs () {
  const [labs, setLabs] = useState([])

  useEffect(() => {
    const getLabs = async () => {
      const datosLabs = await getAllLabsRequest()
      setLabs(datosLabs.data)
    }
    getLabs()
  }, [])
  return (
  <div>
    {labs.map(lab => (
      <h1 key={lab.id} > { lab.name }</h1>
    ))}
  </div>)
}
