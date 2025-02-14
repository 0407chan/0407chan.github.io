import Modal from 'components/Modal'
import React, { useCallback, useState } from 'react'
import { ModalConfig, ModalContext } from './ModalContext'
import { MODAL_CONFIGS, MODAL_TITLES, ModalType } from './modalTypes'

const generateId = () =>
  `modal-${Date.now()}-${Math.random().toString(36).slice(2)}`

interface ModalProviderProps {
  children: React.ReactNode
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modals, setModals] = useState<{ [key: string]: ModalConfig }>({})
  const [focusedId, setFocusedId] = useState<string | null>(null)
  const [singletonModals, setSingletonModals] = useState<{
    [key in ModalType]?: string
  }>({})

  const getTopZIndex = useCallback(() => {
    const modalCount = Object.keys(modals).length
    return 2000 + modalCount
  }, [modals])

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

  const openModal = useCallback(
    (
      config: Omit<ModalConfig, 'id' | 'zIndex' | 'type'> & { type: ModalType }
    ) => {
      const modalConfig = MODAL_CONFIGS[config.type]

      // 싱글톤 모달 처리
      if (modalConfig.isSingleton) {
        const existingId = singletonModals[config.type]
        if (existingId && modals[existingId]) {
          focusModal(existingId)
          return existingId
        }
      }

      const id = generateId()
      const newZIndex = getTopZIndex()

      // 싱글톤 모달인 경우 ID 저장
      if (modalConfig.isSingleton) {
        setSingletonModals((prev) => ({
          ...prev,
          [config.type]: id
        }))
      }

      setModals((prev) => ({
        ...prev,
        [id]: {
          ...config,
          id,
          zIndex: newZIndex,
          title: config.title || MODAL_TITLES[config.type],
          className: `${modalConfig.defaultClassName || ''} ${
            config.className || ''
          }`
        }
      }))
      setFocusedId(id)
      return id
    },
    [getTopZIndex, focusModal, modals]
  )

  const closeModal = useCallback(
    (id: string) => {
      const modalToClose = modals[id]
      if (!modalToClose) return

      setModals((prev) => {
        const newModals = { ...prev }
        delete newModals[id]
        return newModals
      })

      // 싱글톤 모달인 경우 ID 제거
      if (MODAL_CONFIGS[modalToClose.type].isSingleton) {
        setSingletonModals((prev) => {
          const newSingletonModals = { ...prev }
          delete newSingletonModals[modalToClose.type]
          return newSingletonModals
        })
      }

      setFocusedId(null)
    },
    [modals]
  )

  const closeAllModals = useCallback(() => {
    setModals({})
    setSingletonModals({})
    setFocusedId(null)
  }, [])

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
