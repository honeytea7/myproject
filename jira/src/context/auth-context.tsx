// import { login, register, logout } from '../auth-provider';
import { ReactNode, useCallback } from 'react';
import React from 'react';
import { User } from "../screens/project-list/search-panel";
import  * as auth from '../auth-provider'
import { http } from '../util/http';
import { useMount } from '../util';
import { useAsunc } from '../util/use-async';
import { FullPageErrorFallback, FullPageLoading } from '../component/lib';
import * as authStore from '../store/auth.slice'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { bootstrap } from '../store/auth.slice';
export interface AuthForm{
    username: string,
    password:string
}




export const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if (token) {
        const data = await http('me', { token })
        user=data.user
       return user
    }
    
}


// const AuthContext = React.createContext<{
//     user: User | null,
//     register: (form: AuthForm) => Promise<any>,
//     login: (form: AuthForm) => Promise<void>
//     logout: () => Promise<void>
// } | undefined>(undefined);
// AuthContext.displayName = 'AuthContext';
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { isError, isIdle, error, isLoading, run } = useAsunc<User | null>()
    const dispatch:(...args:any[])=>Promise<User>=useDispatch()
    
    // const login = (form: AuthForm) => auth.login(form).then(setUser)
    // const register = (form: AuthForm) => auth.register(form).then(setUser)
    // const logout = () => auth.logout().then(() => setUser(null))
    useMount(() => {
     
        run(dispatch(bootstrap()))
    })
    
    if (isIdle || isLoading) {
    return <FullPageLoading></FullPageLoading>
}

    if (isError) {
        return<FullPageErrorFallback error={error}></FullPageErrorFallback>
    }

    // 记得把这个注释打开
    // return (<AuthContext.Provider  children={children} value={ {user,login,register,logout}} />)
    return <div>{children}</div>}
export const useAuth = () => {
    const dispatch:(...args:any[])=>Promise<User> = useDispatch()
    const user=useSelector(authStore.selectUser)
    const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch]
    )
    const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)),[dispatch])
       const logout=useCallback(()=>dispatch(authStore.logout()),[dispatch])
    return {user,register,login,logout}
    
}
// 您的文件扩展名很可能是 .ts而不是 .tsx .

// 因此，TypeScript 正在解释 <ctx.Provider as cast 并尝试查找类型 Provider在命名空间 ctx 