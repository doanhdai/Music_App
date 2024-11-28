import React from 'react'
import { useNavigate } from 'react-router-dom'

const AlbumItems = ({ setCurrentID_Album, id, name, desc, img }) => {

  const navigate = useNavigate()

  return (
    <div onClick={() => { setCurrentID_Album(id); navigate(`/albums/${id}`); }} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#fffff26]'>
      <img className='rounded h-44 w-44' src={img}></img>
      <p className='font-bold mt-2 mb-1'>{name}</p>
      <p className='text-slate-200 text-sm'>{desc}</p>
    </div>
  )
}

export default AlbumItems