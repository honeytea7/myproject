import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'

export default function UnauthenticatedApp() {
    const [isRegister,setIsRegister]=useState(false)
  return (
      <div>
         { isRegister?<Register></Register>:<Login></Login>}
           <button onClick={()=>{setIsRegister(!isRegister)}}>
              切换到{isRegister?'登录':"注册"}
      </button>
      </div>
     
  )
}
