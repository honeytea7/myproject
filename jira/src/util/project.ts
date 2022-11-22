import { Project } from './../screens/project-list/list';
import { useEffect} from 'react'
import { cleanObject  } from '../util'



// import qs from 'qs'

import { useHttp } from '../util/http'

import { useAsunc } from '../util/use-async';


export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()
    
   const{run,...result}=useAsunc<Project[]>()
  useEffect(() => {
   
  run(  client('projects', { data: cleanObject(param||{}) })
    )
   
     //eslint-disable-next-line
  }, [param])
    
    
    
    return result


}
// 编辑功能
export const useEditProject = () => {
  const { run, ...asyncResult } = useAsunc()
  const client = useHttp()
  const mutate = (params:Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method:'PATCH'
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
}
// 添加功能
export const useSAddProject = () => {
  const { run, ...asyncResult } = useAsunc()
  const client = useHttp()
  const mutate = (params:Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method:'POST'
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
}
