import clsx from 'clsx'
import { useModal } from 'contexts/modal/useModal'
import React, { useEffect, useState } from 'react'
import styles from './Modal.module.scss'

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
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // 모달이 처음 마운트될 때 중앙 정렬
    setPosition({
      x: window.innerWidth / 2 - 250,
      y: window.innerHeight / 2 - 150
    })
  }, [])

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
      <div className={styles.header} onMouseDown={handleMouseDown}>
        <div className={styles.controls}>
          <button
            className={clsx(styles.button, styles.close)}
            onClick={() => closeModal(modalId)}
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
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default Modal
