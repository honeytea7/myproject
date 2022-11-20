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
