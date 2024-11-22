import React, { useContext, useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IoIosMore, IoMdPause } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import { albumsData, assets } from "../assets/assets";
import AlbumItems from "./AlbumItems";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdArrowCircleDown } from "react-icons/md";
import { PlayerContext } from "../context/PlayerContext";
import axios from "axios";

const DisplayPlaylist = () => {
  const { playStatus, playWithId, pause, track } = useContext(PlayerContext);
  const { id } = useParams();
  // console.log(songsPlaylist);
  const navigate = useNavigate();
  const [menuSongId, setMenuSongId] = useState(null);
  const [hoveredSong, setHoveredSong] = useState(null);
  const [detailPlaylist, setDetailPlaylist] = useState([]);
  const [songsPlaylist, setSongsPlaylist] = useState([]);


  const url_api = "http://localhost:8000";

  
  const getSongByAlbumsData = async () => {
    try {
      const response = await axios.get(
        `${url_api}api/playlist/ACC0008/${id}`
      );
      const playlistData = response.data.data[0];
      setDetailPlaylist(playlistData.data);
      setSongsPlaylist(playlistData.bai_hat);
      console.log(playlistData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSongByAlbumsData();
  }, []);

  const toggleMenu = (songId) => {
    setMenuSongId(menuSongId === songId ? null : songId);
  };
  const closeMenu = () => setMenuSongId(null);

  return (
    <div onClick={closeMenu}>
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-col">
        <img className="w-48 rounded" src={assets.mck} alt="Playlist cover" />
        <div className="flex flex-col justify-center">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {detailPlaylist.ten_playlist}
          </h2>
          <p className="mt-1 flex items-center">
            <img className="w-5" src={assets.spotify_logo} alt="Spotify logo" />
            <b className="pl-2">Đài -</b>
            <b className="pl-2">{songsPlaylist.length} bài hát</b>
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
          </div>
        </div>
        <h1 className="font-bold text-2xl mt-7 mb-5">Danh sách phát</h1>
        <div className="grid grid-cols-5 sm:grid-cols-[0.2fr_2.8fr_2fr_0.5fr] mb-4 pl-2 text-[#fff]">
          <b className="mr-4">#</b>
          <p> Title</p>
          <p>Album</p>
          {/* <img
            className="m-auto w-4"
            src={assets.clock_icon}
            alt="Clock icon"
          /> */}
          <p className="flex justify-center">Thêm</p>
        </div>

        <hr />

        {songsPlaylist.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-5 sm:grid-cols-[0.2fr_2.8fr_2fr_0.5fr] mt-10 mb-4 pl-2 text-[#fff] items-center hover:bg-[#ffffff2b] cursor-pointer"
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
            <Link to={`/song/${item.ma_bai_hat}`} className="text-white">
              <img
                className="inline w-10 mr-4"
                src={assets.mck}
                alt="Song cover"
              />
              {item.ten_bai_hat}
            </Link>
            <p className="text-[15px]">{item.album}</p>
            <div className="text-[15px] flex justify-center relative">
              {menuSongId === item.ma_bai_hat && (
                <div className="absolute bottom-8 right-0 bg-gray-800 text-white p-2 rounded shadow-lg !z-50 w-[250px]">
                  <div className="hover:bg-black p-2 cursor-pointer flex items-center gap-2">
                    <IoAddCircleOutline size={20} />
                    Xóa khỏi playlist
                  </div>
                  <div className="hover:bg-black p-2 cursor-pointer flex items-center gap-2">
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
      {/* <div className="mb-4 pt-10">
        <div className="flex justify-between">
          <h1 className="my-4 font-bold text-2xl">Danh sách album</h1>
          <h1
            className="font-bold mr-3 cursor-pointer"
            onClick={() => navigate("/albums")}
          >
            Xem tất cả
          </h1>
        </div>
        <div className="flex overflow-auto">
          {songsPlaylist.map((item, index) => (
            <AlbumItems
              key={item.ma_bai_hat}
              name={item.ten_bai_hat}
              id={item.ma_bai_hat}
              img={item.hinh_anh}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default DisplayPlaylist;
