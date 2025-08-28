import React from 'react'
import { Outlet } from 'react-router-dom'

export default function TestLayout() {
  return (
    <div><h1>TestLayout</h1>
    <Outlet/>
    </div>
  )
}
