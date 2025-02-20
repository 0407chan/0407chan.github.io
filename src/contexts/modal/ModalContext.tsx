import React, { createContext } from 'react'
import { ModalCategory } from './modalDefinitions'

export interface ModalConfig {
  id: string
  category: ModalCategory
  title?: string
  content: React.ReactNode
  className?: string
  zIndex?: number
  initialPosition?: { x: number; y: number }

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
  saveModalPosition: (
    category: ModalCategory,
    position: { x: number; y: number }
  ) => void
}

export const ModalContext = createContext<ModalContextType>({
  openModal: () => '',
  closeModal: () => {},
  closeAllModals: () => {},
  focusModal: () => {},
  getTopZIndex: () => 2000,
  saveModalPosition: () => {}
})
