import React from 'react'
import { useArry } from '../../util'

export default function Text() {
    const person:{name:string,age:number}[]=[{name:'xwq',age:21}]
    const { value,add,removeIndex,clear}=useArry(person) 
  return (
      <div>
          <button onClick={() => add({ name: 'join' ,age:12})}>add</button>
          <button onClick={() => removeIndex(0)}>remove0</button>
          <button onClick={() => clear()}>clear</button>
          {
              value.map((person,index) => {
                  return <div>
                      <span>{index}</span><span>{ person.name}</span>
                  </div>
              })
          }
    </div>
  )
}
