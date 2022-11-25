import React from 'react'
import { Drawer } from 'antd'
import { useProjectModal } from './util'
export default function ProjectModal() {
  const [projectModalOpen,,close]=useProjectModal()
  return (
      <Drawer open={projectModalOpen} onClose={close} width='100%'>
        <h1>1</h1>
      </Drawer>
  )
}
