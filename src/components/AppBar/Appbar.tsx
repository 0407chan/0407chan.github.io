import { Combobox, useCombobox } from '@mantine/core'
import Horizontal from 'components/Horizontal'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import styles from './AppBar.module.scss'

const TIME_FORMAT = 'M월 D일 (ddd) A H:mm:ss'

const AppBar: React.FC = () => {
  const [time, setTime] = useState(dayjs().format(TIME_FORMAT))
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption()
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(dayjs().add(1, 'second').format(TIME_FORMAT))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <Horizontal className={styles.appBar}>
      <Horizontal className={styles.menu}>
        <Combobox
          store={combobox}
          width={250}
          position="bottom"
          classNames={{
            option: styles.option
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
          onOptionSubmit={(val) => {
            setSelectedItem(val)
            combobox.closeDropdown()
          }}
        >
          <Combobox.Target>
            <span
              style={{ fontWeight: 'bold' }}
              onClick={() => combobox.toggleDropdown()}
            >
              Chanho
            </span>
          </Combobox.Target>

          <Combobox.Dropdown>
            <Combobox.Options>
              <Combobox.Option value="이 chanho에 관하여">
                이 chanho에 관하여
              </Combobox.Option>
              <Combobox.Group label=" ">
                <Combobox.Option value="시스템 설정...">
                  시스템 설정...
                </Combobox.Option>
              </Combobox.Group>
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
      </Horizontal>

      <Horizontal>
        <span>{time}</span>
      </Horizontal>
    </Horizontal>
  )
}

export default AppBar
