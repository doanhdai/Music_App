import React from 'react'
import DisplayHome from './DisplayHome'
import { Route, Routes } from 'react-router-dom'

const Display = () => {
  return (
    <div className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lh:w-[75%] lg:ml-0'>
        <Routes className=''>
          <Route path='/' element={<DisplayHome /> }>
          </Route>
        </Routes>
    </div>
  )
}

export default Display