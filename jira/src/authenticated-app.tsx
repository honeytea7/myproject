import {Navigate,Route,Routes}from'react-router'
import styled from '@emotion/styled'

import { Row } from './component/lib'
import { useAuth } from './context/auth-context'

import { ReactComponent as Logo } from './assets/jira2.svg'
import { Button, Dropdown, Menu } from 'antd'
import { resetRoute } from './util'
import ProjectScreen from './screens/project'
import ProjectListScreen from './screens/project-list'

export default function AuthenticatedApp() {
  return (
      <Container>
      <PageHeader></PageHeader>
      <Main>
       
          
        <Routes>
          <Route path={'/projects'} element={< ProjectListScreen/>}> </Route>
          <Route path={'/projects/:projectId/*'} element={<ProjectScreen />}> </Route>
          
             <Route path="/" element={<Navigate to="/projects" />}></Route>
        </Routes>
  
      
      
      </Main>
    </Container>
  )
}



const PageHeader = () =>
  {
  const {logout,user}=useAuth()
return ( <Header between={true}>
        <HeaderLeft gap={true}>
       <Button1  type='link' onClick={resetRoute}> <Logo width={'18rem'} height={'5rem'} color={'rgb(38,132,255'}></Logo></Button1>
        <h3>项目</h3>
        <h3>用户</h3>
        </HeaderLeft>
     
        <HeaderRight>
          <Dropdown overlay={
            <Menu>
              <Menu.Item key={'logout'}>
                <Button type='link' onClick={logout} >登出</Button>
              </Menu.Item>
          </Menu>}>
            <Button type={'link'} onClick={(e)=>e.preventDefault()}> Hi,{ user?.name}</Button>
          </Dropdown>
        </HeaderRight>
      </Header>)}


const Button1=styled(Button)`
  width:18rem;
  height:5rem;
`
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

