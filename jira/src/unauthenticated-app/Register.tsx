import { Form ,Button, Input} from 'antd'
import React, { FormEvent } from 'react'
import { useAuth } from '../context/auth-context'
import { LoginButton } from './Index'


export default function Register() {
      const {register,user}=useAuth()
    // const handleSubmit = (value: FormEvent<HTMLFormElement>) => {
      
    //     // event.preventDefault()
    //     // const username = (value.currentTarget.elements[0] as HTMLInputElement).value
    //     // const password = (value.currentTarget.elements[1] as HTMLInputElement).value
    //     // register({username,password})
    //   register(value)
    // }
  
  
  const handleSubmit = (values: { username:string,password:string}) => {
    register(values)
  }
  return (
      <Form onFinish={handleSubmit}>
        
         
           <Form.Item name='username'  label="Username"  rules={[{ required: true, message: 'Please input your username!' }]} >
             
              <Input type="text" id='username' />
          </Form.Item>
         <Form.Item name='password'  label="Password"  rules={[{ required: true, message: 'Please input your password!' }]} >
        
              <Input type="text"  id='password'/>
          </Form.Item>
          <LoginButton type={'primary'} htmlType={'submit'}>  注册</LoginButton>
    </Form>
  )
}
