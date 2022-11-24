import { useMountedRef } from './index';
import { useCallback, useReducer, useState } from 'react';
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
    
    // const [state, setState] = useState<State<D>>({
    //     ...defaultInittalState,
    //     ...initialState
    // })

    // 改写成useReducer的形式
    const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }), {
         ...defaultInittalState,
        ...initialState
    })
    // const mountedRef = useMountedRef()
    const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
        const mountedRef = useMountedRef()
        return useCallback((...args:T[])=>(mountedRef.current?dispatch(...args):void 0),[dispatch,mountedRef])
    }
    
    const safeDispatch=useSafeDispatch(dispatch)
    const setData = useCallback((data: D) => safeDispatch({ data, stat: 'success', error: null }),[safeDispatch ])

    const setError =useCallback( (error: Error) => {
            safeDispatch({
                error,
                stat: 'error',
            data:null})
        },[safeDispatch])
    
    const [retry, setRetry] = useState(() => () => { })
    

    const run = useCallback(async (promise: Promise<D>,runConfig?:{retry:()=>Promise<D>} ) => {
        
        if (!promise || !promise.then) {
     throw new Error('请传入Promise类型数据')
        }   

      
     
        setRetry(() => () => {
            if (runConfig?.retry) {
                run(runConfig?.retry(),runConfig)
            }})
      
        safeDispatch({ stat: 'loading' })
        return promise.then(data => {
          
            setData(data)
            return data
        }).catch(error => {

            //catch会消化异常，如果不主动抛出，外面是接受不到的
            setError(error)
            if(config.throwOnError) return Promise.reject(error)
            // 所以要return Promise.reject
            return Promise.reject(error)
        })
    },[config.throwOnError,setData,setError,safeDispatch])
    
    return {
        isIdle: state.stat==='idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,setData,setError,retry,...state
    }
}

 