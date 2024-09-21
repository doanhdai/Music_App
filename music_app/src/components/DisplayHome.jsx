import React from 'react'
import NavBar from './NavBar'
import { albumsData } from '../assets/assets'
import { songsData } from '../assets/assets'
import AlbumItems from './AlbumItems'
import SongItems from './SongItems'
import ArtistItems from './ArtistItems'
import Footer from './Footer'
const DisplayHome = () => {
  return (
    <>
        <NavBar/>

        {/* nghệ sĩ */}
        <div className='mb-4 pt-10'>
          <h1 className='my-4 font-bold'>Nghệ sĩ đề xuất</h1>
          <div className='flex overflow-auto'>
            {albumsData.map((item, index) => (
              <ArtistItems key={index} name={item.name} desc={item.desc} id={item.id} img={item.image} />
            ) )}
          </div>
          
        </div>

            {/* bài hát */}
        <div className='mb-4 pt-10'>
          <h1 className='my-4 font-bold'>Top các bài hát thịch hành</h1>
          <div className='flex overflow-auto'>
            {albumsData.map((item, index) => (
              <AlbumItems key={index} name={item.name} desc={item.desc} id={item.id} img={item.image} />
            ) )}
          </div>
          
        </div>

            {/* album đề xuất  */}
        <div className='mb-4 pt-10'>
          <h1 className='my-4 font-bold'>Album đề xuất</h1>
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