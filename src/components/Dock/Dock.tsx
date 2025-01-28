import { IMAGES } from 'constants/image'
import styles from './Dock.module.scss'

const Dock = () => {
  return (
    <div className={styles.dock}>
      <div className={styles.icon}>
        <img src={IMAGES.SERVICE.MONOTASK} alt="monotask" />
      </div>
      <div className={styles.icon}>
        <img src={IMAGES.SERVICE.RESPRING} alt="respring" />
      </div>
      <div className={styles.icon}>
        <img src={IMAGES.SERVICE.ZEMO} alt="zemo" />
      </div>
    </div>
  )
}

export default Dock
