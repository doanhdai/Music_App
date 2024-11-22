import React, { useContext, useEffect, useState } from "react";
import { FaPlay, FaRegHeart } from "react-icons/fa";
import { IoIosMore, IoMdPause } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { albumsData, assets, songsData } from "../assets/assets";
import { IoMdMore } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdArrowCircleDown } from "react-icons/md";
import { PlayerContext } from "../context/PlayerContext";
import { FaHeart } from "react-icons/fa";
import { formatDate } from "../utils";
import { IoMdHeartEmpty } from "react-icons/io";
import axios from "axios";
import { BsPlusLg } from "react-icons/bs";
const DisplayAlbum = () => {
  const { playWithId, playStatus, pause, track, playlistsData } =
    useContext(PlayerContext);
  const url_api = "http://localhost:8000";

  const { id } = useParams();
  const [hoveredSong, setHoveredSong] = useState(null);
  const [menuSongId, setMenuSongId] = useState(null);
  const [detailAlbum, setDetailAlbum] = useState([]);
  const [songsAlbum, setSongsAlbum] = useState([]);
  const [likedSongs, setLikedSongs] = useState({});
  const [likeAlbum, setLikeAlbum] = useState({});
  const [accLikeSong, setAccLikeSong] = useState([]);
  // const [accLikeAlbum, setAccLikeAlbum] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  const toggleMenu = (songId) => {
    setMenuSongId(menuSongId === songId ? null : songId);
    console.log(songId);
  };

  const closeMenu = () => setMenuSongId(null);

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
    getAccLikesData();
    fetchLikedAlbum();
  }, []);

  const getAccLikesData = async () => {
    try {
      const response = await axios.get(`${url_api}/api/song-likes`);
      setAccLikeSong(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const likedFromStorage = {};
    accLikeSong.forEach((like) => {
      if (like.ma_tk === "ACC0006") {
        likedFromStorage[like.ma_bai_hat] = true;
      }
    });

    setLikedSongs(likedFromStorage);
  }, [accLikeSong]);

  // hàm sử lí yêu thích bài hát
  const handleLikeSong = async (ma_bai_hat) => {
    const isLikedSong = likedSongs[ma_bai_hat];

    if (!isLikedSong) {
      setLikedSongs((prev) => ({ ...prev, [ma_bai_hat]: true }));

      try {
        await axios.post(`${url_api}/api/song-likes`, {
          ma_tk: "ACC0006",
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
            ma_tk: "ACC0006",
            ma_bai_hat: ma_bai_hat,
          },
        });
      } catch (error) {
        console.error("Lỗi khi bỏ like bài hát:", error);
        setLikedSongs((prev) => ({ ...prev, [ma_bai_hat]: true }));
      }
    }
  };

  const fetchLikedAlbum = async () => {
    try {
      const response = await axios.get(`${url_api}/api/albums-likes/ACC0006`);
      const likedAlbums = response.data.data || [];
      setLikeAlbum(likedAlbums.some((album) => album.ma_album === id));
    } catch (error) {
      console.error("Error fetching liked albums:", error);
    }
  };
  const toggleLikeAlbum = async () => {
    const newLikeState = !likeAlbum;
    setLikeAlbum(newLikeState);

    try {
      if (newLikeState) {
        await axios.post(`${url_api}/api/albums/like`, {
          ma_tk: "ACC0006",
          ma_album: id,
        });
      } else {
        await axios.delete(`${url_api}/api/albums/unlike`, {
          data: { ma_tk: "ACC0006", ma_album: id },
        });
      }
    } catch (error) {
      console.error("Error toggling like for album:", error);
      setLikeAlbum(!newLikeState);
    }
  };

  return (
    <>
      {
        (detailAlbum.length != 0 && songsAlbum.length != 0) ? (
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
                <button onClick={toggleLikeAlbum}>
                  {likeAlbum ? (
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

            <div className="grid grid-cols-5 sm:grid-cols-[4.5fr_3fr_2fr_1fr_1.5fr_0.5fr_1.5fr] mt-7 mb-4 pl-2 text-[#fff]">
              <p>
                <b className="mr-4">#</b>
                Title
              </p>
              <p>Album</p>
              <p className="hidden sm:block">Ngày thêm</p>
              <p>Lượt nghe</p>
              <img className="m-auto w-4" src={assets.clock_icon} alt="Clock Icon" />
              <p></p>
              <p className="flex justify-center">Yêu thích</p>
            </div>

            <hr />

            {songsAlbum.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-7 sm:grid-cols-[0.5fr_4fr_3fr_2fr_1fr_1.5fr_0.5fr_1.5fr] mt-10 mb-4 pl-2 text-[#fff] items-center hover:bg-[#ffffff2b] cursor-pointer"
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
                <Link
                  to={`/song/${item.ma_bai_hat}`}
                  className="text-white flex items-center pr-2"
                >
                  <img className="inline w-10 mr-4 " src={item.hinh_anh} />
                  {item.ten_bai_hat}
                </Link>
                <p className="text-[15px]">{detailAlbum.ten_album}</p>
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
                      <div className="hover:bg-black p-2 cursor-pointer flex items-center gap-2">
                        <BsPlusLg size={27} />
                        Thêm và tạo mới playlist
                      </div>
                      <hr />
                      {playlistsData.map((playlist, index) => (
                        <div
                          key={index}
                          className="hover:bg-black p-2 cursor-pointer flex items-center gap-2"
                        >
                          <img className="h-10" src={assets.mck} />
                          <span>{playlist.ten_playlist}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
        ) : <div className="wrap-loader"><span className="loader"></span></div>
      }
    </>
  );
};

export default DisplayAlbum;