import { useMemo } from 'react';
import { useUrlQueryParam } from './../../util/url';

 export const useProjectsSearchParams = () => {
     const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    return [useMemo(() =>( { ...param, personId: Number(param.personId) || undefined }), [param]),
    setParam]as const
     
}

export const useProjectModal = () => {
    //从事useUrlQueryParam中队取得都是字符串
    const [{projectCreate} , setProjectCreate] = useUrlQueryParam(['projectCreate'])
    const open = () => setProjectCreate({ projectCreate: true })
    const close = () => setProjectCreate({ projectCreate: undefined })
    
    return [projectCreate === 'true', open, close] as const
    // 返回tuple的好处,一个好处就是在使用的时候，就可以直接重新命名，类似于useState
}
//   组件间解耦