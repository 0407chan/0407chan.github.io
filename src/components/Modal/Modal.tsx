import clsx from 'clsx'
import { useModal } from 'contexts/modal/useModal'
import React, { useEffect, useState } from 'react'
import ModalHeader from './components/ModalHeader'
import styles from './styles/Modal.module.scss'

interface ModalProps {
  modalId: string
  title?: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  isFocused?: boolean
  disableMaximize?: boolean
  disableMinimize?: boolean
}

const Modal: React.FC<ModalProps> = ({
  modalId,
  title,
  children,
  className,
  style,
  isFocused = true,
  disableMaximize = false,
  disableMinimize = false
}) => {
  const { closeModal, focusModal } = useModal()
  const [position, setPosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
    focusModal(modalId)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y

      // 화면 경계 체크
      const maxX = window.innerWidth - 500 // 모달의 너비
      const maxY = window.innerHeight - 300 // 모달의 높이

      setPosition({
        x: Math.min(Math.max(0, newX), maxX),
        y: Math.min(Math.max(0, newY), maxY)
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  return (
    <div
      className={clsx(styles.modal, className, {
        [styles.focused]: isFocused
      })}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        ...style
      }}
      onClick={() => focusModal(modalId)}
    >
      <ModalHeader
        title={title}
        onClose={() => closeModal(modalId)}
        onMouseDown={handleMouseDown}
        disableMaximize={disableMaximize}
        disableMinimize={disableMinimize}
      />
      {children}
    </div>
  )
}

export default Modal
