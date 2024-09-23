import React from 'react'
import { useNavigate } from 'react-router-dom'
import { albumsData, assets, songsData } from '../assets/assets'
import NavBar from './NavBar'
import ArtistItems from './ArtistItems'
import AlbumItems from './AlbumItems'
import Footer from './Footer'

const FullAlbums = () => {
  return (
    <div>
        <NavBar/>
            <div className='mb-4 pt-10'>
                <div className='flex justify-between'>
                    <h1 className='my-4 font-bold text-2xl'>Album đề xuất đề xuất</h1>
                    <h1 className='font-bold mr-3 cursor-pointer' onClick={()=>navigate(`/albums`)}> Xem tất cả</h1>
                </div>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
                    {albumsData.map((item, index) => (
                    <AlbumItems key={index} name={item.name} desc={item.desc} id={item.id} img={item.image} />
                    ) )}
                </div>
                
                </div>
            <Footer/>

    </div>
  )
}

export default FullAlbums