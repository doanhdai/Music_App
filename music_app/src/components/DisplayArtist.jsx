import React from "react";
import { FaPlay } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { albumsData, artistData, assets, songsData} from "../assets/assets";
import AlbumItems from './AlbumItems'
const DisplayArtist = () => {
  const { id } = useParams();
  const artistDatas = artistData[id];
  console.log(artistDatas);

  return (
    <>
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-col">
        <img className="w-48 rounded" src={artistDatas.image}></img>
        <div className="flex flex-col justify-center">
          <p>Nghệ sĩ</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {artistDatas.name}
          </h2>
          <p className="mt-1 flex items-center">
            <img className="w-5" src={assets.spotify_logo}></img>
            <b className="pl-2">TLinh -</b>
            <b className="pl-2">23 bài hát</b>
          </p>
        </div>
      </div>

      <div>

        <div className="mt-10">
          <div className="flex gap-10 items-center">
            <button className="w-[60px] h-[60px] rounded-full bg-[#E0066F] flex justify-center items-center"><FaPlay /></button>
            
            <IoIosMore size={30}/>
          </div>
        </div>
        <h1 className="font-bold text-2xl mt-7 mb-5">Danh sách phát</h1>
        <div className="grid grid-cols-5 sm:grid-cols-[3.5fr_3fr_2fr_2fr_1.5fr_1fr] mb-4 pl-2 text-[#fff]">
          <p>
            <b className="mr-4">#</b>
            Title
          </p>
          <p>Album</p>
          <p className="hidden sm:block">Ngày thêm</p>
          <p>Lượt nghe</p>
          <img className="m-auto w-4 " src={assets.clock_icon}></img>
          <p className="flex justify-center">thêm</p>
        </div>

        <hr />

        {songsData.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-5 sm:grid-cols-[3.5fr_3fr_2fr_2fr_1.5fr_1fr] mt-10 mb-4 pl-2 text-[#fff] items-center hover:bg-[#ffffff2b] cursor-pointer"
          >
            <Link to='/song/1' className="text-white">
              <b>{index + 1}</b>
              <img className="inline w-10 mx-4 " src={item.image} />
              {item.name}
            </Link>
            <p className="text-[15px]">{artistDatas.name}</p>
            <p className="text-[15px] hidden sm:block">2 ngày trước</p>
            <p className="text-[15px]">1.000.950</p> {/* Cột Lượt nghe */}
            <p className="text-[15px] text-center">{item.duration}</p>
            <p className="text-[15px] flex justify-center"><IoIosMore /></p> {/* Cột Lượt nghe */}
          </div>
        
      ))}

      </div>
      <div className='mb-4 pt-10'>
          <div className='flex justify-between'>
            <h1 className='my-4 font-bold text-2xl'>Danh sách album</h1>
            <h1 className='font-bold mr-3 cursor-pointer' onClick={()=>navigate(`/albums`)}> Xem tất cả</h1>
          </div>
          <div className='flex overflow-auto'>
            {albumsData.map((item, index) => (
              <AlbumItems key={index} name={item.name} desc={item.desc} id={item.id} img={item.image} />
            ) )}
          </div>
          
        </div>
    </>
  );
};
export default DisplayArtist;
