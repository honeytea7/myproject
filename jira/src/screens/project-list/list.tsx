import { Table, TableProps } from 'antd';
import React from 'react'
import { User } from './search-panel';
import dayjs from 'dayjs';

interface Project{
  id: string;
  
  name: string;
  personId: string
  pin: boolean
  organization: string
  created:number
}
interface ListProps extends TableProps<Project>{
  
  users:User[]
  
}
export default function List({ users ,...props}: ListProps) {
  

  return (<Table pagination={false}  rowKey='id' columns={[{
    title: '名称',
    dataIndex: 'name',
    //可排序中文字符
    sorter:(a,b)=>a.name.localeCompare(b.name)
  },{
    title: '部门',
    dataIndex: 'organization',
    //可排序中文字符
    sorter:(a,b)=>a.name.localeCompare(b.name)
  }, {
    title: '负责人',
    render(value, project) {
      return <span>
        {users?.find(user => user.id === project.personId)?.name || '未知'}
      </span>
    }
    }, {
    title: '创建时间',
    render(value, project) {
      return (
        <span>{
          project.created?dayjs(project.created).format('YYYY-MM-DD'):'未知'
        }</span>
      )
    }
    }]}
  {...props}>
  
</Table>)


  
}

