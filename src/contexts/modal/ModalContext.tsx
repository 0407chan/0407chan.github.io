import React, { createContext } from 'react'
import { ModalCategory } from './modalDefinitions'

export interface ModalConfig {
  id: string
  category: ModalCategory
  title?: string
  content: React.ReactNode
  className?: string
  zIndex?: number

  disableMaximize?: boolean
  disableMinimize?: boolean
}

interface ModalContextType {
  openModal: (
    config: Omit<ModalConfig, 'id' | 'zIndex' | 'category'> & {
      category: ModalCategory
    }
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
