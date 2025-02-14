import React, { createContext } from 'react'
import { ModalType } from './modalTypes'

export interface ModalConfig {
  id: string
  type: ModalType
  title?: string
  content: React.ReactNode
  className?: string
  zIndex?: number
}

interface ModalContextType {
  openModal: (
    config: Omit<ModalConfig, 'id' | 'zIndex' | 'type'> & { type: ModalType }
  ) => string
  closeModal: (id: string) => void
  closeAllModals: () => void
  focusModal: (id: string) => void
  getTopZIndex: () => number
}

export const ModalContext = createContext<ModalContextType>({
  openModal: () => '',
  closeModal: () => {},
  closeAllModals: () => {},
  focusModal: () => {},
  getTopZIndex: () => 2000
})
