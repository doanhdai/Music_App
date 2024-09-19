import React from 'react'

const SongItems = ({id, name, desc, img}) => {
  return (
    <div className='min-w-[195px] p-2 px-2 rounded cursor-pointer hover:bg-[#fffff26]'>
        <img className='rounded' src={img}></img>
        <p className='font-bold mt-2 mb-1'>{name}</p>
        <p className='text-slate-200 text-sm'>{desc}</p>
    </div>
  )
}

export default SongItems