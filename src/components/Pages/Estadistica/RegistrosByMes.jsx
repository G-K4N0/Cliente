import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { useState, useEffect } from 'react'

export const RegistrosByMes = ({ colores }) => {
  const [data, setData] = useState([])
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    axiosPrivate
      .get('/registros/conteo/mes')
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [axiosPrivate])

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#1877F2" barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  )
}
