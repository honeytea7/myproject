import { useMountedRef } from './index';
import { useCallback, useState } from 'react';
interface State<D>{
    error: Error | null;
    data: D | null;
    stat:'idle'|'loading'|'error'|'success'
}

const defaultInittalState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
 
}

const defaultConfig = {
    throwOnError:false
}

export const useAsunc = <D>(initialState?: State<D>,initialConfig?:typeof defaultConfig) => {
   const config={...defaultConfig,initialConfig}
    
    const [state, setState] = useState<State<D>>({
        ...defaultInittalState,
        ...initialState
    })
    const mountedRef=useMountedRef()
    const setData = useCallback((data: D) => setState({ data, stat: 'success', error: null }),[])

    const setError =useCallback( (error: Error) => {
            setState({
                error,
                stat: 'error',
            data:null})
        },[])
    
    const [retry, setRetry] = useState(() => () => { })
    

    const run = useCallback(async (promise: Promise<D>,runConfig?:{retry:()=>Promise<D>} ) => {
        
        if (!promise || !promise.then) {
     throw new Error('请传入Promise类型数据')
        }   

      
     
        setRetry(() => () => {
            if (runConfig?.retry) {
                run(runConfig?.retry(),runConfig)
            }})
      
        setState(prevstate=>({ ...prevstate, stat: 'loading' }))
        return promise.then(data => {
            if(mountedRef.current)
            {setData(data)}
            return data
        }).catch(error => {

            //catch会消化异常，如果不主动抛出，外面是接受不到的
            setError(error)
            if(config.throwOnError) return Promise.reject(error)
            // 所以要return Promise.reject
            return Promise.reject(error)
        })
    },[config.throwOnError, mountedRef,setData,setError])
    
    return {
        isIdle: state.stat==='idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,setData,setError,retry,...state
    }
}

 