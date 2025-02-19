import clsx from 'clsx'
import React, { createContext, useContext } from 'react'
import styles from '../styles/ModalContent.module.scss'

interface ModalContentContextType {}

const ModalContentContext = createContext<ModalContentContextType | null>(null)

const useModalContent = () => {
  const context = useContext(ModalContentContext)
  if (!context) {
    throw new Error(
      'ModalContent.* components must be used within ModalContent'
    )
  }
  return context
}

interface ModalContentCommonProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

interface ModalContentProps extends ModalContentCommonProps {}

interface ModalContentComponent extends React.FC<ModalContentProps> {
  Sidebar: React.FC<ModalContentCommonProps>
  Main: React.FC<ModalContentCommonProps>
}

const Sidebar: React.FC<ModalContentCommonProps> = ({
  children,
  className,
  style
}) => {
  return (
    <div className={clsx(styles.sidebar, className)} style={style}>
      {children}
    </div>
  )
}

const Main: React.FC<ModalContentCommonProps> = ({
  children,
  className,
  style
}) => {
  return (
    <div className={clsx(styles.main, className)} style={style}>
      {children}
    </div>
  )
}
const ModalContent: ModalContentComponent = ({
  children,
  className,
  style
}) => {
  return (
    <ModalContentContext.Provider value={{}}>
      <div className={clsx(styles.content, className)} style={style}>
        {children}
      </div>
    </ModalContentContext.Provider>
  )
}

ModalContent.Sidebar = Sidebar
ModalContent.Main = Main

export default ModalContent
