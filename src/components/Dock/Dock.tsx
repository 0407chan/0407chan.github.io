import { DefaultMantineColor, Tooltip, TransitionProps } from '@mantine/core'
import ModalContent from 'components/Modal/components/ModalContent'
import { IMAGES } from 'constants/image'
import { ModalCategory } from 'contexts/modal/modalDefinitions'
import { useModal } from 'contexts/modal/useModal'
import styles from './Dock.module.scss'

const COMMON_TOOLTIP_PROPS = {
  color: 'rgba(246,246,246,0.9)' as DefaultMantineColor,
  withArrow: true as boolean,
  transitionProps: {
    transition: 'fade',
    duration: 0
  } as Partial<Omit<TransitionProps, 'mounted'>>,
  styles: {
    tooltip: {
      color: '#000',
      backgroundColor: 'rgba(246,246,246,0.9)'
    }
  }
}
const Dock = () => {
  const { openModal } = useModal()
  return (
    <div className={styles.dock}>
      <Tooltip label="Monotask" {...COMMON_TOOLTIP_PROPS}>
        <div
          className={styles.icon}
          onClick={() =>
            openModal({
              category: ModalCategory.PROJECT_MONOTASK,
              content: (
                <ModalContent>
                  <ModalContent.Sidebar>
                    <div>사이드바</div>
                    <div>사이드바</div>
                    <div>사이드바</div>
                    <div>사이드바</div>
                    <div>사이드바</div>
                    <div>사이드바</div>
                    <div>사이드바</div>
                    <div>사이드바</div>
                    <div>사이드바</div>
                    <div>사이드바</div>
                    <div>사이드바</div>
                    <div>사이드바</div>
                    <div>사이드바</div>
                    <div>사이드바</div>
                    <div>사이드바</div>
                    <div>사이드바</div>
                    <div>사이드바</div>
                  </ModalContent.Sidebar>
                  <ModalContent.Main>
                    <div>메인</div>
                    <div>메인</div>
                    <div>메인</div>
                    <div>메인</div>
                    <div>메인</div>
                    <div>메인</div>
                    <div>메인</div>
                    <div>메인</div>
                    <div>메인</div>
                    <div>메인</div>
                    <div>메인</div>
                    <div>메인</div>
                    <div>메인</div>
                    <div>메인</div>
                    <div>메인</div>
                    <div>메인</div>
                    <div>메인</div>
                    <div>메인</div>
                  </ModalContent.Main>
                </ModalContent>
              )
            })
          }
        >
          <img src={IMAGES.SERVICE.MONOTASK} alt="monotask" />
        </div>
      </Tooltip>
      <Tooltip label="Respring" {...COMMON_TOOLTIP_PROPS}>
        <div
          className={styles.icon}
          onClick={() =>
            openModal({
              category: ModalCategory.PROJECT_RESPRING,
              content: <ModalContent>test</ModalContent>
            })
          }
        >
          <img src={IMAGES.SERVICE.RESPRING} alt="respring" />
        </div>
      </Tooltip>
      <Tooltip label="Zemo" {...COMMON_TOOLTIP_PROPS}>
        <div
          className={styles.icon}
          onClick={() =>
            openModal({
              category: ModalCategory.PROJECT_ZEMO,
              content: <ModalContent>test</ModalContent>
            })
          }
        >
          <img src={IMAGES.SERVICE.ZEMO} alt="zemo" />
        </div>
      </Tooltip>
    </div>
  )
}

export default Dock
