import { useEffect, useState } from "react"

export const isFalsy = (value:any) => value === 0 ? false : !value
// 取俩遍反是为了获得该值的布尔值
export const cleanObject = (object:object) => {
    const result = { ...object }
    Object.keys(result).forEach(key => {
        //@ts-ignore
        const value = object[key]
        if (isFalsy(value)) {
                  //@ts-ignore
            delete result[key]
        }
    })
    return result
}
export const useMount = (callback:()=>void) => {
    // 页面加载的时候只执行一次
    useEffect(() => {
       callback()
        
    }
   ,[])
}
//问号表示可以不传
//后面用泛型修改
// export const useDebounce = (value:unknown, delay?:number):any => {
//     const [debounceValue, setDebounceValue] = useState(value)
//     useEffect(() => {
//         //每次value变化后设置一个定时器，
//         const timeout = setTimeout(() => setDebounceValue(value), delay)
//         return () => {
//             //每次再上个useEffect处理完之后执行清楚这个定时器
//             clearTimeout(timeout)
//         }
//     }, [value, delay])
//     return debounceValue
    
// }
export const useDebounce = <V>(value:V, delay?:number) => {
    const [debounceValue, setDebounceValue] = useState(value)
    useEffect(() => {
        //每次value变化后设置一个定时器，
        const timeout = setTimeout(() => setDebounceValue(value), delay)
        return () => {
            //每次再上个useEffect处理完之后执行清楚这个定时器
            clearTimeout(timeout)
        }
    }, [value, delay])
    return debounceValue
    
}

export const useArry = <T>(param: T[]) => {
    const [value, setValue] = useState(param)
    return {
        value,
        add: (item:T) => {
            return setValue([...value,item])
        },
        clear: () =>{
        setValue([])
        },
        removeIndex: (index:number) => {
            const copy = [...value]
            copy.splice(index, 1)
            setValue(copy)
            
        }

    }

    
}