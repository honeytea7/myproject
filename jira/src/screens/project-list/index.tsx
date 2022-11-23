// 最上面引入


// import { useState } from 'react'
import {  useDebounce, useDocumentTitle } from '../../util'
import SearchPanel from './search-panel'
import  { List } from './list'
import styled from "@emotion/styled";

import { Button, Row, Typography } from 'antd';
import { useProjects } from '../../util/project';
import { useUser } from '../../util/user';
// import { useUrlQueryParam } from '../../util/url'
import { useProjectsSearchParams } from './util';


export default function ProjectListScreen(props:{setProjectModalOpen:(isOpen:boolean)=>void}) {
  useDocumentTitle('项目列表',false)

  // const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  // const projectsParam={...param,personId:Number(param.personId)||undefined}
 const [param,setParam]=useProjectsSearchParams()
const{isLoading,error,data:list,retry}=useProjects(useDebounce(param, 200))

const {data:users}= useUser()
    
 

  return (
    <Container>
      <Row justify="space-between">
        <h1>项目列表</h1>
        <Button onClick={()=>props.setProjectModalOpen(true)} >创建项目</Button>
      </Row>
      <SearchPanel users={users||[]} param={param} setParam={setParam}></SearchPanel>
      {error ? <Typography.Text> { error.message}</Typography.Text>:undefined}
          <List setProjectModalOpen={props.setProjectModalOpen} refresh={retry} users={users||[]} dataSource={list||[]} loading={isLoading} ></List>
    </Container>
  )
}


ProjectListScreen.whyDidYouRendeer=true
const Container = styled.div`

padding:3.2rem;
`