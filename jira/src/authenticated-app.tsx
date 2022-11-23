import {Navigate,Route,Routes}from'react-router'
import styled from '@emotion/styled'

import { ButtonNopaddding, Row } from './component/lib'
import { useAuth } from './context/auth-context'

import { ReactComponent as Logo } from './assets/jira2.svg'
import { Button, Dropdown, Menu } from 'antd'
import { resetRoute } from './util'
import ProjectScreen from './screens/project'
import ProjectListScreen from './screens/project-list'
import { useState } from 'react'
import ProjectModal from './screens/project-list/project-modal'
import ProjectPopover from './component/project-popover'

export default function AuthenticatedApp() {

  const [projectModalOpen,setProjectModalOpen]=useState(false)
  return (
      <Container>
      <PageHeader setProjectModalOpen={setProjectModalOpen}></PageHeader>
      <Main>
       
          
        <Routes>
          <Route path={'/projects'} element={< ProjectListScreen setProjectModalOpen={setProjectModalOpen} />}> </Route>
          <Route path={'/projects/:projectId/*'} element={<ProjectScreen />}> </Route>
          
             <Route path="/" element={<Navigate to="/projects" />}></Route>
        </Routes>
  
      
      
      </Main>
      <ProjectModal projectModalOpen={projectModalOpen} onClose={()=>setProjectModalOpen(!projectModalOpen)}></ProjectModal>
    </Container>
  )
}



const PageHeader = (props:{setProjectModalOpen:(isOpen:boolean)=>void}) =>
  {
  
return ( <Header between={true}>
        <HeaderLeft gap={true}>
    <ButtonNopaddding style={{ padding: 0 ,height:'15rem'}} type='link' onClick={()=>props.setProjectModalOpen(true)}> <Logo width={'16rem'} height={'4rem'} color={'rgb(38,132,255'}></Logo></ButtonNopaddding>
        <ProjectPopover setProjectModalOpen={props.setProjectModalOpen}></ProjectPopover>
        <span>用户</span>
        </HeaderLeft>
     
        <HeaderRight>
         <User></User>
        </HeaderRight>
      </Header>)}

const User = () => {
  const { logout, user } = useAuth()
  return  <Dropdown overlay={
            <Menu>
              <Menu.Item key={'logout'}>
                <Button type='link' onClick={logout} >登出</Button>
              </Menu.Item>
          </Menu>}>
            <Button type={'link'} onClick={(e)=>e.preventDefault()}> Hi,{ user?.name}</Button>
          </Dropdown>
}




const Container = styled.div`
display:grid;
grid-template-rows:6rem 1fr 6rem;
height:100vh;

`


const Header = styled(Row)`
padding:3.2rem; 
box-shadow:0 0 5px 0 rgba(0,0,0,0.1);
z-index:1;


`


const HeaderLeft = styled(Row)`

`;

const Main = styled.footer`

`;
const HeaderRight = styled(Row)`


`;

