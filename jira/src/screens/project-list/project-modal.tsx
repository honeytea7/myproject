import React from 'react'
import { Drawer } from 'antd'
import { useDispatch } from 'react-redux'
import { projectActions, selectProjectModalOpen } from './project-list.slice'
import { useSelector } from 'react-redux'
export default function ProjectModal() {
  const dispatch = useDispatch()
  const projectModalOPen=useSelector(selectProjectModalOpen)
  return (
    <Drawer onClose={ ()=>dispatch(projectActions.closeProjectModal(true))} open={projectModalOPen} width='100%'>
        <h1>啊</h1>
      </Drawer>
  )
}
