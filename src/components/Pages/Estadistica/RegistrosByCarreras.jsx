import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { useState, useEffect } from 'react'
const color = { amarillo: '#FFFF00', rojo: '#E53935', verde: '#76FF03' }
const RADIAN = Math.PI / 180

const renderCustomizedLabel = (props) => {
  const {
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    payload
  } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
    <path
      d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
      stroke={color.amarillo}
      fill="none"
    />
    <circle cx={ex} cy={ey} r={2} fill={color.amarillo} stroke="none" />
    <text
      x={ex + (cos >= 0 ? 1 : -1) * 12}
      y={ey}
      textAnchor={textAnchor}
      fill={color.verde}
    >{`${payload.name}`}</text>
    <text
      x={ex + (cos >= 0 ? 1 : -1) * 12}
      y={ey}
      dy={18}
      textAnchor={textAnchor}
      fill={color.verde}
    >
      {`${(percent * 100).toFixed(2)}%`}
    </text>
  </g>
  )
}

export const RegistrosByCarreras = ({ colores }) => {
  const [data, setData] = useState([])
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    axiosPrivate
      .get('/registros/conteo/carreras')
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [axiosPrivate])

  return (
    <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400} title='Carreras' >
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
  )
}
