import clsx from 'clsx'
import { ModalVariant } from 'contexts/modal/modalDefinitions'
import React from 'react'
import styles from '../styles/ModalContent.module.scss'

interface ModalContentProps {
  children: React.ReactNode
  variant?: ModalVariant
  className?: string
}

const ModalContent: React.FC<ModalContentProps> = ({
  children,
  variant = ModalVariant.DEFAULT,
  className
}) => {
  return (
    <div
      className={clsx(styles.content, className, {
        [styles.expanded]: variant === ModalVariant.EXPANDED
      })}
    >
      {children}
    </div>
  )
}

export default ModalContent
