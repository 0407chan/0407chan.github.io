export enum ModalType {
  SETTINGS = 'SETTINGS',
  PROJECT_INFO = 'PROJECT_INFO',
  PROFILE = 'PROFILE',

  PROJECT_MONOTASK = 'PROJECT_MONOTASK',
  PROJECT_RESPRING = 'PROJECT_RESPRING',
  PROJECT_ZEMO = 'PROJECT_ZEMO'
  // 새로운 모달 타입을 여기에 추가
}

export const MODAL_TITLES = {
  [ModalType.SETTINGS]: '시스템 설정',
  [ModalType.PROJECT_INFO]: '프로젝트 설명',
  [ModalType.PROFILE]: '프로필',
  [ModalType.PROJECT_MONOTASK]: 'Monotask',
  [ModalType.PROJECT_RESPRING]: 'Respring',
  [ModalType.PROJECT_ZEMO]: 'Zemo'
} as const

interface ModalTypeConfig {
  isSingleton?: boolean // true인 경우 해당 타입의 모달은 한 번에 하나만 열 수 있음 (기본값: true)
  defaultClassName?: string // 해당 타입의 모달에 기본적으로 적용될 클래스
}

// 특별한 설정이 필요한 모달만 여기에 정의
const MODAL_CUSTOM_CONFIGS: Partial<Record<ModalType, ModalTypeConfig>> = {
  // 예시: 여러 개의 인스턴스가 필요한 모달
  // [ModalType.SOME_MODAL]: {
  //   isSingleton: false
  // }
}

// 모든 모달 타입에 대한 기본 설정을 자동으로 생성하고,
// 특별한 설정이 필요한 모달은 오버라이드
export const MODAL_CONFIGS: Record<ModalType, ModalTypeConfig> = Object.values(
  ModalType
).reduce(
  (configs, modalType) => ({
    ...configs,
    [modalType]: {
      ...{}, // 기본 설정
      ...MODAL_CUSTOM_CONFIGS[modalType] // 특별한 설정이 있다면 오버라이드
    }
  }),
  {} as Record<ModalType, ModalTypeConfig>
)
