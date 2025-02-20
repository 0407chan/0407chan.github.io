import { createContext } from 'react'
import { ModalCategory } from './modalDefinitions'

export interface ModalConfig {
  id: string
  category: ModalCategory
  title?: string
  contentFactory: () => React.ReactNode
  className?: string
  zIndex?: number
  initialPosition?: { x: number; y: number }
  disableMaximize?: boolean
  disableMinimize?: boolean
}

export interface ModalContentProps {
  category: ModalCategory
  modalId: string
}

export interface ModalOpenConfig {
  category: ModalCategory
  content: React.ReactNode | (() => React.ReactNode)
  title?: string
  className?: string
  initialPosition?: { x: number; y: number }
  disableMaximize?: boolean
  disableMinimize?: boolean
}

interface ModalContextType {
  openModal: (config: ModalOpenConfig) => string
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
