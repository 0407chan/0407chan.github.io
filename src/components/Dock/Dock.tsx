import { DefaultMantineColor, Tooltip, TransitionProps } from '@mantine/core'
import { IMAGES } from 'constants/image'
import styles from './Dock.module.scss'

const COMMON_TOOLTIP_PROPS = {
  color: 'rgba(246,246,246,0.9)' as DefaultMantineColor,
  withArrow: true as boolean,
  transitionProps: {
    transition: 'fade',
    duration: 0
  } as Partial<Omit<TransitionProps, 'mounted'>>,
  styles: {
    tooltip: {
      color: '#000',
      backgroundColor: 'rgba(246,246,246,0.9)'
    }
  }
}
const Dock = () => {
  return (
    <div className={styles.dock}>
      <Tooltip label="Monotask" {...COMMON_TOOLTIP_PROPS}>
        <div className={styles.icon}>
          <img src={IMAGES.SERVICE.MONOTASK} alt="monotask" />
        </div>
      </Tooltip>
      <Tooltip label="Respring" {...COMMON_TOOLTIP_PROPS}>
        <div className={styles.icon}>
          <img src={IMAGES.SERVICE.RESPRING} alt="respring" />
        </div>
      </Tooltip>
      <Tooltip label="Zemo" {...COMMON_TOOLTIP_PROPS}>
        <div className={styles.icon}>
          <img src={IMAGES.SERVICE.ZEMO} alt="zemo" />
        </div>
      </Tooltip>
    </div>
  )
}

export default Dock
