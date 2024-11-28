import React, { useContext, useEffect, useState } from "react";
import { albumsData, assets, songsData } from "../assets/assets";
import { Link, useParams } from "react-router-dom";
import { FaHeart, FaPlay } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoIosMore, IoMdPause } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import ArtistItems from "./ArtistItems";
import AlbumItems from "./AlbumItems";
import SongItems from "./SongItems";
import { PlayerContext } from "../context/PlayerContext";
import { IoAddCircleOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdMore } from "react-icons/io";
import { MdSend } from "react-icons/md";
import axios from "axios";
import { formatDate } from "../utils";
import ToastNotification from "../utils/ToastNotification/ToastNotification";
import { BsPlusLg } from "react-icons/bs";

const DetailSong = () => {
  const [menuSongId, setMenuSongId] = useState(null);
  const [songData, setSongData] = useState(null);
  const [comments, setCommentsData] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [likeData, setLikeData] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [accLike, setAccLike] = useState([]);
  const [isLikeDataReady, setIsLikeDataReady] = useState(false);
  const [openPlaylist, setOpenPlaylist] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [artistSong, setArtistSong] = useState({
    mainArtist: "",
    collabArtists: [],
  });
  const url_api = "http://localhost:8000";
  const toggleMenu = (songId) => {
    setMenuSongId(menuSongId === songId ? null : songId);
  };
  const closeMenu = () => setMenuSongId(null);

  const {
    playWithId,
    playStatus,
    pause,
    songsData,
    usersData,
    playlistsData,
    currentAccount,
  } = useContext(PlayerContext);
  const { id } = useParams();
  const showToast = (message) => {
    setToastMessage(message);
  };
  //call tất cả cmt của bài hát
  const getCommentsData = async () => {
    try {
      const response = await axios.get(`${url_api}/api/comments/song/${id}`);
      setCommentsData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getAccLikesData = async () => {
    try {
      const response = await axios.get(`${url_api}/api/song-likes`);
      setAccLike(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getArtistSong = async () => {
    try {
      const response = await axios.get(`${url_api}/api/song/collab/${id}`);
      const data = response.data.data[0];

      // Lấy tên nghệ sĩ chính
      const mainArtist = data.ten_artist || "Không xác định";

      // Đảm bảo collab_artists tồn tại và là một mảng
      const collabArtists = Array.isArray(data.collab_artists)
        ? data.collab_artists.map((artist) => artist.ten_collab_artist)
        : [];
      setArtistSong({ mainArtist, collabArtists });
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  useEffect(() => {
    getArtistSong();
    getCommentsData();
    getAccLikesData();
  }, []);

  //lấy thông tin của bài hát
  useEffect(() => {
    const song = songsData.find((item) => item.ma_bai_hat === id);
    if (song) {
      setSongData(song);
    } else {
      setSongData(null);
    }
  }, [id, songsData]);

  useEffect(() => {
    const accLiked = accLike.some(
      (like) => like.ma_tk === currentAccount && like.ma_bai_hat === id
    );
    setHasLiked(accLiked);
  }, [accLike, id, currentAccount]);

  // if (!songData) {
  //   return <div>Song not found.</div>;
  // }
  //post comment lên BE
  const handlePostComment = async () => {
    if (!currentAccount) {
      showToast("Vui lòng đăng nhập để viết bình luận!");
      return;
    }
    if (commentContent.trim()) {
      try {
        const { data } = await axios.post(`${url_api}/api/comments`, {
          noi_dung: commentContent,
          ma_tk: currentAccount,
          ma_bai_hat: id,
        });
        const newComment = {
          ...data,
          ngay_tao: new Date().toISOString(),
        };

        setCommentsData((prev) => [...prev, newComment]);
        setCommentContent("");
        setCommentContent("");
      } catch (error) {
        console.error("Lỗi khi thêm bình luận:", error);
      }
    }
  };
  const handleDeleteComment = async (idComment) => {
    const response = await fetch(`${url_api}/api/comments/${idComment}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    setCommentsData((prev) =>
      prev.filter((comment) => comment.ma_binh_luan !== idComment)
    );
    if (response.ok) {
      console.log("Comment đã được xóa:", idComment);
    } else {
      console.error("Lỗi khi xóa comment");
    }
  };

  //hàm xử lí like
  const handleLike = async () => {
    if (!currentAccount) {
      showToast("Vui lòng đăng nhập để yêu thích bài hát!");
      return;
    }
    if (!hasLiked) {
      setHasLiked(true);
      setLikeData((prev) => ({
        ...prev,
        like_count: prev.like_count + 1,
      }));
      // localStorage.setItem(`liked-${id}`, "true");

      try {
        await axios.post(`${url_api}/api/song-likes`, {
          ma_tk: currentAccount,
          ma_bai_hat: id,
        });
      } catch (error) {
        console.error("Lỗi khi like bài hát:", error);
        setHasLiked(false);

        setLikeData((prev) => ({
          ...prev,
          like_count: prev.like_count - 1,
        }));
        // localStorage.removeItem(`liked-${id}`);
      }
    } else {
      setHasLiked(false);
      setLikeData((prev) => ({
        ...prev,
        like_count: prev.like_count - 1,
      }));
      // localStorage.removeItem(`liked-${id}`);

      try {
        await axios.delete(`${url_api}/api/song-likes`, {
          data: {
            ma_tk: `${currentAccount}`,
            ma_bai_hat: id,
          },
        });
      } catch (error) {
        console.error("Lỗi khi bỏ like bài hát:", error);
        setHasLiked(true);
        setLikeData((prev) => ({
          ...prev,
          like_count: prev.like_count + 1,
        }));
        // localStorage.setItem(`liked-${id}`, "true");
      }
    }
  };
  const addSongToPlaylist = async (ma_playlist) => {
    try {
      const response = await axios.get(
        `${url_api}/api/playlist/${currentAccount}/${ma_playlist}`
      );
      const songsInPlaylist = response.data.data;
      const isSongInPlaylist = songsInPlaylist.some(
        (song) => song.ma_bai_hat === id
      );
      if (isSongInPlaylist) {
        alert("Bài hát đã có trong playlist này!");
        return;
      }
      // Nếu chưa có, thêm bài hát vào playlist
      await axios.post(`${url_api}/api/playlist`, {
        ma_tk: currentAccount,
        ma_playlist: ma_playlist,
        ma_bai_hat: id,
      });

      alert("Đã thêm bài hát vào playlist!");
    } catch (error) {
      console.error("Lỗi khi thêm bài hát vào playlist:", error);
      alert("Không thể thêm bài hát vào playlist. Vui lòng thử lại.");
    }
  };

  const createNewPlaylist = async () => {
    try {
      await axios.post(`${url_api}/api/playlist`, {
        ma_tk: `${currentAccount}`,
        ma_bai_hat: id,
      });
      alert("Đã tạo mới playlist và thêm bài hát!");
    } catch (error) {
      console.error("Lỗi khi tạo mới playlist:", error);
      alert("Không thể tạo mới playlist. Vui lòng thử lại.");
    }
  };
  const handleOpenPlaylist = (e) => {
    if (!currentAccount) {
      showToast("Vui lòng đăng nhập để thêm bài hát!");
      return;
    }
    e.stopPropagation();
    setOpenPlaylist(!openPlaylist);
  };
  if (!songData) {
    return (
      <div className="wrap-loader">
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <>
      {toastMessage && (
        <ToastNotification
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}

      <div onClick={() => setOpenPlaylist(false)}>
        <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-col">
          <img className="w-48 h-48 rounded" src={songData.hinh_anh}></img>
          <div className="flex flex-col justify-center">
            <p>Bài hát</p>
            <h2 className="text-4xl font-bold mb-4 md:text-7xl">
              {songData.ten_bai_hat}
            </h2>
            <p className="mt-1 flex items-center">
              <img className="w-5" src={assets.spotify_logo}></img>
              <span className="pl-2 font-bold">{songData.artist} -</span>
              <span className="pl-2">{songData.like_count} yêu thích - </span>
              <span className="pl-2">{songData.luot_nghe} lượt nghe - </span>
              <span className="pl-2">
                {formatDate(songData.ngay_phat_hanh)}
              </span>
            </p>
            <p className="mt-4 flex items-center">{songData.ten_the_loai}</p>
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

              <button onClick={handleLike}>
                {!hasLiked ? (
                  <FaRegHeart size={30} />
                ) : (
                  <FaHeart color="red" size={30} />
                )}
              </button>
              <div className="text-[15px] flex justify-center relative">
                <IoAddCircleOutline
                  onClick={handleOpenPlaylist}
                  color="#00FF00"
                  size={30}
                />
                {openPlaylist && (
                  <div
                    className="absolute bottom-[40px] left-0 bg-gray-800 text-white p-2 rounded shadow-lg w-[250px] z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      className="hover:bg-black p-2 cursor-pointer flex items-center gap-2"
                      onClick={() => {
                        createNewPlaylist();
                        setOpenPlaylist(false);
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
                        onClick={() => {
                          addSongToPlaylist(playlist.ma_playlist);
                          setOpenPlaylist(false);
                        }}
                      >
                        <img className="h-10" src={playlist.hinh_anh} alt="P" />
                        <span>{playlist.ten_playlist}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
              <b href="/artist" className="uppercase">
                {artistSong.mainArtist || songData.artist}
              </b>
            </div>
          </div>
          {console.log(artistSong.collabArtists)}
          {artistSong.collabArtists.length > 0
            ? artistSong.collabArtists.map((artist, index) => (
              <div key={index} className="flex items-center my-2">
                <img
                  className="rounded-full h-[70px] text-[#fff]"
                  src={artist.anh_dai_dien_collab_artist || assets.mck}
                // alt={artist.ten_collab_artist}
                />
                <div className="ml-5 flex flex-col">
                  <h6 className="text-[#bbbbbb]">Nghệ sĩ</h6>
                  <b className="uppercase">{artist}</b>
                </div>
              </div>
            ))
            : ""}
        </div>

        <div className="mt-10 rounded-xl mb-5">
          <div className="mx-4 py-4">
            <h2 className="font-bold text-xl">Bình luận {comments.length}</h2>
            {comments.length > 0 ? (
              comments.map((comment) => {
                const user = usersData.find(
                  (user) => user.ma_tk === comment.ma_tk
                );

                return (
                  <div
                    key={comment.ma_binh_luan}
                    className="flex items-center my-4 justify-between"
                  >
                    <div className="flex items-center">
                      <img
                        className="rounded-full w-9 h-9"
                        src={user?.anh_dai_dien}
                        alt={user?.ten_user}
                      />
                      <div className="ml-4 flex flex-col">
                        <div className="flex items-center">
                          <b className="text-[#E0066F]">
                            {user?.ten_user || "Ẩn danh"}
                          </b>
                          <span className="ml-4 text-xs text-[#bbbbbb]">
                            {formatDate(comment.ngay_tao)}
                          </span>
                        </div>
                        <p className="text-xs text-[#bbbbbb]">
                          {comment.noi_dung}
                        </p>
                      </div>
                    </div>
                    {comment.ma_tk === `${currentAccount}` && (
                      <div className="text-[15px] flex justify-center relative">
                        <IoMdMore
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMenu(comment.ma_binh_luan);
                          }}
                        />
                        {menuSongId === comment.ma_binh_luan && (
                          <div className="absolute bottom-8 right-0 bg-gray-800 text-white p-2 rounded shadow-lg !z-50 w-[80px]">
                            <div
                              onClick={() =>
                                handleDeleteComment(comment.ma_binh_luan)
                              }
                              className="cursor-pointer flex items-center gap-2"
                            >
                              <AiOutlineDelete size={18} />
                              Xóa
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p className=" text-[#bbbbbb] flex justify-center my-10 text-sm">
                Chưa có bình luận
              </p>
            )}
          </div>

          <div className="flex flex-col pb-3 mx-4 relative">
            <label htmlFor="comment">Viết bình luận</label>
            <div className="relative">
              <textarea
                id="comment"
                className="bg-black text-white p-2 rounded-lg h-10 border-pink-400 w-full pr-10"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Nhập bình luận..."
              ></textarea>
              <MdSend
                onClick={handlePostComment}
                className="absolute right-2 bottom-3.5 text-pink-500 cursor-pointer hover:text-pink-700"
                size={20}
              />
            </div>
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
                name={item.ten_bai_hat}
                desc={item.ten_bai_hat}
                id={item.ma_bai_hat}
                img={item.hinh_anh}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailSong;
