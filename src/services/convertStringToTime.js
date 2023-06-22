export const convertStringToTime = (stringTime) => {
  const partsTime = stringTime.split(':')
  const partsMinutesAndPM = partsTime[1].split(' ')
  const date = new Date()

  let hora = parseInt(partsTime[0])
  const minuto = parseInt(partsMinutesAndPM[0])

  if (partsMinutesAndPM[1] === 'PM' && hora < 12) {
    hora += 12
  } else if (partsMinutesAndPM[1] === 'AM' && hora === 12) {
    hora = 0
  }

  date.setHours(parseInt(hora))
  date.setMinutes(parseInt(minuto))

  return date.toLocaleTimeString('es-MX')
}

export const convertStringToDate = (stringDate) => {
  const date = new Date(stringDate)

  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDay()

  return `${day}/${month}/${year}`
}
