import clsx from 'clsx'
import { ModalCategory } from 'contexts/modal/modalDefinitions'
import { useModal } from 'contexts/modal/useModal'
import React, { useEffect, useRef, useState } from 'react'
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
  initialPosition?: { x: number; y: number }
  category: ModalCategory
}

const Modal: React.FC<ModalProps> = ({
  modalId,
  title,
  children,
  className,
  style,
  isFocused = true,
  disableMaximize = false,
  disableMinimize = false,
  initialPosition,
  category
}) => {
  const { closeModal, focusModal, saveModalPosition } = useModal()
  const modalRef = useRef<HTMLDivElement>(null)
  const [modalSize, setModalSize] = useState({ width: 0, height: 0 })
  const [isPositioned, setIsPositioned] = useState(false)
  const [position, setPosition] = useState(() => {
    if (initialPosition) {
      setIsPositioned(true)
      return initialPosition
    }

    return {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    }
  })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // 모달 크기 측정
  useEffect(() => {
    if (modalRef.current) {
      const { width, height } = modalRef.current.getBoundingClientRect()
      setModalSize({ width, height })

      // 초기 위치가 지정되지 않은 경우 중앙 정렬
      if (!initialPosition) {
        setPosition({
          x: window.innerWidth / 2 - width / 2,
          y: window.innerHeight / 2 - height / 2
        })
        setIsPositioned(true)
      }
    }
  }, [initialPosition])

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
      const maxX = window.innerWidth - modalSize.width
      const maxY = window.innerHeight - modalSize.height

      const newPosition = {
        x: Math.min(Math.max(0, newX), maxX),
        y: Math.min(Math.max(0, newY), maxY)
      }

      setPosition(newPosition)
      saveModalPosition(category, newPosition)
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
      ref={modalRef}
      className={clsx(styles.modal, className, {
        [styles.focused]: isFocused
      })}
      style={{
        visibility: isPositioned ? 'visible' : 'hidden',
        top: `${position.y}px`,
        left: `${position.x}px`,
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
