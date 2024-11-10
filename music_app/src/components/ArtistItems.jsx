import React from 'react'
import {useNavigate} from 'react-router-dom'

const ArtistItems = ({id, name, desc, img}) => {

    const navigate= useNavigate()

  return (
    <div onClick={()=> navigate(`/artist/${id}`)} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#fffff26]'>
        <img className='rounded-full  h-44' src={img}></img>
        <p className='font-bold mt-2 mb-1'>HIEUTHUHAI</p>
        <p className='text-slate-200 text-sm'>Nghệ sĩ</p>
    </div>
  )
}

export default ArtistItems

