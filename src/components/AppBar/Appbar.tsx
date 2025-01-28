import React from 'react'
import styles from './Appbar.module.scss'

const Appbar: React.FC = () => {
  return (
    <div className={styles.appbar}>
      {/* Appbar content will go here */}
      <div className={styles.menu}>
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Go</span>
        <span>Window</span>
        <span>Help</span>
      </div>
    </div>
  )
}

export default Appbar
