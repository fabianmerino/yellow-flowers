import { useState, useEffect } from 'react'
import FlipNumbers from 'react-flip-numbers'

function getDiferenceTime() {
  const START_TIME = new Date(2017, 6, 31, 0, 0, 0, 0) // 2017-07-31 00:00:00
  const now = new Date()
  const diff = now.getTime() - START_TIME.getTime()
  // Create date with time zone America/Lima
  const diffDate = new Date(diff + 1000 * 60 * 60 * 5)
  const year = diffDate.getFullYear() - 1970
  const month = diffDate.getMonth()
  const day = diffDate.getDate() - 1
  const hour = diffDate.getHours()
  const minute = diffDate.getMinutes()
  const second = diffDate.getSeconds()

  const years = year > 1 ? 'Años' : 'Año'
  const months = month > 1 ? 'Meses' : 'Mes'
  const days = day > 1 ? 'Días' : 'Día'

  return [
    { digit: year, unit: years, type: 'date' },
    { digit: month, unit: months, type: 'date' },
    { digit: day, unit: days, type: 'date' },
    { digit: hour, unit: 'Horas', type: 'time' },
    { digit: minute, unit: 'Minutos', type: 'time' },
    { digit: second, unit: 'Segundos', type: 'time' },
  ]
}

type DigitProps = {
  digit: number
  unit: string
}

const Digit = ({ digit, unit }: DigitProps) => (
  <div className='flex flex-col justify-center items-center px-2'>
    <div className='px-1 py-2 rounded-2xl mb-1 bg-indigo-700'>
      <FlipNumbers
        play
        color='#fff'
        width={35}
        height={50}
        delay={0.1}
        duration={0.75}
        numbers={digit <= 9 ? `0${digit}` : `${digit}`}
      />
    </div>
    <span className='font-bold text-sm'>{unit.toUpperCase()}</span>
  </div>
)

function CountUp() {
  const [time, setTime] = useState(getDiferenceTime())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getDiferenceTime())
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className='p-5 rounded-2xl flex flex-col md:flex-row gap-4'>
      <div className='flex justify-center'>
        {time
          .filter((t) => t.type === 'date')
          .map((item, index) => (
            <Digit key={index} digit={item.digit} unit={item.unit} />
          ))}
      </div>
      <div className='flex justify-center'>
        {time
          .filter((t) => t.type === 'time')
          .map((item, index) => (
            <Digit key={index} digit={item.digit} unit={item.unit} />
          ))}
      </div>
    </div>
  )
}

export default CountUp
