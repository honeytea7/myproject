import React from 'react'
import { Drawer } from 'antd'
export default function  ProjectModal(props:{projectModalOpen:boolean,onClose:()=>void}) {
  return (
      <Drawer open={props.projectModalOpen} width='100%'>
        <h1></h1>
      </Drawer>
  )
}
