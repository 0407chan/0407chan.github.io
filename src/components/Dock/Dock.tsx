import { DefaultMantineColor, Tooltip, TransitionProps } from '@mantine/core'
import ProjectModal from 'components/modals/ProjectModal'
import { IMAGES } from 'constants/image'
import { ModalCategory } from 'contexts/modal/modalDefinitions'
import { useModal } from 'contexts/modal/useModal'
import { Project } from 'types'
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

const projects: Project[] = [
  {
    id: '1',
    name: 'Monotask',
    description:
      'Monotask is a task management app that helps you stay on top of your tasks. awefawefawjlfkasdjfiawejfpiwaejfipawejfipawjefpiajwepifjweaipfjawepifjawepifjp',
    image: IMAGES.SERVICE.MONOTASK,
    category: ModalCategory.PROJECT_MONOTASK
  },
  {
    id: '2',
    name: 'Respring',
    description:
      'Respring is a task management app that helps you stay on top of your tasks.',
    image: IMAGES.SERVICE.RESPRING,
    category: ModalCategory.PROJECT_RESPRING
  },
  {
    id: '3',
    name: 'Zemo',
    description:
      'Zemo is a task management app that helps you stay on top of your tasks.',
    image: IMAGES.SERVICE.ZEMO,
    category: ModalCategory.PROJECT_ZEMO
  }
]

const Dock = () => {
  const { openModal } = useModal()
  return (
    <div className={styles.dock}>
      {projects.map((project) => (
        <Tooltip label={project.name} {...COMMON_TOOLTIP_PROPS}>
          <div
            key={project.id}
            className={styles.icon}
            onClick={() =>
              openModal({
                category: project.category,
                content: <ProjectModal project={project} />
              })
            }
          >
            <img src={project.image} alt={project.name} />
          </div>
        </Tooltip>
      ))}
    </div>
  )
}

export default Dock
