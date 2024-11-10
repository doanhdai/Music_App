import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlayerContext } from '../context/PlayerContext'

const SongItems = ({id, name, desc, img}) => {
  const navigate= useNavigate()
  const{playWithId} = useContext(PlayerContext)
  return (
    <div onClick={()=>navigate("/song/"`${id}`)} className='min-w-[195px] p-2 px-2 rounded cursor-pointer hover:bg-[#fffff26]'>
        <img onClick={()=>playWithId(id)} className='rounded h-44' src={img}></img>
        <p className='font-bold mt-2 mb-1'>{name}</p>
        <p className='text-slate-200 text-sm'>{desc}</p>
    </div>
  )
}

export default SongItems