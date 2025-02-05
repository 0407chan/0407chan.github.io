import { Menu } from '@mantine/core'
import Horizontal from 'components/Horizontal'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import styles from './AppBar.module.scss'

const TIME_FORMAT = 'M월 D일 (ddd) A H:mm:ss'

const AppBar: React.FC = () => {
  const [time, setTime] = useState(dayjs().format(TIME_FORMAT))

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(dayjs().add(1, 'second').format(TIME_FORMAT))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <Horizontal className={styles.appBar}>
      <Horizontal className={styles.menu}>
        <Menu
          width={250}
          position="bottom"
          classNames={{
            item: styles.option
          }}
          styles={{
            dropdown: {
              backgroundColor: 'rgba(236, 235, 238, 0.8)',
              border: '1px solid #A19F9D',
              backdropFilter: 'blur(10px)',
              boxShadow:
                '0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.08)'
            }
          }}
        >
          <Menu.Target>
            <span style={{ fontWeight: 'bold' }}>Chanho</span>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item value="이 Chanho에 관하여">이 Chanho에 관하여</Menu.Item>
            <Menu.Divider />
            <Menu.Item value="시스템 설정...">시스템 설정...</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Horizontal>

      <Horizontal>
        <span>{time}</span>
      </Horizontal>
    </Horizontal>
  )
}

export default AppBar
