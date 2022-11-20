import { useState } from 'react';
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

const setData = (data: D) => setState({ data, stat: 'success', error: null })

const setError = (error: Error) => {
        setState({
            error,
            stat: 'error',
        data:null})
}
    const run = async(promise:Promise<D>) => {
        if (!promise || !promise.then) {
     throw new Error('请传入Promise类型数据')
        }   
        setState({ ...state, stat: 'loading' })
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
    }
    
    return {
        isIdle: state.stat==='idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,setData,setError,...state
    }
}

 