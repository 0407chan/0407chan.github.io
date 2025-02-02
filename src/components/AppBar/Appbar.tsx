import Horizontal from 'components/Horizontal'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import styles from './AppBar.module.scss'

const TIME_FORMAT = 'M월 D일 (ddd) A H:mm:ss'

const AppBar: React.FC = () => {
  const [time, setTime] = useState(dayjs().format(TIME_FORMAT))

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(dayjs().format(TIME_FORMAT))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <Horizontal className={styles.appBar}>
      <Horizontal className={styles.menu}>
        <span style={{ fontWeight: 'bold' }}>Chanho</span>
      </Horizontal>

      <Horizontal>
        <span>{time}</span>
      </Horizontal>
    </Horizontal>
  )
}

export default AppBar
