import { User } from './screens/project-list/search-panel';

const apiUrl=process.env.REACT_APP_API_URL
//在真实环境中如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发
const localStorageKey ='__auth_provider_token__'
export const getToken = () => window.localStorage.getItem(localStorageKey)
export const handleUserResponse = ({ user }: { user: User }) => {
    window.localStorage.setItem(localStorageKey, user.token || '')
    return user
}
export const login = async (data: { username: string, password: string }) => { 
  const respone = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    if (respone.ok) {
        return handleUserResponse(await respone.json());
    } else {
        return Promise.reject(await respone.json());
    }
        
}
    
export const register = async(data: { username: string, password: string }) => { 
   return fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data),
    }).then(async (respone: Response)=> {
        if (respone.ok) {
        return handleUserResponse(await respone.json())
        } else {
            return Promise.reject(await respone.json())
    }
   })
        
}
export const logout =  async() =>window.localStorage.removeItem(localStorageKey)
    