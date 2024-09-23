import React from 'react'
import NavBar from './NavBar'
import { albumsData } from '../assets/assets'
import { songsData } from '../assets/assets'
import AlbumItems from './AlbumItems'
import SongItems from './SongItems'
import ArtistItems from './ArtistItems'
import { useNavigate } from 'react-router-dom'

import Footer from './Footer'
const DisplayHome = () => {

      const navigate= useNavigate()

  return (
    <>
        <NavBar/>

        {/* nghệ sĩ */}
        <div className='mb-4 pt-6'>
          <div className='flex justify-between'>
            <h1 className='my-4 font-bold text-2xl'>Nghệ sĩ đề xuất</h1>
            <h1 className='text-slate-200 font-bold mr-3 cursor-pointer hover:text-white'  onClick={()=>navigate(`/artist`)}> Xem tất cả</h1>
          </div>
          {/* <h1 className='my-4 font-bold'>Nghệ sĩ đề xuất</h1> */}
          <div className='flex overflow-auto'>
            {albumsData.map((item, index) => (
              <ArtistItems key={index} name={item.name} desc={item.desc} id={item.id} img={item.image} />
            ) )}
          </div>
          
        </div>

            {/* bài hát */}
        <div className='mb-4 pt-10'>
          <div className='flex justify-between'>
            <h1 className='my-4 font-bold text-2xl'>Album đề xuất đề xuất</h1>
            <h1 className='font-bold mr-3 cursor-pointer' onClick={()=>navigate(`/albums`)}> Xem tất cả</h1>
          </div>
          <div className='flex overflow-auto'>
            {albumsData.map((item, index) => (
              <AlbumItems key={index} name={item.name} desc={item.desc} id={item.id} img={item.image} />
            ) )}
          </div>
          
        </div>

            {/* album đề xuất  */}
        <div className='mb-4 pt-10'>
          <div className='flex justify-between'>
            <h1 className='my-4 font-bold text-2xl'>Bài hát thịch hành</h1>
            <h1 className='font-bold mr-3 cursor-pointer' onClick={()=>navigate(`/songs`)}> Xem tất cả</h1>
          </div>
          <div className='flex overflow-auto'>
            {songsData.map((item, index) => (
              <SongItems key={index} name={item.name} desc={item.desc} id={item.id} img={item.image} />
            ))}
          </div>
          
        </div>
        <Footer/>
        
    </>
  )
}

export default DisplayHome