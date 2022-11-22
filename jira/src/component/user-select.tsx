import React from 'react'
import { useUser } from '../util/user'
import { IdSelect } from './id-select'

export default function Userselect(props:React.ComponentProps<typeof IdSelect>) {
    const {data:users}=useUser()
  return (
    <IdSelect options={users||[] } {...props}></IdSelect>
  )
}
