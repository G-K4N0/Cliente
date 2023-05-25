export const convertStringToTime = (stringTime) => {
  const partsTime = stringTime.split(':')

  const date = new Date()

  date.setHours(parseInt(partsTime[0]))
  date.setMinutes(parseInt(partsTime[1]))

  return date.toLocaleTimeString('es-MX')
}
