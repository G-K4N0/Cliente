import { useState, useEffect } from 'react'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate.js'
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts'

const color = { naranja: '#FF6D00', rojo: '#95A5A6', verde: '#FFFF00', darkblue: '#00008B' }

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    payload,
    percent,
    value
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
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={color.rojo}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={color.rojo}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={color.naranja}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={color.naranja}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={color.naranja} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill={color.verde}
      >{`Registros ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill={color.verde}
      >
        {`Uso ${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  )
}

export const RegistrosByLabs = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const axiosPrivate = useAxiosPrivate()
  const [reportes, setReportes] = useState([])
  const onPieEnter = (_, index) => {
    setActiveIndex(index)
  }

  useEffect(() => {
    axiosPrivate
      .get('/registros/conteo/labs')
      .then((response) => {
        setReportes(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [axiosPrivate])

  return reportes == null
    ? (
    <p>Cargando...</p>
      )
    : (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400} title="Laboratorios">
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={reportes}
          cx="50%"
          cy="50%"
          innerRadius={100}
          outerRadius={120}
          fill={color.darkblue}
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
      )
}
