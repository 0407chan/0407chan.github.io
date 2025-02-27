import Modal from 'components/Modal'
import { STORAGE_KEYS } from 'constants/storage'
import { useStorageState } from 'hooks/useStorageState'
import React, { useCallback, useEffect, useState } from 'react'
import { ModalConfig, ModalContext, ModalOpenConfig } from './ModalContext'
import { MODAL_CONFIGS, MODAL_TITLES, ModalCategory } from './modalDefinitions'

const generateId = () =>
  `modal-${Date.now()}-${Math.random().toString(36).slice(2)}`

interface ModalProviderProps {
  children: React.ReactNode
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modals, setModals] = useState<{ [key: string]: ModalConfig }>({})
  const [focusedId, setFocusedId] = useState<string | null>(null)
  const { state: modalPositions, setState: setModalPositions } =
    useStorageState<{
      [key in ModalCategory]?: { x: number; y: number }
    }>({
      storageKey: STORAGE_KEYS.MODAL_POSITIONS,
      initialValue: {},
      storageType: 'local'
    })
  const [singletonModals, setSingletonModals] = useState<{
    [key in ModalCategory]?: string
  }>({})

  // 모달 설정을 매 렌더링마다 갱신
  const updatedModals = Object.entries(modals).reduce((acc, [id, modal]) => {
    const modalConfig = MODAL_CONFIGS[modal.category]
    acc[id] = {
      ...modal,
      title: modal.title || MODAL_TITLES[modal.category],
      className: `${modalConfig.defaultClassName || ''} ${
        modal.className || ''
      }`
    }
    return acc
  }, {} as typeof modals)

  // 모달 설정이 변경된 경우에만 상태 업데이트
  useEffect(() => {
    if (JSON.stringify(modals) !== JSON.stringify(updatedModals)) {
      setModals(updatedModals)
    }
  }, [])

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

  const saveModalPosition = useCallback(
    (category: ModalCategory, position: { x: number; y: number }) => {
      setModalPositions((prev) => ({
        ...prev,
        [category]: position
      }))
    },
    []
  )

  const openModal = useCallback(
    (config: ModalOpenConfig) => {
      const modalConfig = MODAL_CONFIGS[config.category]
      const isSingleton = modalConfig.isSingleton ?? true

      // 싱글톤 모달 처리
      if (isSingleton) {
        const existingId = singletonModals[config.category]
        if (existingId && modals[existingId]) {
          focusModal(existingId)
          return existingId
        }
      }

      const id = generateId()
      const newZIndex = getTopZIndex()

      // content를 함수로 변환
      const contentFactory =
        typeof config.content === 'function'
          ? config.content
          : () => config.content

      // 이전 위치 정보 확인
      const savedPosition = modalPositions[config.category]

      // 싱글톤 모달인 경우 ID 저장
      if (isSingleton) {
        setSingletonModals((prev) => ({
          ...prev,
          [config.category]: id
        }))
      }

      const newModal: ModalConfig = {
        id,
        category: config.category,
        contentFactory: contentFactory as () => React.ReactNode,
        title: config.title || MODAL_TITLES[config.category],
        className: `${modalConfig.defaultClassName || ''} ${
          config.className || ''
        }`,
        initialPosition: savedPosition || config.initialPosition,
        disableMaximize: config.disableMaximize,
        disableMinimize: config.disableMinimize,
        zIndex: newZIndex
      }

      setModals((prev) => ({
        ...prev,
        [id]: newModal
      }))
      setFocusedId(id)
      return id
    },
    [getTopZIndex, focusModal, modals, modalPositions]
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
      const modalConfig = MODAL_CONFIGS[modalToClose.category]
      const isSingleton = modalConfig.isSingleton ?? true
      if (isSingleton) {
        setSingletonModals((prev) => {
          const newSingletonModals = { ...prev }
          delete newSingletonModals[modalToClose.category]
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
        getTopZIndex,
        saveModalPosition
      }}
    >
      {children}
      {Object.entries(modals).map(([id, modalConfig]) => {
        const config = MODAL_CONFIGS[modalConfig.category]
        return (
          <Modal
            key={modalConfig.id}
            modalId={modalConfig.id}
            {...modalConfig}
            style={{ zIndex: modalConfig.zIndex }}
            isFocused={focusedId === modalConfig.id}
            initialPosition={modalConfig.initialPosition}
            category={modalConfig.category}
            title={modalConfig.title || MODAL_TITLES[modalConfig.category]}
            className={`${config.defaultClassName || ''} ${
              modalConfig.className || ''
            }`}
          >
            {modalConfig.contentFactory()}
          </Modal>
        )
      })}
    </ModalContext.Provider>
  )
}
