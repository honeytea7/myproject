import React, { useEffect,useState} from 'react'
import { cleanObject, useDebounce, useMount } from '../../util'
import SearchPanel from './search-panel'
import List from './list'

import { useHttp } from '../../util/http'
// const apiUrl=process.env.REACT_APP_API_URL
export default function ProjectListScreen() {
  const client=useHttp()
  const [users, setUsers] = useState([])

    const[param,setParam] =useState({
    name: '',
  personId:''})
    const [list, setList] = useState([])
    
  const debounceParam=useDebounce(param,2000)
  useEffect(() => {

client('project',{data:cleanObject(debounceParam)}).then(setList)
    
    //   fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async (response) => {
    //   if (response.ok) {
    //     setList(await response.json())
    //   }
       
        
    // })
  }, [debounceParam])

    useMount(() => {
        // fetch(`${apiUrl}/users`).then(async (response) => {
        //     if (response.ok) {
        //         setUsers(await response.json())
                
        //     }
        // })
      client('users').then(setUsers)
    }
  )
 
//  const debounce = (fun, delay)=>{
//     let timer;
//     return (...params) => {
//       if (timer) {
//         clearTimeout(timer)
//       }
//       timer = setTimeout(function () {
//      fun(...params)
        
//       },delay)
//     }
    
//   }
//   let log = debounce(() => {
//     console.log('qqq');
//   }, 5000)
//   log()
//   log()
  return (
      <div>
          <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
          <List users={users} list={list} ></List>
    </div>
  )
}
