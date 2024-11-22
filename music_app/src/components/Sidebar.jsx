import React, { useContext, useState } from "react";
import { assets, playlistsData } from "../assets/assets";
import { IoIosSearch } from "react-icons/io";
import { TbFilterPlus } from "react-icons/tb";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdArrowCircleDown, MdDriveFileRenameOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { PlayerContext } from "../context/PlayerContext";
import axios from "axios";

const Sidebar = ({ onOutsideClick }) => {
  const { playlistsData, setPlaylistsData } = useContext(PlayerContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const url_api = "http://localhost:8000";
  const removeVietnameseTones = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  const filteredPlaylists = playlistsData.filter((playlist) =>
    removeVietnameseTones(playlist.ten_playlist)
      .toLowerCase()
      .includes(removeVietnameseTones(searchQuery.toLowerCase()))
  );

  const handleContextMenu = (event, playlistId) => {
    event.preventDefault();

    setSelectedPlaylist(playlistId);
    const offsetX = 10;
    const offsetY = -50;
    setContextMenuPosition({
      x: event.pageX + offsetX,
      y: event.pageY + offsetY,
    });
  };
  const handleOutsideClick = (event) => {
    if (selectedPlaylist !== null) {
      setSelectedPlaylist(null);
    }
  };

  const handleDeletePlaylist = async (idPlaylist) => {
    try {
      await axios.delete(`${url_api}/api/playlist/ACC0007/${idPlaylist}`);

      setPlaylistsData((prevData) =>
        prevData.filter((playlist) => playlist.ma_playlist !== idPlaylist)
      );

      setSelectedPlaylist(null);
    } catch (error) {
      console.error("Lỗi khi xóa playlist:", error);
    }
  };

  return (
    <div
      className="w-[25%] h-full px-2 flex-col gap-2 text-white hidden lg:flex relative "
      onClick={handleOutsideClick}
    >
      <div className="h-[15%] rounded flex flex-col justify-around pl-8">
        <Link to="/" className="m-0 p-0 no-underline">
          <img src={assets.home_icon} className="w-[20%]" />
        </Link>
      </div>
      <div className="bg-[#121212]  h-[85%] rounded">
        <div className="p-4 pl-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img className="w-6" src={assets.stack_icon} alt="" />
            <p className="font-semibold">Thư viện</p>
          </div>
        </div>
        {playlistsData.length === 0 ? (
          <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex  flex-col items-start gap-1 pl-4">
            <h1 className="">Tạo danh sách phát</h1>
            <p className="font-light">Hãy tạo danh sách phát cho riêng bạn</p>
            <button className="px-4 py-1.5 bg-white tex-[15px] text-black rounded-full mt-4">
              Tạo danh sách phát
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center">
              <div className="flex items-center w-[230px] bg-black justify-between p-1 rounded-xl ml-2">
                <IoIosSearch className="text-white text-2xl cursor-pointer" />
                <input
                  className="bg-black w-[100%] outline-none ml-3"
                  placeholder="Tìm trong thư viện"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="ml-5">
                <TbFilterPlus />
              </div>
            </div>

            {/* Danh sách playlist */}
            <div className="h-[85%] overflow-y-auto">
              {filteredPlaylists.map((item, index) => (
                <div
                  onClick={() => navigate(`/playlist/${item.ma_playlist}`)}
                  onContextMenu={(e) => handleContextMenu(e, item.ma_playlist)}
                  key={index}
                  className="min-w-[195px] p-2 px-2 rounded flex items-center cursor-pointer hover:bg-[#ffffff26]"
                >
                  <img
                    className="rounded h-[50px] mr-3"
                    src={assets.mck}
                    alt="Playlist Cover"
                  />
                  <div>
                    <p className="">{item.ten_playlist}</p>
                    <h5 className="text-slate-200 text-sm">Playlist - Đài</h5>
                  </div>
                </div>
              ))}
              {filteredPlaylists.length === 0 && (
                <p className="text-center text-slate-300 mt-4">
                  Không tìm thấy playlist nào.
                </p>
              )}
            </div>
          </div>
        )}

        {selectedPlaylist !== null && (
          <div
            style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
            className="absolute bg-gray-800 text-white p-2 rounded shadow-lg z-50 w-[200px]"
          >
            <div className="hover:bg-black p-2 cursor-pointer flex items-center gap-2">
              <MdDriveFileRenameOutline size={18} />
              Đổi tên playlist
            </div>
            <div
              onClick={() => handleDeletePlaylist(selectedPlaylist)}
              className="hover:bg-black p-2 cursor-pointer flex items-center gap-2"
            >
              <AiOutlineDelete size={18} />
              Xóa playlist
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
