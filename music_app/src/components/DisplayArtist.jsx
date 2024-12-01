import React, { useContext, useEffect, useState } from "react";
import { FaHeart, FaPlay } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoIosMore, IoMdPause } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { albumsData, artistData, assets, songsData } from "../assets/assets";
import AlbumItems from "./AlbumItems";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";
import { MdArrowCircleDown } from "react-icons/md";
import { BsPlusLg } from "react-icons/bs";
import { PlayerContext } from "../context/PlayerContext";
import { formatDate } from "../utils";
import ToastNotification from "../utils/ToastNotification/ToastNotification";
import axios from "axios";
const DisplayArtist = () => {
  const url_api = "http://localhost:8000";
  const {
    playWithId,
    playStatus,
    track,
    pause,
    playlistsData,
    albumsData,
    setPlaylistsData,
    currentAccount,
    songsData,
    songDataById,
    setSongDataById,
    play,
    isCallingAPISongArtist,
    setIsCallingAPISongArtist,
    handleClickLikeUpdateGUI
  } = useContext(PlayerContext);

  const { id } = useParams();
  const [hoveredSong, setHoveredSong] = useState(null);
  const [menuSongId, setMenuSongId] = useState(null);
  const [likedSongs, setLikedSongs] = useState({});
  const [detailArtist, setDetailArtist] = useState([]);
  const [songsArtist, setSongsArtist] = useState([]);
  const [accLike, setAccLike] = useState([]);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message) => {
    setToastMessage(message);
  };
  const getSongByArtistsData = async () => {
    try {
      const response = await axios.get(`${url_api}/api/songs/artist/${id}`);
      const artistData = response.data.data[0];
      if (artistData) {
        setDetailArtist(artistData);
        // console.log(artistData);
        setSongsArtist(artistData.bai_hat);
        setIsCallingAPISongArtist(false);
        setSongDataById(songsData.filter((item) =>
          artistData.bai_hat.some((item1) => item.ma_bai_hat == item1.ma_bai_hat)
        ))
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
    getAccLikesData();
  }, []);
  const toggleMenu = (songId) => {
    if (!currentAccount) {
      showToast("Vui lòng đăng nhập để thêm bài hát!");
      return;
    }
    setMenuSongId(menuSongId === songId ? null : songId);
    console.log(songId);
  };
  const closeMenu = () => setMenuSongId(null);
  const getAccLikesData = async () => {
    try {
      const response = await axios.get(`${url_api}/api/song-likes`);
      setAccLike(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const likedFromStorage = {};
    accLike.forEach((like) => {
      if (like.ma_tk === currentAccount) {
        likedFromStorage[like.ma_bai_hat] = true;
      }
    });

    setLikedSongs(likedFromStorage);
  }, [accLike]);

  const handleLike = async (ma_bai_hat) => {
    if (!currentAccount) {
      showToast("Vui lòng đăng nhập để thích bài hát!");
      return;
    }

    const isLiked = likedSongs[ma_bai_hat];

    handleClickLikeUpdateGUI(isLiked == undefined ? true : (isLiked ? false : true), ma_bai_hat);
    if (!isLiked) {
      setLikedSongs((prev) => ({ ...prev, [ma_bai_hat]: true }));
      try {
        await axios.post(`${url_api}/api/song-likes`, {
          ma_tk: `${currentAccount}`,
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

  const addSongToPlaylist = async (ma_playlist, ma_bai_hat) => {
    try {
      const response = await axios.get(
        `${url_api}/api/playlist/${currentAccount}/${ma_playlist}`
      );
      const songsInPlaylist = response.data.data;
      const isSongInPlaylist = songsInPlaylist.some(
        (song) => song.ma_bai_hat === ma_bai_hat
      );
      if (isSongInPlaylist) {
        return;
      }
      await axios.post(`${url_api}/api/playlist`, {
        ma_tk: `${currentAccount}`,
        ma_playlist: ma_playlist,
        ma_bai_hat: ma_bai_hat,
      });
    } catch (error) {
      console.error("Lỗi khi thêm bài hát vào playlist:", error);
    }
  };

  const createNewPlaylist = async (ma_bai_hat) => {
    try {
      const response = await axios.post(`${url_api}/api/playlist`, {
        ma_tk: `${currentAccount}`,
        ma_bai_hat: ma_bai_hat,
      });
      const newPlaylist = response.data.data;
      setPlaylistsData((prevPlaylists) => [...prevPlaylists, newPlaylist]);
    } catch (error) {
      console.error("Lỗi khi tạo mới playlist:", error);
    }
  };

  const handleClickBtnPlay = () => {

    const storedState = localStorage.getItem("musicPlayerState");
    const currentState = storedState ? JSON.parse(storedState) : '';
    if (currentState == '') {
      playWithId(songsArtist[0].ma_bai_hat);
    } else {
      const index = songDataById.findIndex((item) => item.ma_bai_hat == currentState.track.ma_bai_hat);
      if (index == -1) {
        playWithId(songsArtist[0].ma_bai_hat);
      } else {
        play();
      }
    }


  }
  return (
    <>
      {toastMessage && (
        <ToastNotification
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}

      {!isCallingAPISongArtist ? (
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
                <b className="pl-2">
                  {songsArtist !== null ? songsArtist.length : 0} bài hát
                </b>
              </p>
            </div>
          </div>
          {songsArtist !== null ? (
            <>
              <div className="mt-10">
                <div className="flex gap-10 items-center">
                  <button className="w-[60px] h-[60px] rounded-full bg-[#E0066F] flex justify-center items-center">
                    {playStatus ? (
                      <IoMdPause onClick={pause} size={20} />
                    ) : (
                      <FaPlay onClick={() => handleClickBtnPlay()} />
                    )}
                  </button>

                  {/* <IoIosMore size={30}/> */}
                </div>
              </div>
              <h1 className="font-bold text-2xl mt-7 mb-5">Danh sách phát</h1>
              <div className="grid grid-cols-5 sm:grid-cols-[4.5fr_3fr_2fr_1fr_1.5fr_0.5fr_1.5fr] mt-7 mb-4 pl-2 text-[#fff]">
                <p>
                  <b className="mr-4">#</b>
                  Title
                </p>
                <p>Album</p>
                <p className="hidden sm:block">Ngày thêm</p>
                <p>Lượt nghe</p>
                <img
                  className="m-auto w-4"
                  src={assets.clock_icon}
                  alt="Clock Icon"
                />
                <p></p>
                <p className="flex justify-center">Yêu thích</p>
              </div>

              <hr />

              {songsArtist.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-7 sm:grid-cols-[0.5fr_4fr_3fr_2fr_1fr_1.5fr_0.5fr_1.5fr] mt-10 mb-4 pl-2 text-[#fff] items-center hover:bg-[#ffffff2b] cursor-pointer"
                  onMouseEnter={() => setHoveredSong(index)}
                  onMouseLeave={() => setHoveredSong(null)}
                >
                  <p className="w-[20px] flex justify-center">
                    {playStatus && track.ma_bai_hat === item.ma_bai_hat ? (
                      hoveredSong === index ? (
                        <IoMdPause onClick={pause} size={13} />
                      ) : (
                        index + 1
                      )
                    ) : hoveredSong === index ? (
                      <FaPlay
                        onClick={() => playWithId(item.ma_bai_hat)}
                        size={13}
                      />
                    ) : (
                      index + 1
                    )}
                  </p>
                  <Link
                    to={`/song/${item.ma_bai_hat}`}
                    className={`${
                      track.ma_bai_hat === item.ma_bai_hat
                        ? "text-[#E0066F] font-bold text-lg"
                        : "text-[#fff]"
                    } flex items-center pr-2`}
                  >
                    <img className="inline w-10 mr-4" src={item.hinh_anh} />
                    {item.ten_bai_hat}
                  </Link>
                  <p className="text-[15px]">{item.ten_album}</p>
                  <p className="text-[15px] hidden sm:block">
                    {formatDate(item.ngay_phat_hanh)}
                  </p>
                  <p className="text-[15px]">{item.luot_nghe}</p>
                  <p className="text-[15px] text-center">{item.thoi_luong}</p>
                  <div className="text-[15px] flex justify-center relative">
                    {hoveredSong === index && (
                      <IoAddCircleOutline
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMenu(item.ma_bai_hat);
                        }}
                        color="#00FF00"
                        size={20}
                      />
                    )}
                    {menuSongId === item.ma_bai_hat && (
                      <div className="absolute bottom-[40px] right-[10px] bg-gray-800 text-white p-2 rounded shadow-lg w-[250px] z-50">
                        <div
                          className="hover:bg-black p-2 cursor-pointer flex items-center gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            createNewPlaylist(item.ma_bai_hat);
                            closeMenu();
                          }}
                        >
                          <BsPlusLg size={27} />
                          Thêm và tạo mới playlist
                        </div>
                        <hr />
                        {playlistsData.map((playlist, index) => (
                          <div
                            key={index}
                            className="hover:bg-black p-2 cursor-pointer flex items-center gap-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              addSongToPlaylist(
                                playlist.ma_playlist,
                                item.ma_bai_hat
                              );
                              closeMenu();
                            }}
                          >
                            <img className="h-10" src={assets.mck} />
                            <span>{playlist.ten_playlist}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-[15px] flex justify-center relative">
                    <button onClick={() => handleLike(item.ma_bai_hat)}>
                      {!likedSongs[item.ma_bai_hat] ? (
                        <FaRegHeart size={20} />
                      ) : (
                        <FaHeart color="red" size={20} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="h-60 flex justify-center items-center text-center">
              <p>Nghệ sĩ chưa có bài hát nào!</p>
            </div>
          )}
          {/* <div className="mb-4 pt-10">
            <div className="flex justify-between">
              <h1 className="my-4 font-bold text-2xl">Các album của </h1>
            </div>
            <div className="flex overflow-auto justify-start">
              {albumsData.slice(0, 6).map((item, index) => (
                <AlbumItems
                  key={index}
                  name={item.ten_album}
                  desc={item.nguoi_so_huu}
                  id={item.ma_album}
                  img={item.hinh_anh}
                />
              ))}
            </div>
          </div> */}
        </div>
      ) : (
        <div className="wrap-loader">
          <span className="loader"></span>
        </div>
      )}
    </>
  );
};
export default DisplayArtist;
