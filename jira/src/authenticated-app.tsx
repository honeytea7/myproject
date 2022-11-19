import styled from '@emotion/styled'

import { Row } from './component/lib'
import { useAuth } from './context/auth-context'
import ProjectListScreen from './screens/project-list'
import { ReactComponent as Logo } from './assets/jira2.svg'
import { Button, Dropdown, Menu } from 'antd'

export default function AuthenticatedApp() {
    const {logout,user}=useAuth()
  return (
      <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
        <Logo width={'18rem'} height={'5rem'} color={'rgb(38,132,255'}></Logo>
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
      </Header>
         <Main> <ProjectListScreen></ProjectListScreen></Main>
    </Container>
  )
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

