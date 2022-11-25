import styled from '@emotion/styled'
import {   Divider, List, Popover, Typography } from 'antd'

import { useProjectModal } from '../screens/project-list/util'
import { useProjects } from '../util/project'
import { ButtonNopaddding } from './lib'

export default function ProjectPopover() {
const {data: projects} = useProjects()
    const pinnedProjects=projects?.filter(project=>project.pin)
    const [,open,]=useProjectModal()
    const content = <ContentContainer>
        <Typography.Text type='secondary'>收藏项目</Typography.Text>
        <List>
            {
                pinnedProjects?.map(project=><List.Item.Meta key={project.id} title={project.name}></List.Item.Meta>)
            }
      </List>
      <Divider />
      <ButtonNopaddding  onClick={open} type='link'>创建项目</ButtonNopaddding>
</ContentContainer>

    
  return (
    <Popover placement='bottom' content={content}><span>项目</span></Popover>
  )
}

const ContentContainer = styled.div`
min-width:30rem;
`
ProjectPopover.whyDidYouRendeer=true