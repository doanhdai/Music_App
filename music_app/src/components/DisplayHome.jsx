import React from 'react'
import NavBar from './NavBar'
import { albumsData } from '../assets/assets'
import { songsData } from '../assets/assets'
import AlbumItems from './AlbumItems'
import SongItems from './SongItems'
const DisplayHome = () => {
  return (
    <>
        <NavBar/>
        <div className='mb-4 '>
          <h1 className='my-4 font-bold'>Featured charts</h1>
          <div className='flex overflow-auto'>
            {albumsData.map((item, index) => (
              <AlbumItems key={index} name={item.name} desc={item.desc} id={item.id} img={item.image} />
            ) )}
          </div>
          
        </div>
        <div className='mb-4 '>
          <h1 className='my-4 font-bold'>Featured charts</h1>
          <div className='flex overflow-auto'>
            {songsData.map((item, index) => (
              <SongItems key={index} name={item.name} desc={item.desc} id={item.id} img={item.image} />
            ))}
          </div>
          
        </div>
    </>
  )
}

export default DisplayHome