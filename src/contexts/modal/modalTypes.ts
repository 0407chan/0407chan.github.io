export enum ModalType {
  SETTINGS = 'SETTINGS',
  PROJECT_INFO = 'PROJECT_INFO',
  PROFILE = 'PROFILE'
  // 새로운 모달 타입을 여기에 추가
}

export const MODAL_TITLES = {
  [ModalType.SETTINGS]: '시스템 설정',
  [ModalType.PROJECT_INFO]: '프로젝트 설명',
  [ModalType.PROFILE]: '프로필'
} as const

interface ModalTypeConfig {
  isSingleton: boolean // true인 경우 해당 타입의 모달은 한 번에 하나만 열 수 있음
  defaultClassName?: string // 해당 타입의 모달에 기본적으로 적용될 클래스
}

export const MODAL_CONFIGS: Record<ModalType, ModalTypeConfig> = {
  [ModalType.SETTINGS]: {
    isSingleton: true
  },
  [ModalType.PROJECT_INFO]: {
    isSingleton: true
  },
  [ModalType.PROFILE]: {
    isSingleton: true
  }
}
