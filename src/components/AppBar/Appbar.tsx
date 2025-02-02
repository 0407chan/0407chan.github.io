import React from 'react'
import styles from './AppBar.module.scss'

const AppBar: React.FC = () => {
  return (
    <div className={styles.appBar}>
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

export default AppBar
