import { useAuth } from './../context/auth-context';
import qs from 'qs'
import * as auth from '../auth-provider'
const apiUrl = process.env.REACT_APP_API_URL
interface Config extends RequestInit{
    data?: object
    token?:string
}
export const http = async (endpoint: string,{data,token,headers,...customConfig}:Config={})=>{
    const Config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type':data?'applicantion/json':''
        },
        ...customConfig//如果有有POST会覆盖 前面GET

    }

    if (Config.method.toUpperCase() === 'GET') {
      
              endpoint += `?${qs.stringify(data)}`
        
      
    } else {
           
        
    Config.body=JSON.stringify(data||{})
}

    return window.fetch(`${apiUrl}/${endpoint}`, Config)
        .then(async (response) => {
                  
            if (response.status === 401) {
                //未登录的情况
                await auth.logout()
                window.location.reload()
                return Promise.reject({message:'从新登陆'})
            
            }

            const data = await response.json()
    
            if (response.ok) {
                return data
            } else {
                // axios和fetch的表现不一样，
                // axios在返回状态不为2XX可以直接抛出异常
                return Promise.reject(data)
            //所以在这里要手动抛出异常
                // fetch只会在断网的时候抛出错误，被捕获到
            }
        }
    )
}  
export const useHttp = () => {
    const { user } = useAuth()


    // TS的Utility Types的用法  ：用泛型给他传入一个其他类型，然后untility type对这个类型进行某种操作
    return (...[endpoint,config]:Parameters<typeof http>)=> http(endpoint,{...config,token:user?.token})
    
}