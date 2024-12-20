import React, { useContext, useEffect, useState } from "react";
import { FaHeart, FaPlay, FaRegHeart } from "react-icons/fa";
import { IoMdPause } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";
import axios from "axios";

const SongLiked = () => {
  const {
    playStatus,
    playWithId,
    pause,
    track,
    currentAccount,
    songsData,
    songDataById,
    setSongDataById,
    play,
    songLiked,
    setSongLiked,
  } = useContext(PlayerContext);
  const navigate = useNavigate();
  const [menuSongId, setMenuSongId] = useState(null);
  const [hoveredSong, setHoveredSong] = useState(null);
  const [likedSongs, setLikedSongs] = useState({});
  const [accLikeSong, setAccLikeSong] = useState([]);
  const [songsPlaylist, setSongsPlaylist] = useState([]);
  const url_api = "http://localhost:8000";

  useEffect(() => {
    getAccLikesData();
  }, []);

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
      setIsGettingSongLike(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikeSong = async (ma_bai_hat) => {
    const isLikedSong = likedSongs[ma_bai_hat];

    // Xóa bài hát khỏi danh sách đã like
    setLikedSongs((prev) => ({ ...prev, [ma_bai_hat]: false }));

    try {
      await axios.delete(`${url_api}/api/song-likes`, {
        data: {
          ma_tk: currentAccount,
          ma_bai_hat: ma_bai_hat,
        },
      });

      // Loại bỏ bài hát khỏi danh sách likedSongs và songLiked
      setSongLiked((prev) =>
        prev.filter((song) => song.ma_bai_hat !== ma_bai_hat)
      );
    } catch (error) {
      console.error("Lỗi khi bỏ like bài hát:", error);
      setLikedSongs((prev) => ({ ...prev, [ma_bai_hat]: true }));
    }
  };

  const closeMenu = () => setMenuSongId(null);

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
      {songLiked ? (
        <div onClick={closeMenu}>
          <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-col">
            <img
              className="w-48 rounded"
              src={assets.likeSong}
              alt="Playlist cover"
            />
            <div className="flex flex-col justify-center">
              <p>Playlist</p>
              <h2 className="text-5xl font-bold mb-4 md:text-7xl">
                Liked song
              </h2>
              <p className="mt-1 flex items-center">
                <img
                  className="w-5"
                  src={assets.spotify_logo}
                  alt="Spotify logo"
                />
                <b className="pl-2">Đài -</b>
                <b className="pl-2">{songLiked.length} bài hát</b>
              </p>
            </div>
          </div>
          {songLiked.length === 0 ? (
            <div className="h-60 flex justify-center items-center text-center">
              <p>Playlist yêu thích chưa có bài hát nào!</p>
            </div>
          ) : (
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
                {/* <p></p> */}
                <p className="flex justify-center">Thích</p>
              </div>

              <hr />

              {songLiked.map((item, index) => (
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
                  <p className="text-[15px]">{item.album}</p>
                  {/* <p onClick={() => handleDeleteSong(item.ma_bai_hat)}>
                  <CiCircleMinus size={20} />
                </p> */}
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
          )}
        </div>
      ) : (
        <div className="wrap-loader">
          <span className="loader"></span>
        </div>
      )}
    </>
  );
};

export default SongLiked;
