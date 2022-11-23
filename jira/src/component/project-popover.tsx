import styled from '@emotion/styled'
import { Button, Divider, List, Popover, Typography } from 'antd'
import React from 'react'
import { useProjects } from '../util/project'
import { ButtonNopaddding } from './lib'

export default function ProjectPopover(props:{setProjectModalOpen:(isOpen:boolean)=>void}) {
const {data: projects, isLoading} = useProjects()
    const pinnedProjects=projects?.filter(project=>project.pin)

    const content = <ContentContainer>
        <Typography.Text type='secondary'>收藏项目</Typography.Text>
        <List>
            {
                pinnedProjects?.map(project=><List.Item.Meta title={project.name}></List.Item.Meta>)
            }
      </List>
      <Divider />
      <ButtonNopaddding  onClick={()=>props.setProjectModalOpen(true)} type='link'>创建项目</ButtonNopaddding>
</ContentContainer>

    
  return (
    <Popover placement='bottom' content={content}><span>项目</span></Popover>
  )
}

const ContentContainer = styled.div`
min-width:30rem;
`