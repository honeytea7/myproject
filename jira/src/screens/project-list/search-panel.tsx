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
    <form>
      <div>
        <input type="text" value={param.name} onChange={evt => setParam({ ...param, name: evt.target.value })} />
        <select value={param.personId} name="" id="" onChange={evt => { setParam({ ...param, personId: evt.target.value }) }}>
          <option value="">负责人</option>
          {
            users?.map((user) => {
              return <option key={user.name} value={ user.id}>{ user.name}</option>
            })
          }
        </select>
      </div>
    </form>
  )
}
