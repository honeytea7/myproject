import  { useState} from 'react'
import {  useDebounce, useDocumentTitle } from '../../util'
import SearchPanel from './search-panel'
import  { List } from './list'
import styled from "@emotion/styled";

import { Typography } from 'antd';
import { useProjects } from '../../util/project';
import { useUser } from '../../util/user';


export default function ProjectListScreen() {
  useDocumentTitle('项目列表',false)

    const[param,setParam] =useState({
    name: '',
  personId:''})
   
 
  const debounceParam = useDebounce(param, 1000)
const{isLoading,error,data:list}=useProjects(debounceParam)

const {data:users}= useUser()
    
 

  return (
      <Container>
      <SearchPanel users={users||[]} param={param} setParam={setParam}></SearchPanel>
      {error ? <Typography.Text> { error.message}</Typography.Text>:undefined}
          <List users={users||[]} dataSource={list||[]} loading={isLoading} ></List>
    </Container>
  )
}

const Container = styled.div`

padding:3.2rem;
`