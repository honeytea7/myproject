import { Button, Card, Divider, Typography } from 'antd'
import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'
import styled from '@emotion/styled'
import jira from '../assets/emirates.svg'
import { useDocumentTitle } from '../util'
export default function UnauthenticatedApp() {
  const [isRegister, setIsRegister] = useState(false)
  const [error,setError]=useState<Error|null>(null)
  useDocumentTitle('请注册登陆以继续')
  return (
    <Container >
      <Header></Header>
 
      <ShadowCard>
        <Title>{isRegister ? '请注册' : '请登录'}</Title>
        {error ? <Typography.Text type='danger'>{error.message}</Typography.Text>:null}
        {isRegister ? <Register onError={setError}></Register> : <Login  onError={setError}></Login>}
        <Divider/>
           <Button type='link' onClick={()=>{setIsRegister(!isRegister)}}>
              {isRegister?'已有账号直接登录':"没有账号？注册"}
      </Button>
      </ShadowCard>
       
      </Container>
     
  )
}

const Container =styled.div`
display:flex;
flex-direction:column;
align-items:center;
min-height:100vh;
`

const ShadowCard = styled(Card)`
width:40rem;
min-height:56rem;
padding:3.2rem 4rem;
border-radius:0.3rem;
box-sizing:border-box;
box-shadow:rgba(0,0,0,0.1) 0 0 10px;
text-align:center;

`

const Header=styled.header`
background:url(${jira}) no-repeat center;
  padding:5rem 0;
background-size:8rem;
width:100%;
`
// 无背景图
// const Background = styled.div`
// position:absolute;
// width:100%;
// height:100%;
// background-repeat:no-repeat;
// background-attachment: fixed;
// background-position:left bottom ,right bottom;
// background-size:calc(((100vw-40rem)/2)-3.2rem),calc(((100vw-40rem)/2)-3.2rem),cover;
// background-image:url(),url();
// `

// const Background = styled.div`
// position:absolute;
// width:100%;
// height:100%;
// background-repeat:no-repeat;
// background-attachment: fixed;

// background-size:cover;
// background-image:url('../assets/R.jfif');
// `
const Title = styled.h2`
margin-bottom:2.4rem;
color:rgb(94,108,132);`

export const LoginButton = styled(Button)`
width:100%
`