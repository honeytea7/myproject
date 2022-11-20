import React from 'react'
import { Link ,Route,Routes,Navigate} from 'react-router-dom'
import EpicScreen from '../epic'
import KanbanScreen from '../kanban'

export default function ProjectScreen() {
  return (
      <div>
          <h1>ProjectScreen</h1>
          {/* Link加上/会被认为是根标签 */}
          <Link to={'kanban'}>看板</Link>
          <Link to={'epic'}>任务组</Link>
          <Routes>
              <Route path={'/kanban'} element={<KanbanScreen></KanbanScreen>}></Route>
              <Route path={'/epic'} element={<EpicScreen></EpicScreen>}></Route>
              <Route path="/" element={<Navigate to={window.location.pathname + '/kanban'} />}></Route>
           
          </Routes>
          
    </div>
  )
}
