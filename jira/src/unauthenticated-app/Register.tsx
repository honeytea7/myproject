import { Form , Input} from 'antd'

import { useAuth } from '../context/auth-context'
import { useAsunc } from '../util/use-async'
import { LoginButton } from './Index'


export default function Register({onError}:{onError:(error:Error)=>void}) {
      const {register}=useAuth()
    // const handleSubmit = (value: FormEvent<HTMLFormElement>) => {
      
    //     // event.preventDefault()
    //     // const username = (value.currentTarget.elements[0] as HTMLInputElement).value
    //     // const password = (value.currentTarget.elements[1] as HTMLInputElement).value
    //     // register({username,password})
    //   register(value)
    // }
  
  const {run ,isLoading}=useAsunc(undefined,{throwOnError:true})
  const handleSubmit = async({cpassword, ...values}: { username:string,password:string,cpassword:string}) => {
    if (cpassword !== values.password) {
      onError(new Error('请确认两次输入的密码相同'))
      return
    }
      // register(values).catch(onError)
      
      // 也可用register.catch()这个catch会等执行完出错才会调用
    try {
     await run( register(values))
    } catch (error) {
      onError(error)
    // 如果不加async和await的话 Login是异步的，login调用的时候，catch也会被调用就会出错
    }
  }
  return (
      <Form onFinish={handleSubmit}>
        
         
           <Form.Item name='username'  label="Username"  rules={[{ required: true, message: 'Please input your username!' }]} >
             
              <Input type="text" id='username' />
          </Form.Item>
         <Form.Item name='password'  label="Password"  rules={[{ required: true, message: 'Please input your password!' }]} >
        
              <Input type="text"  id='password'/>
      </Form.Item>
       <Form.Item name='cpassword'  label="cPassword"  rules={[{ required: true, message: 'Please checkout your password!' }]} >
        
              <Input type="text"  id='cpassword'/>
          </Form.Item>
          <LoginButton loading={isLoading} type={'primary'} htmlType={'submit'}>  注册</LoginButton>
    </Form>
  )
}
