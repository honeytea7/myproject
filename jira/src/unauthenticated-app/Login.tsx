
import { useAuth } from '../context/auth-context'

import {Form, Input} from'antd'
import { LoginButton } from './Index'
import { useAsunc } from '../util/use-async'
import { useDispatch } from 'react-redux'
import { User } from '../screens/project-list/search-panel'
export default function Login({onError}:{onError:(error:Error)=>void}) {
  const { login, user } = useAuth()
  
  const {run ,isLoading}=useAsunc(undefined,{throwOnError:true})
const dispatch:(...args:any[])=>Promise<User> =useDispatch()


    const handleSubmit = async(value: {username:string,password:string}) => {
      console.log(value);
      dispatch(login(value))
      
        // event.preventDefault()
        // const username = (event.currentTarget.elements[0] as HTMLInputElement).value
        // const password = (event.currentTarget.elements[1] as HTMLInputElement).value
           // 也可用register.catch()这个catch会等执行完出错才会调用
    try {
  await run( login(value))
    } catch (error) {
      onError(error)
    // 如果不加async和await的话 Login是异步的，login调用的时候，catch也会被调用就会出错
    }
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
              <LoginButton loading={isLoading} type='primary' htmlType='submit'>  登陆</LoginButton>
          </Form.Item>
    </Form>
  )
}
