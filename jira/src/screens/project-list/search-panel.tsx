
import { Form, Input, Select } from "antd";

export interface User{
  id: string,
  name: string,
  email: string,
  title: string,
  organizationn: string
  token:string
}

interface SearchPanelProps{
  users: User[],
  param: {
    name: string,
    personId:string
  },
  setParam: (param:SearchPanelProps['param']) => void;
}



export default function SearchPanel({param,setParam,users}:SearchPanelProps) {
 
 
  return (
    <Form style={{marginBottom:'2rem'}} layout={'inline'}>
      <Form.Item>
        <Input type="text" placeholder={"项目名"} value={param.name} onChange={evt => setParam({ ...param, name: evt.target.value })} />
        
      </Form.Item>
      <Form.Item>
        <Select value={param.personId} onChange={value => { setParam({ ...param, personId: value }) }}>
          <Select.Option value="">负责人</Select.Option>
          {
            users?.map((user) => {
              return <Select.Option key={user.name} value={ user.id}>{ user.name}</Select.Option>
            })
          }
        </Select>
      </Form.Item>
    </Form>
  )
}
