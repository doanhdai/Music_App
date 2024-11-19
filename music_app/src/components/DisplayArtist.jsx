import React, { useContext, useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoIosMore, IoMdPause } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { albumsData, artistData, assets, songsData } from "../assets/assets";
import AlbumItems from "./AlbumItems";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdArrowCircleDown } from "react-icons/md";
import { PlayerContext } from "../context/PlayerContext";
import axios from "axios";
const DisplayArtist = () => {
  const url_api = "http://localhost:8000";
  const { playWithId, playStatus, track, pause } = useContext(PlayerContext);

  const { id } = useParams();
  const [hoveredSong, setHoveredSong] = useState(null);
  const [menuSongId, setMenuSongId] = useState(null);

  const [detailArtist, setDetailArtist] = useState([]);
  const [songsArtist, setSongsArtist] = useState([]);

  const getSongByArtistsData = async () => {
    try {
      const response = await axios.get(`${url_api}/api/songs/artist/${id}`);
      const artistData = response.data.data[0];
      if (artistData) {
        setDetailArtist(artistData);
        // console.log(artistData);
        setSongsArtist(artistData.bai_hat);
        // console.log(artistData.bai_hat);
      } else {
        console.log("Không tìm thấy nghệ sĩ.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSongByArtistsData();
  }, []);
  const toggleMenu = (songId) => {
    setMenuSongId(menuSongId === songId ? null : songId);
    console.log(songId);
  };
  const closeMenu = () => setMenuSongId(null);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };
  return (
    <div onClick={closeMenu}>
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-col">
        <img className="w-48 rounded" src={detailArtist.hinh_anh}></img>
        <div className="flex flex-col justify-center">
          <p>Nghệ sĩ</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {detailArtist.ten_artist}
          </h2>
          <p className="mt-1 flex items-center">
            <img className="w-5" src={assets.spotify_logo}></img>
            {/* <b className="pl-2">TLinh -</b> */}
            <b className="pl-2">{songsArtist.length} bài hát</b>
          </p>
        </div>
      </div>

      <div>
        <div className="mt-10">
          <div className="flex gap-10 items-center">
            <button className="w-[60px] h-[60px] rounded-full bg-[#E0066F] flex justify-center items-center">
              {playStatus ? (
                <IoMdPause onClick={pause} size={20} />
              ) : (
                <FaPlay onClick={() => playWithId(songsArtist.ma_bai_hat)} />
              )}
            </button>

            {/* <IoIosMore size={30}/> */}
          </div>
        </div>
        <h1 className="font-bold text-2xl mt-7 mb-5">Danh sách phát</h1>
        <div className="grid grid-cols-7 sm:grid-cols-[0.3fr_2.8fr_3fr_2fr_2fr_1.5fr_1fr] mb-4 pl-2 text-[#fff]">
          <b className="">#</b>
          <p className="ml-4">Title</p>
          <p>Album</p>
          <p className="hidden sm:block">Ngày thêm</p>
          <p>Lượt nghe</p>
          <img className="m-auto w-4 " src={assets.clock_icon}></img>
          <p className="flex justify-center">thêm</p>
        </div>

        <hr />

        {songsArtist.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-7 sm:grid-cols-[0.3fr_2.8fr_3fr_2fr_2fr_1.5fr_1fr] mt-10 mb-4 pl-2 text-[#fff] items-center hover:bg-[#ffffff2b] cursor-pointer"
            onMouseEnter={() => setHoveredSong(index)}
            onMouseLeave={() => setHoveredSong(null)}
          >
            {playStatus && track.ma_bai_hat === item.ma_bai_hat ? (
              <p>
                {hoveredSong === index ? (
                  <IoMdPause onClick={pause} size={13} />
                ) : (
                  index + 1
                )}
              </p>
            ) : (
              <p>
                {hoveredSong === index ? (
                  <FaPlay
                    onClick={() => playWithId(item.ma_bai_hat)}
                    size={13}
                  />
                ) : (
                  index + 1
                )}
              </p>
            )}
            <Link to="/song/1" className="text-white flex items-center pr-2">
              <img className="inline w-10 mx-4 " src={item.hinh_anh} />
              {item.ten_bai_hat}
            </Link>
            <p className="text-[15px]">{item.album}</p>
            <p className="text-[15px] hidden sm:block">{formatDate(item.ngay_phat_hanh)}</p>
            <p className="text-[15px]">{item.luot_nghe}</p>
            <p className="text-[15px] text-center">{item.ngay_phat_hanh}</p>
            <div className="text-[15px] flex justify-center relative">
              {menuSongId === item.ma_bai_hat && (
                <div className="absolute bottom-8 right-0 bg-gray-800 text-white p-2 rounded shadow-lg !z-50 w-[250px]">
                  <div className="hover:bg-black p-2 cursor-pointer flex items-center gap-2">
                    {" "}
                    <IoAddCircleOutline size={20} />
                    Thêm vào danh sách phát
                  </div>
                  <div className="hover:bg-black p-2 cursor-pointer flex items-center gap-2">
                    {" "}
                    <MdArrowCircleDown size={20} />
                    Tải xuống
                  </div>
                </div>
              )}
              <IoIosMore
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMenu(item.ma_bai_hat);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mb-4 pt-10">
        <div className="flex justify-between">
          <h1 className="my-4 font-bold text-2xl">Danh sách album</h1>
          <h1
            className="font-bold mr-3 cursor-pointer"
            onClick={() => navigate(`/albums`)}
          >
            {" "}
            Xem tất cả
          </h1>
        </div>
        <div className="flex overflow-auto">
          {albumsData.map((item, index) => (
            <AlbumItems
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
export default DisplayArtist;
