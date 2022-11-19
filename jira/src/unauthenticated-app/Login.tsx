import React, { FormEvent } from 'react'
import { useAuth } from '../context/auth-context'

import {Form, Input,Button} from'antd'
import { LoginButton } from './Index'
export default function Login() {
      const {login,user}=useAuth()
    const handleSubmit = (value: {username:string,password:string}) => {
      console.log(value);
      
        // event.preventDefault()
        // const username = (event.currentTarget.elements[0] as HTMLInputElement).value
        // const password = (event.currentTarget.elements[1] as HTMLInputElement).value
        login(value)
    }
  return (
      <Form onFinish={handleSubmit}>
          {
              user?<div> 登陆成功，用户名{user?.name}</div>:null
          }
         
          <Form.Item name='username'  label="Username"  rules={[{ required: true, message: 'Please input your username!' }]} >
            
              <Input type="text" id='username' placeholder='用户名'/>
          </Form.Item>
          <Form.Item name='password'    label="Password"  rules={[{ required: true, message: 'Please input your password!' }]}>
    
              <Input type="password"  id='password' placeholder='密码'/>
          </Form.Item>
          <Form.Item>
              <LoginButton type='primary' htmlType='submit'>  登陆</LoginButton>
          </Form.Item>
    </Form>
  )
}
