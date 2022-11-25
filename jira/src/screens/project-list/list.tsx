import { Dropdown, Menu, Table, TableProps } from 'antd';

import { User } from './search-panel';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Pin } from '../../component/pin';
import { useEditProject } from '../../util/project';
import { ButtonNopaddding } from '../../component/lib';
import { useDispatch } from 'react-redux';
import { projectActions } from './project-list.slice';


export interface Project{
  id: number;
  
  name: string;
  personId: number
  pin: boolean
  organization: string
  created:number
}
interface ListProps extends TableProps<Project>{
  
  users: User[],
  refresh?: () => void,
  // setProjectModalOpen:(isOpen:boolean)=>void
  
}
export  function List({ users ,...props}: ListProps) {

  const { mutate } = useEditProject()
  const dispatch=useDispatch()
  const pinProject = (id: number) => (pin: boolean) => {
     
    return mutate({ id, pin }).then(props.refresh)
  }
  


  return (<Table pagination={false} rowKey='id' columns={[{
    title: <Pin checked></Pin>,
    render(value, project) {
      return <Pin checked={project.pin} onCheckedChange={ pinProject(project.id)
      } />
    }
  },{
    title: '名称',

    //可排序中文字符
    sorter: (a, b) => a.name.localeCompare(b.name),
    
    render(value, project) {
      return <Link to={String(project.id)}>{ project.name}</Link>
    }
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
    }
    , {
      render(value) {
        return <Dropdown overlay={<Menu>
          <Menu.Item key={'edit'}>
            <ButtonNopaddding type='link' onClick={()=>dispatch(projectActions.openProjectModal(true))}> 编辑</ButtonNopaddding>
          </Menu.Item>
        </Menu> }>
          <ButtonNopaddding type='link'>...</ButtonNopaddding>
        </Dropdown>
        
      }
  }]}
  {...props}>
  
</Table>)


  
}

