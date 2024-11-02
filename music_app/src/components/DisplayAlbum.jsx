import React, { useState } from "react";
import { FaPlay, FaRegHeart } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { albumsData, assets, songsData } from "../assets/assets";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdArrowCircleDown } from "react-icons/md";
const DisplayAlbum = () => {
  const { id } = useParams();
  const albumData = albumsData[id];

  const [menuSongId, setMenuSongId] = useState(null);

  const toggleMenu = (songId) => {
    setMenuSongId(menuSongId === songId ? null : songId);
    console.log(songId)
  };

  const closeMenu = () => setMenuSongId(null);

  return (
    <div onClick={closeMenu}>
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-col">
        <img className="w-48 rounded" src={albumData.image} alt={albumData.name} />
        <div className="flex flex-col justify-center">
          <p>Album</p>
          <h1 className="text-5xl font-bold mb-4 md:text-7xl">{albumData.name}</h1>
          <p className="mt-1 flex items-center">
            <img className="w-5" src={assets.spotify_logo} alt="Spotify Logo" />
            <b className="pl-2">TLinh -</b>
            <b className="pl-2">234.321 yêu thích,</b>
            <b className="pl-2">23 bài hát</b>
          </p>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex gap-10 items-center">
          <button className="w-[60px] h-[60px] rounded-full bg-[#E0066F] flex justify-center items-center">
            <FaPlay />
          </button>
          <button><FaRegHeart size={30} /></button>
          <IoIosMore size={30} onClick={(e) => { e.stopPropagation(); toggleMenu(-1); }} />
        </div>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-[3.5fr_3fr_2fr_2fr_1.5fr_1fr] mt-7 mb-4 pl-2 text-[#fff]">
        <p>
          <b className="mr-4">#</b>
          Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Ngày thêm</p>
        <p>Lượt nghe</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="Clock Icon" />
        <p className="flex justify-center">Thêm</p>
      </div>

      <hr />

      {songsData.map((item) => (
        <div
          key={item.id}
          className="relative grid grid-cols-5 sm:grid-cols-[3.5fr_3fr_2fr_2fr_1.5fr_1fr] mt-10 mb-4 pl-2 text-[#fff] items-center hover:bg-[#ffffff2b] cursor-pointer"
        >
          <Link to={`/song/${item.id}`} className="text-white">
            <b>{item.id}</b>
            <img className="inline w-10 mx-4" src={item.image} alt={item.name} />
            {item.name}
          </Link>
          <Link to={`/song/${item.id}`} className="text-[15px]">{albumData.name}</Link>
          <p className="text-[15px] hidden sm:block">2 ngày trước</p>
          <p className="text-[15px]">1.000.950</p>
          <p className="text-[15px] text-center">{item.duration}</p>
          <div className="text-[15px] flex justify-center relative">
             {menuSongId === item.id && (
              <div className="absolute bottom-8 right-0 bg-gray-800 text-white p-2 rounded shadow-lg !z-50 w-[250px]">
                <div className="hover:bg-black p-2 cursor-pointer flex items-center gap-2"> <IoAddCircleOutline size={20} />Thêm vào danh sách phát</div>
                <div className="hover:bg-black p-2 cursor-pointer flex items-center gap-2"> <MdArrowCircleDown size={20} />Tải xuống</div>
              </div>
            )}
            <IoIosMore onClick={(e) => { e.stopPropagation(); toggleMenu(item.id); }} />
           
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayAlbum;
