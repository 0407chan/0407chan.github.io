import clsx from 'clsx'
import React from 'react'
import styles from '../styles/ModalHeader.module.scss'

interface ModalHeaderProps {
  title?: string
  onClose: () => void
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void
  disableMaximize?: boolean
  disableMinimize?: boolean
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  onClose,
  onMouseDown,
  disableMaximize = false,
  disableMinimize = false
}) => {
  return (
    <div className={styles.header} onMouseDown={onMouseDown}>
      <div className={styles.controls}>
        <button
          className={clsx(styles.button, styles.close)}
          onClick={onClose}
        />
        <button
          className={clsx(styles.button, styles.minimize, {
            [styles.disabled]: disableMinimize
          })}
        />
        <button
          className={clsx(styles.button, styles.maximize, {
            [styles.disabled]: disableMaximize
          })}
        />
      </div>
      <div className={styles.title}>{title}</div>
    </div>
  )
}

export default ModalHeader
