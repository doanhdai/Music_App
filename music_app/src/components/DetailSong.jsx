import React from 'react'
import { albumsData, assets, songsData } from '../assets/assets'
import { Link, useParams } from 'react-router-dom';
import { FaPlay } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";



import ArtistItems from './ArtistItems'
import AlbumItems from './AlbumItems';
import SongItems from './SongItems';



const DetailSong = () => {
    const { id } = useParams();
    const albumData = albumsData[id];
    console.log(albumData);

  return (
    <>
        <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-col">
            <img className="w-48 rounded" src={assets.mck}></img>
            <div className="flex flex-col justify-center">
            <p>Bài hát</p>
            <h2 className="text-5xl font-bold mb-4 md:text-7xl">
                Anh đã ổn hơn
            </h2>
            <p className="mt-1 flex items-center">
                <img className="w-5" src={assets.spotify_logo}></img>
                <b className="pl-2">MCK -</b>
                <b className="pl-2">234.321 yêu thích</b>
            </p>
                
            </div>
        </div>
        <div>
          <div className="mt-10">
            <div className="flex gap-10 items-center">
              <button className="w-[60px] h-[60px] rounded-full bg-[#C26482] flex justify-center items-center"><FaPlay /></button>
              
              <button><FaRegHeart size={30} /></button>
              <IoIosMore size={30} />
            </div>
          </div>
        </div>
        <div className='mt-10'>
          <div className='flex items-center my-5'>
            <img className='rounded-full h-[70px] text-[#fff]' src={assets.mck}></img>
            <div className='ml-5 flex flex-col'>
              <h7 className='text-[#bbbbbb]'>Nghệ sĩ</h7>
              <b className='uppercase'>mck</b>
            </div>
          </div>
          <div className='flex items-center my-5'>
            <img className='rounded-full h-[70px] text-[#fff]' src={assets.mck}></img>
            <div className='ml-5 flex flex-col'>
              <h7 className='text-[#bbbbbb]'>Nghệ sĩ</h7>
              <b className='uppercase'>mck</b>
            </div>
          </div>
          <div className='flex items-center'>
            <img className='rounded-full h-[70px] text-[#fff]' src={assets.mck}></img>
            <div className='ml-5 flex flex-col'>
              <h7 className='text-[#bbbbbb]'>Nghệ sĩ</h7>
              <b className='uppercase'>mck</b>
            </div>
          </div>
        </div>


        <div className='mb-4 pt-6'>
          <div className='flex justify-between'>
            <h1 className='my-4 font-bold text-2xl'>Bài hát đề xuất</h1>
            <Link to='/artist' className='text-slate-200 font-bold mr-3 cursor-pointer hover:text-white'> Xem tất cả</Link>
          </div>
          {/* <h1 className='my-4 font-bold'>Nghệ sĩ đề xuất</h1> */}
          <div className='flex overflow-auto'>
            {songsData.map((item, index) => (
              <SongItems key={index} name={item.name} desc={item.desc} id={item.id} img={item.image} />
            ))}
          </div>
          
        </div>

    </>
  )
}

export default DetailSong