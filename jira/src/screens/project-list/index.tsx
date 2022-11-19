import React, { useEffect,useState} from 'react'
import { cleanObject, useDebounce, useMount } from '../../util'
import SearchPanel from './search-panel'
import List from './list'
import styled from "@emotion/styled";
// import qs from 'qs'

import { useHttp } from '../../util/http'
import { Typography } from 'antd';
// const apiUrl=process.env.REACT_APP_API_URL
export default function ProjectListScreen() {
  const client=useHttp()
  const [users, setUsers] = useState([])

    const[param,setParam] =useState({
    name: '',
  personId:''})
    const [list, setList] = useState([])
    const [isLoading,setIsLoading]=useState(false)
  const debounceParam = useDebounce(param, 2000)
  
  const [error,setError]=useState<null|Error>(null)
  useEffect(() => {
    setIsLoading(true)
    client('projects', { data: cleanObject(debounceParam) }).then(setList)
      .catch((error) => {
        setList([])
        setError(error)
      })
      .finally(()=>{setIsLoading(false)})
    
    
    //   fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async (response) => {
    //   if (response.ok) {
    //     setList(await response.json())
    //   }
       
        
    // })
     //eslint-disable-next-line
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
      <Container>
      <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
      {error ? <Typography.Text> { error.message}</Typography.Text>:undefined}
          <List users={users} dataSource={list} loading={isLoading} ></List>
    </Container>
  )
}

const Container = styled.div`

padding:3.2rem;
`