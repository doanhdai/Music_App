import React from 'react'
import NavBar from './NavBar'
import { useParams } from 'react-router-dom'
import { albumsData, assets, songsData } from '../assets/assets'

const DisplayAlbum = () => {
    const {id} = useParams()
    const albumData=albumsData[id]
    console.log(albumData)


  return (
    <>

        <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-col'>
            <img className='w-48 rounded' src={albumData.image}></img>
            <div className='flex flex-col justify-center'>
                <p>Playlist</p>
                <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{albumData.name}</h2>
                <p className='mt-1'>
                    <img className='inline-block w-5' src={assets.spotify_logo}></img>
                    <b className='pl-2'>Spotify -</b>
                    <b className='pl-2'>234.321 yêu thích,</b>
                    <b className='pl-2'>23 bài hát</b>
                </p>
            </div>
        </div>
        <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
            <p>
                <b className='mr-4'>
                    #
                </b>
                Title
            </p>
            <p>Album</p>
            <p className='hidden sm:block'>Ngày thêm</p>
            <img className='m-auto w-4 ' src={assets.clock_icon}></img>
        </div>
        <hr />
        {
            songsData.map((item, index)=>(
                <div key={index} className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] items-center hover:bg-[#ffffff2b] cursor-pionter'>
                    <p className='text-white'>
                        <b>{index + 1}</b>
                        <img className='inline w-10 mx-4 ' src={item.image}/>
                        {item.name}
                    </p>
                    <p className='text-[15px]'>{albumData.name}</p>
                    <p className='text-[15px] hidden sm:block'>2 ngày trước</p>
                    <p className='text-[15px] text-center'>{item.duration}</p>

                </div>
            ))
        }
    </>
  )
}

export default DisplayAlbum