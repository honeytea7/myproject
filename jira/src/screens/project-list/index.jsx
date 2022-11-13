import React, { useEffect,useState} from 'react'
import { cleanObject } from '../../util'
import SearchPanel from './search-panel'
import List from './list'
import qs from 'qs'
const apiUrl=process.env.REACT_APP_API_URL
export default function ProjectListScreen() {
  const [users, setUsers] = useState([])

    const[param,setParam] =useState({
    name: '',
  personId:''})
    const [list, setList] = useState([])
    
  useEffect(() => {
      fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async (response) => {
       console.log(qs.stringify(cleanObject(param)));
      if (response.ok) {
        setList(await response.json())
      }
       
        
    })
  }, [param])
    useEffect(() => {
        fetch(`${apiUrl}/users`).then(async (response) => {
            if (response.ok) {
                setUsers(await response.json())
                
            }
        })
    },
        []
        
    )

  return (
      <div>
          <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
          <List users={users} list={list} ></List>
    </div>
  )
}
