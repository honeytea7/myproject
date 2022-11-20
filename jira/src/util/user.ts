import { cleanObject } from './index';
import { useEffect } from 'react';
import { useAsunc } from './use-async';
import { useHttp } from './http';
import { User } from "../screens/project-list/search-panel";

export const useUser = (param?: Partial<User>) => {
    const client = useHttp()
    const { run, ...result } = useAsunc<User[]>()
    useEffect(() => {
        run(client("users",{data:cleanObject(param||{})}))
    }, [param])
    return result
}