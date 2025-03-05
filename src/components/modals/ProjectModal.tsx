import { Text, Title } from '@mantine/core'
import Horizontal from 'components/Horizontal'
import ModalContent from 'components/Modal/components/ModalContent'
import type { Project } from 'types'

type ProjectModalProps = {
  project: Project
}

export default function ProjectModal({ project }: ProjectModalProps) {
  return (
    <ModalContent style={{ maxWidth: 1000 }}>
      <ModalContent.Sidebar>
        <div>사이드바</div>
      </ModalContent.Sidebar>
      <ModalContent.Main style={{ backgroundColor: '#fff' }}>
        <Horizontal style={{ height: 52 }}>header</Horizontal>
        <div style={{ display: 'flex', padding: '16px 40px', gap: 40 }}>
          <img
            src={project.image}
            alt={project.name}
            style={{ width: 90, height: 90 }}
          />
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
          >
            <Title order={2} style={{ fontSize: 24 }}>
              {project.name}
            </Title>
            <Text style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
              {project.description}
            </Text>
          </div>
        </div>
      </ModalContent.Main>
    </ModalContent>
  )
}
