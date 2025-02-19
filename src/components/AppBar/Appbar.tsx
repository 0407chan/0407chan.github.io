import { Menu } from '@mantine/core'
import Horizontal from 'components/Horizontal'
import Vertical from 'components/Vertical'
import { ModalCategory } from 'contexts/modal/modalDefinitions'
import { useModal } from 'contexts/modal/useModal'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import styles from './AppBar.module.scss'

const TIME_FORMAT = 'M월 D일 (ddd) A H:mm:ss'

const AppBar: React.FC = () => {
  const [time, setTime] = useState(dayjs().format(TIME_FORMAT))
  const { openModal } = useModal()

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
              backgroundColor: '#efefefe7',
              border: '0.5px solid #A4A4A4',
              backdropFilter: 'blur(10px)',
              boxShadow:
                '0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.08), inset 0 0px 1px rgba(255, 255, 255, 0.3)'
            }
          }}
        >
          <Menu.Target>
            <span style={{ fontWeight: 'bold' }}>Chanho</span>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              value="이 Chanho에 관하여"
              onClick={() =>
                openModal({
                  category: ModalCategory.PROFILE,
                  disableMinimize: true,
                  disableMaximize: true,
                  content: (
                    <Vertical>
                      이찬호에 관하여
                      <Vertical>반가워요</Vertical>
                      <Vertical>반가워요</Vertical>
                      <Vertical>반가워요</Vertical>
                    </Vertical>
                  )
                })
              }
            >
              이 Chanho에 관하여
            </Menu.Item>
            <Menu.Divider style={{ borderColor: '#BEB9B4' }} />
            <Menu.Item
              value="시스템 설정..."
              onClick={() =>
                openModal({
                  category: ModalCategory.SETTINGS,
                  content: (
                    <Vertical>
                      안녕하세요?
                      <Vertical>반가워요</Vertical>
                      <Vertical>반가워요</Vertical>
                      <Vertical>반가워요</Vertical>
                      <Vertical>반가워요</Vertical>
                    </Vertical>
                  )
                })
              }
            >
              시스템 설정...
            </Menu.Item>
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
