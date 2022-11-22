import { cleanObject } from './index';
// 返回页面中url指定的参数值

import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"


export const useUrlQueryParam = <K extends string>(keys:K[]) => {
    const [searchParams, setSearchParam] = useSearchParams()
    return [
        useMemo(()=>keys.reduce((prev: { [key in K]: string } , key: K) => {
            return { ...prev, [key]: searchParams.get(key) || '' }
            
        //eslint-disable-next-line
        }, {} as { [key in K]: string }), [searchParams]),
        (params: Partial<{ [key in K]: unknown }>) => {
            
            const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
            return setSearchParam(o)
        },
    ]as const
}  