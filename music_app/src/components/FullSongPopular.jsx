import React from 'react'
// import { useNavigate } from 'react-router-dom'
import { songsData } from '../assets/assets'
import SongItems from './SongItems'

const FullSongPopular = () => {
  return (
    <>
      <div className='mb-4'>
          <div className='flex justify-between'>
            <h1 className='mb-4 font-bold text-2xl'>Bài hát thịch hành</h1>
            <h1 className='font-bold mr-3 cursor-pointer'> Xem tất cả</h1>
          </div>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
            {songsData.map((item, index) => (
              <SongItems key={index} name={item.name} desc={item.name} id={item.id} img={item.image} />
            ))}
          </div>
        </div>

    </>
  )
}

export default FullSongPopular