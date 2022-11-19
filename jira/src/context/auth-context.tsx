// import { login, register, logout } from '../auth-provider';
import { ReactNode, useState } from 'react';
import React from 'react';
import { User } from "../screens/project-list/search-panel";
import  * as auth from '../auth-provider'
import { http } from '../util/http';
import { useMount } from '../util';

interface AuthForm{
    username: string,
    password:string
}




const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if (token) {
        const data = await http('me', { token })
        user=data.user
       return user
    }
    
}


const AuthContext = React.createContext<{
    user: User | null,
    register: (form: AuthForm) => Promise<any>,
    login: (form: AuthForm) => Promise<void>
    logout: () => Promise<void>
} | undefined>(undefined);
AuthContext.displayName = 'AuthContext';
export const AuthProvider = ({children}:{children:ReactNode}) => {
    const [user, setUser] = useState<User|null>(null)
    const login = (form: AuthForm) => auth.login(form).then(setUser)
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(() => setUser(null))
    useMount(() => {
        bootstrapUser().then(setUser)
    })
    // 记得把这个注释打开
    return (<AuthContext.Provider  children={children} value={ {user,login,register,logout}} />)
    
}
export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth必须再Authprovider中使用')
    }
    return context
    
}
// 您的文件扩展名很可能是 .ts而不是 .tsx .

// 因此，TypeScript 正在解释 <ctx.Provider as cast 并尝试查找类型 Provider在命名空间 ctx 