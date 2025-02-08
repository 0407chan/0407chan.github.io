import Modal from 'components/Modal'
import React, { useCallback, useState } from 'react'
import { ModalConfig, ModalContext } from './ModalContext'

const generateId = () =>
  `modal-${Date.now()}-${Math.random().toString(36).slice(2)}`

interface ModalProviderProps {
  children: React.ReactNode
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modals, setModals] = useState<{ [key: string]: ModalConfig }>({})
  const [focusedId, setFocusedId] = useState<string | null>(null)

  const getTopZIndex = useCallback(() => {
    const modalCount = Object.keys(modals).length
    return 2000 + modalCount
  }, [modals])

  const openModal = useCallback(
    (config: Omit<ModalConfig, 'id' | 'zIndex'>) => {
      const id = generateId()
      const newZIndex = getTopZIndex()

      setModals((prev) => ({
        ...prev,
        [id]: {
          ...config,
          id,
          zIndex: newZIndex
        }
      }))
      setFocusedId(id)
      return id
    },
    [getTopZIndex]
  )

  const closeModal = useCallback((id: string) => {
    setModals((prev) => {
      const newModals = { ...prev }
      delete newModals[id]
      return newModals
    })
    setFocusedId(null)
  }, [])

  const closeAllModals = useCallback(() => {
    setModals({})
    setFocusedId(null)
  }, [])

  const focusModal = useCallback(
    (id: string) => {
      if (modals[id] && focusedId !== id) {
        const newZIndex = getTopZIndex()
        setModals((prev) => ({
          ...prev,
          [id]: {
            ...prev[id],
            zIndex: newZIndex
          }
        }))
        setFocusedId(id)
      }
    },
    [focusedId, getTopZIndex, modals]
  )

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        closeAllModals,
        focusModal,
        getTopZIndex
      }}
    >
      {children}
      {Object.values(modals).map((modalConfig) => (
        <Modal
          key={modalConfig.id}
          modalId={modalConfig.id}
          title={modalConfig.title}
          className={modalConfig.className}
          style={{ zIndex: modalConfig.zIndex }}
          isFocused={focusedId === modalConfig.id}
        >
          {modalConfig.content}
        </Modal>
      ))}
    </ModalContext.Provider>
  )
}
