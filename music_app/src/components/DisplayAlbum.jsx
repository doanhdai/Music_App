import React, { useContext, useEffect, useState } from "react";
import { FaPlay, FaRegHeart } from "react-icons/fa";
import { IoIosMore, IoMdPause } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { albumsData, assets, songsData } from "../assets/assets";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdArrowCircleDown } from "react-icons/md";
import { PlayerContext } from "../context/PlayerContext";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
const DisplayAlbum = () => {
  const { playWithId, playStatus, pause, track } = useContext(PlayerContext);
  const url_api = "http://localhost:8000";

  const { id } = useParams();
  const [hoveredSong, setHoveredSong] = useState(null);
  const [menuSongId, setMenuSongId] = useState(null);
  const [detailAlbum, setDetailAlbum] = useState([]);
  const [songsAlbum, setSongsAlbum] = useState([])
 
  const getSongByAlbumsData = async () => {
    try {
      const response = await axios.get(`${url_api}/api/albums/${id}/songs`);
      setDetailAlbum(response.data.album);
      setSongsAlbum(response.data.album.songs);
      // console.log(response.data.album);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getSongByAlbumsData();
  }, []);

  const toggleMenu = (songId) => {
    setMenuSongId(menuSongId === songId ? null : songId);
    console.log(songId);
  };

  const closeMenu = () => setMenuSongId(null);

  const [isFavourite, setIsFavourite] = useState(false);

  const handleFavourite = () => {
    setIsFavourite(!isFavourite);
  };

  return (
    <div onClick={closeMenu}>
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-col">
        <img
          className="w-48 h-48 rounded"
          src={detailAlbum.hinh_anh}
          alt={detailAlbum.ten_album}
        />
        <div className="flex flex-col justify-center">
          <p>Album</p>
          <h1 className="text-5xl font-bold mb-4 md:text-7xl">
            {detailAlbum.ten_album}
          </h1>
          <p className="mt-1 flex items-center">
            <img className="w-5" src={assets.spotify_logo} alt="Spotify Logo" />
            <b className="pl-2">{detailAlbum.nguoi_so_huu} -</b>
            <b className="pl-2">{detailAlbum.luot_yeu_thich} yêu thích,</b>
            <b className="pl-2">{detailAlbum.so_luong_bai_hat} bài hát</b>
          </p>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex gap-10 items-center">
          <button className="w-[60px] h-[60px] rounded-full bg-[#E0066F] flex justify-center items-center">
            {playStatus ? (
              <IoMdPause onClick={pause} size={20} />
            ) : (
              <FaPlay onClick={() => playWithId(id)} />
            )}
          </button>
          <button onClick={handleFavourite}>
            {isFavourite ? (
              <FaHeart color="red" size={30} />
            ) : (
              <FaRegHeart size={30} />
            )}
          </button>
          <IoIosMore
            size={30}
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu(-1);
            }}
          />
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

      {songsAlbum.map((item, index) => (
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
                <FaPlay onClick={() => playWithId(item.ma_bai_hat)} size={13} />
              ) : (
                index + 1
              )}
            </p>
          )}
          <Link to="/song/1" className="text-white flex items-center pr-2">
            <img className="inline w-10 mx-4 " src={item.hinh_anh} />
            {item.ten_bai_hat}
          </Link>
          <p className="text-[15px]">{detailAlbum.ten_album}</p>
          <p className="text-[15px] hidden sm:block">{item.ngay_phat_hanh}</p>
          <p className="text-[15px]">{item.luot_nghe}</p>
          <p className="text-[15px] text-center">{item.thoi_luong}</p>
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
                toggleMenu(item.id);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayAlbum;
