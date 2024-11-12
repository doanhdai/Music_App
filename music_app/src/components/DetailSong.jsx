import React, { useContext, useState } from "react";
import { albumsData, assets, songsData } from "../assets/assets";
import { Link, useParams } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoIosMore, IoMdPause } from "react-icons/io";
import ArtistItems from "./ArtistItems";
import AlbumItems from "./AlbumItems";
import SongItems from "./SongItems";
import { PlayerContext } from "../context/PlayerContext";
import { IoAddCircleOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdMore } from "react-icons/io";


const DetailSong = () => {
  const [menuSongId, setMenuSongId] = useState(null);

  const toggleMenu = (songId) => {
    setMenuSongId(menuSongId === songId ? null : songId);
    console.log(songId);
  };
  const closeMenu = () => setMenuSongId(null);
  const comments = [
    {
      id: 1,
      userName: "Đài snack",
      userImage: assets.mck,
      content: "Đạo nhạc chắc luôn",
    },
    {
      id: 2,
      userName: "Oanh Le",
      userImage: assets.mck,
      content: "suy quá",
    },
    {
      id: 3,
      userName: "Giai Tuấn",
      userImage: assets.mck,
      content: "ko phải gu",
    },
  ];
  const { id } = useParams();
  const albumData = albumsData[id];
  console.log(albumData);
  const { playWithId, playStatus, pause, track } = useContext(PlayerContext);

  return (
    <div onClick={closeMenu}>
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-col">
        <img className="w-48 rounded" src={assets.mck}></img>
        <div className="flex flex-col justify-center">
          <p>Bài hát</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">Anh đã ổn hơn</h2>
          <p className="mt-1 flex items-center">
              <img className="w-5" src={assets.spotify_logo}></img>
              <span className="pl-2">MCK -</span>
              <span className="pl-2">234.321 yêu thích - </span>
              <span className="pl-2">12/12/2024</span>
          </p>
          <p className="mt-4 flex items-center">POP, R&B</p>
        </div>
      </div>
      <div>
        <div className="mt-10">
          <div className="flex gap-10 items-center">
            <button className="w-[60px] h-[60px] rounded-full bg-[#E0066F] flex justify-center items-center">
              {playStatus ? (
                <IoMdPause onClick={pause} size={20} />
              ) : (
                <FaPlay onClick={() => playWithId(id)} />
              )}
            </button>

            <button>
              <FaRegHeart size={30} />
            </button>
            <IoIosMore size={30} />
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-5">
        <div className="flex items-center">
          <img
            className="rounded-full h-[70px] text-[#fff]"
            src={assets.mck}
          ></img>
          <div className="ml-5 flex flex-col">
            <h6 className="text-[#bbbbbb]">Nghệ sĩ</h6>
            <b className="uppercase">mck</b>
          </div>
        </div>
        <div className="flex items-center my-5">
          <img
            className="rounded-full h-[70px] text-[#fff]"
            src={assets.mck}
          ></img>
          <div className="ml-5 flex flex-col">
            <h6 className="text-[#bbbbbb]">Nghệ sĩ</h6>
            <b className="uppercase">mck</b>
          </div>
        </div>
        <div className="flex items-center">
          <img
            className="rounded-full h-[70px] text-[#fff]"
            src={assets.mck}
          ></img>
          <div className="ml-5 flex flex-col">
            <h6 className="text-[#bbbbbb]">Nghệ sĩ</h6>
            <b className="uppercase">mck</b>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-xl mb-5">
        <div className="mx-4 py-4">
          <h2 className="font-bold text-xl">Bình luận {comments.length}</h2>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="flex items-center my-4 justify-between"
              >
                <div className="flex items-center">
                  <img
                    className="rounded-full w-9 h-9"
                    src={comment.userImage}
                    alt={comment.userName}
                  />
                  <div className="ml-4 flex flex-col">
                    <div className="flex items-center">
                      <b className="text-[#E0066F]">{comment.userName}</b>
                      <span className="ml-4 text-xs text-[#bbbbbb]">
                        10/20/2024
                      </span>
                    </div>
                    <p className="text-xs text-[#bbbbbb]">{comment.content}</p>
                  </div>
                </div>
                <div className="text-[15px] flex justify-center relative">
                <IoMdMore 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu(comment.id);
                  }}
                />                  
                  {menuSongId === comment.id && (
                    <div className="absolute bottom-8 right-0 bg-gray-800 text-white p-2 rounded shadow-lg !z-50 w-[80px]">
                      <div className="cursor-pointer flex items-center gap-2">
                        {" "}
                        <AiOutlineDelete size={18}/>
                        Xóa
                      </div>

                    </div>
                  )
                  
                  }

                </div>

              </div>
            ))
          ) : (
            <p className=" text-[#bbbbbb] flex justify-center my-10 text-sm">
              Chưa có bình luận
            </p>
          )}
        </div>

        <div className="flex flex-col pb-3">
          <label>Viết bình luận</label>
          <textarea className="bg-black rounded-lg border-pink-400"></textarea>
        </div>
      </div>

      <div className="mb-4 pt-6">
        <div className="flex justify-between">
          <h1 className="my-4 font-bold text-2xl">Bài hát đề xuất</h1>
          <Link
            to="/artist"
            className="text-slate-200 font-bold mr-3 cursor-pointer hover:text-white"
          >
            {" "}
            Xem tất cả
          </Link>
        </div>
        <div className="flex overflow-auto">
          {songsData.map((item, index) => (
            <SongItems
              key={index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              img={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailSong;
