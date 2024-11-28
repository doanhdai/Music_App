import React, { useContext, useEffect, useState } from "react";
import { FaHeart, FaPlay, FaRegHeart } from "react-icons/fa";
import { IoMdPause } from "react-icons/io";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";

import { CiCircleMinus } from "react-icons/ci";
import { PlayerContext } from "../context/PlayerContext";
import axios from "axios";

const DisplayPlaylist = () => {
  const {
    playStatus,
    playWithId,
    pause,
    track,
    playlistsData,
    currentAccount,
    songsData,
    songDataById,
    setSongDataById,
    play,
    handleClickLikeUpdateGUI,
    playlistId,
    setPlaylistId,
    isGettingPlaylistData,
    setIsGettingPlaylistData
  } = useContext(PlayerContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [menuSongId, setMenuSongId] = useState(null);
  const [hoveredSong, setHoveredSong] = useState(null);
  const [likedSongs, setLikedSongs] = useState({});
  const [accLikeSong, setAccLikeSong] = useState([]);
  const [songsPlaylist, setSongsPlaylist] = useState([]);
  const url_api = "http://localhost:8000";
  const getSongPlaylistsData = async () => {
    try {
      const response = await axios.get(
        `${url_api}/api/playlist/${currentAccount}/${id}`
      );

      setSongsPlaylist(response.data.data);
      setIsGettingPlaylistData(false);
      setSongDataById(
        songsData.filter((item) =>
          response.data.data.some(
            (item1) => item.ma_bai_hat == item1.ma_bai_hat
          )
        )
      );

      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSongPlaylistsData();
    getAccLikesData();
  }, [playlistId, setPlaylistId]);
  useEffect(() => {
    const likedFromStorage = {};
    accLikeSong.forEach((like) => {
      if (like.ma_tk === currentAccount) {
        likedFromStorage[like.ma_bai_hat] = true;
      }
    });

    setLikedSongs(likedFromStorage);
  }, [accLikeSong]);
  const getAccLikesData = async () => {
    try {
      const response = await axios.get(`${url_api}/api/song-likes`);
      setAccLikeSong(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLikeSong = async (ma_bai_hat) => {
    const isLikedSong = likedSongs[ma_bai_hat];
    handleClickLikeUpdateGUI(isLikedSong == undefined ? true : false, ma_bai_hat);
    if (!isLikedSong) {
      setLikedSongs((prev) => ({ ...prev, [ma_bai_hat]: true }));

      try {
        await axios.post(`${url_api}/api/song-likes`, {
          ma_tk: currentAccount,
          ma_bai_hat: ma_bai_hat,
        });
      } catch (error) {
        console.error("Lỗi khi like bài hát:", error);
        setLikedSongs((prev) => ({ ...prev, [ma_bai_hat]: false }));
      }
    } else {
      setLikedSongs((prev) => ({ ...prev, [ma_bai_hat]: false }));

      try {
        await axios.delete(`${url_api}/api/song-likes`, {
          data: {
            ma_tk: currentAccount,
            ma_bai_hat: ma_bai_hat,
          },
        });
      } catch (error) {
        console.error("Lỗi khi bỏ like bài hát:", error);
        setLikedSongs((prev) => ({ ...prev, [ma_bai_hat]: true }));
      }
    }
  };

  const handleDeleteSong = async (idBaiHat) => {
    try {
      // Gọi API để xóa bài hát
      await axios.delete(
        `${url_api}/api/playlist/${currentAccount}/${id}/${idBaiHat}`
      );

      // Cập nhật lại danh sách bài hát sau khi xóa
      setSongsPlaylist((prevSongs) =>
        prevSongs.filter((song) => song.ma_bai_hat !== idBaiHat)
      );
    } catch (error) {
      console.error("Lỗi khi xóa bài hát:", error);
    }
  };
  const toggleMenu = (songId) => {
    setMenuSongId(menuSongId === songId ? null : songId);
  };
  const closeMenu = () => setMenuSongId(null);
  const detailPlaylist = playlistsData?.find(
    (playlist) => playlist.ma_playlist === id
  );
  const handleClickBtnPlay = () => {
    const storedState = localStorage.getItem("musicPlayerState");
    const currentState = storedState ? JSON.parse(storedState) : "";
    if (currentState == "") {
      playWithId(songsPlaylist[0].ma_bai_hat);
    } else {
      const index = songDataById.findIndex(
        (item) => item.ma_bai_hat == currentState.track.ma_bai_hat
      );
      if (index == -1) {
        playWithId(songsPlaylist[0].ma_bai_hat);
      } else {
        play();
      }
    }
  };
  return (
    <>
      {detailPlaylist && !isGettingPlaylistData ? (
        <div onClick={closeMenu}>
          <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-col">
            <img
              className="w-48 rounded"
              src={assets.mck}
              alt="Playlist cover"
            />
            <div className="flex flex-col justify-center">
              <p>Playlist</p>
              <h2 className="text-5xl font-bold mb-4 md:text-7xl">
                {detailPlaylist.ten_playlist}
              </h2>
              <p className="mt-1 flex items-center">
                <img
                  className="w-5"
                  src={assets.spotify_logo}
                  alt="Spotify logo"
                />
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
                    <FaPlay onClick={() => handleClickBtnPlay()} />
                  )}
                </button>
              </div>
            </div>
            <h1 className="font-bold text-2xl mt-7 mb-5">Danh sách phát</h1>
            <div className="grid grid-cols-5 sm:grid-cols-[0.2fr_2.8fr_2fr_0.5fr_0.5fr] mb-4 pl-2 text-[#fff]">
              <b className="mr-4">#</b>
              <p> Title</p>
              <p>Album</p>
              <p></p>
              <p className="flex justify-center">Thích</p>
            </div>

            <hr />

            {songsPlaylist.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-5 sm:grid-cols-[0.2fr_2.8fr_2fr_0.5fr_0.5fr] mt-10 mb-4 pl-2 text-[#fff] items-center hover:bg-[#ffffff2b] cursor-pointer"
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
                <Link
                  to={`/song/${item.ma_bai_hat}`}
                  className={`${track.ma_bai_hat === item.ma_bai_hat
                    ? "text-[#E0066F]"
                    : "text-[#fff]"
                    }`}
                >
                  <img
                    className="inline w-10 mr-4"
                    src={assets.mck}
                    alt="Song cover"
                  />
                  {item.ten_bai_hat}
                </Link>
                <p className="text-[15px]">{item.album.ten_album}</p>
                <p onClick={() => handleDeleteSong(item.ma_bai_hat)}>
                  <CiCircleMinus size={20} />
                </p>
                <div className="text-[15px] flex justify-center relative">
                  <button onClick={() => handleLikeSong(item.ma_bai_hat)}>
                    {!likedSongs[item.ma_bai_hat] ? (
                      <FaRegHeart size={20} />
                    ) : (
                      <FaHeart color="red" size={20} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="wrap-loader">
          <span className="loader"></span>
        </div>
      )}
    </>
  );
};

export default DisplayPlaylist;
