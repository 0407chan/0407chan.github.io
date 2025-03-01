import { ModalCategory } from 'contexts/modal/modalDefinitions'

export type Project = {
  id: string
  name: string
  description?: string
  image?: string
  category: ModalCategory
}
