import ManageBar from "./components/ManageBar";
import { useEffect, useState } from "react";
import { assets, songsData } from "../../assets/assets";

import { FiEye } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa6";
import { IoTimeSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { BsPlusCircleFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { TfiPencil } from "react-icons/tfi";
import { FaTrash } from "react-icons/fa";
import { BsSendPlus } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { songData2 } from "../../assets/assets";
import { Button } from "antd";
import { FaX } from "react-icons/fa6";
import AddSongModal from "./components/AddSongModal";
import EditSongModal from "./components/EditSongModal";
import SongDetailModal from "./components/SongDetailModal";

const ArtistSongPage = () => {
  const [songsData, setSongsData] = useState([]);
  const [currentActionType, setCurrentActionType] = useState("details");
  const [showAddSongModal, setShowAddSongModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(2);

  const currentArtistId = "ACC0006";
  const handleShowAddSongModal = () => {
    setShowAddSongModal(true);
  };
  const handleCloseAddSongModal = () => {
    setShowAddSongModal(false);
  };
  const handleEditStatusChange = () => {
    setCurrentActionType('edit');
  }
  const handleDeleteStatusChange = () => {
    setCurrentActionType('delete');
  }
  const actionList = {
    delete: " xóa",
    edit: "chỉnh sửa",
    details: " xem chi tiết",
  };
  const handleClickStatusChange = (actionType) => {
    // status include details,edit,delete
    if (actionType === currentActionType) {
      setCurrentActionType("details");
      alert(`Thoát trạng thái ${actionList[actionType]}`);
    } else {
      setCurrentActionType(actionType);
      alert(`Đang ở trạng thái ${actionList[actionType]}`);
    }
  };
  // fetch data from server
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/songs/artist/${currentArtistId}`)
      .then(res=> res.json())
      .then(res => {
        console.log(res.data[0].bai_hat);
        setSongsData(res.data[0].bai_hat);
      });
    
  }, []);
  // 0 : an/ xoa
  // 1 : hoat dong
  // 2 : cho duyet
  // 3 : all
  const filteredSongs = songsData.filter((item) => { 
    return (
      item.ten_bai_hat.toLowerCase().includes(searchQuery.toLowerCase()) &&
      ( selectedStatus == 3 || item.trang_thai == selectedStatus) // 2 la tat ca
    )
  });

  return (
    <div className="p-2 mt-5">
      <div className=" grid grid-cols-2 justify-center ">
        <div className="inline-flex items-center gap-10">
          <div className="flex items-center p-1 w-[500px] bg-[#1E1E1E] justify-between rounded-3xl">
            <CiSearch className="text-3xl font-bold" />
            <input
              className="bg-inherit w-[100%] outline-none ml-3"
              type="text"
              placeholder="Tìm kiếm bài hát"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <select
              className="bg-[#1E1E1E] text-white p-2 rounded-lg border-none w-[150px]  cursor-pointer"
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
          
              }}
            >
              <option value="3">Tất cả</option>
              <option value="2">Chờ duyệt</option>
              <option value="1">Công khai</option>
              <option value="0">Ẩn</option>
            </select>
          </div>
        </div>

        <div className="flex flex-row justify-end gap-7 pr-10 align-middle">
          <button
            onClick={() => handleShowAddSongModal()}
            className=" text-3xl h-10 w-10 rounded-full bg-[#1E1E1E]  text-white"
          >
            <GoPlus className="m-auto" />
            {/* add song */}
          </button>

          {/* delete */}
          <button
            onClick={() => handleClickStatusChange("delete")}
            className={`text-xl h-10 w-10 rounded-full bg-[#1E1E1E]  text-white ${
              currentActionType === "delete" ? "bg-[#EB2272]" : ""
            }`}
          >
            <FaTrash className="m-auto" />
          </button>
        </div>
        <AddSongModal
          onClose={handleCloseAddSongModal}
          modalState={showAddSongModal}
        />
      </div>
      <h3 className="mt-3">Tổng cộng: {filteredSongs.length}</h3>
      <SongList2
        songsData={filteredSongs}
        currentActionType={currentActionType}
      />
    </div>
  );
};

const SongList2 = ({ songsData, currentActionType }) => {
  // fake data

  const [selectedSong, setSelectedSong] = useState(null);
  const [editSongModalState, setEditSongModalState] = useState(false);
  const [detailsSongModalState, setDetailsSongModalState] = useState(false);

  const handleShowDetails = (song) => {
    setSelectedSong(song);
    setDetailsSongModalState(true);
  };
  const handleShowEditModal = (song) => {
    setSelectedSong(song);
    setEditSongModalState(true);
  };
  const handleCloseDetailModal = () => {
    setSelectedSong(null);
    setDetailsSongModalState(false);
    setEditSongModalState(false);
  };

  function deleteSong(song) {
    //gửi data song để xóa
    alert("xoa");
  }

  const clickedAction = {
    details: (song) => handleShowDetails(song),
    edit: (song) => handleShowEditModal(song),
    delete: (song) => deleteSong(song),
  };

  function handleClickedSongItem(actionType, songInformation) {
    const action = clickedAction[actionType];
    if (action) {
      return clickedAction[actionType](songInformation);
    } else {
      alert(`Wrong action type ${actionType}`);
    }
  }

  return (
    <div className="mt-5 bg-[#121212] h-screen overflow-scroll">
      <div className=" py-2 grid grid-cols-5 sm:grid-cols-[4fr_2fr_2fr_2fr] pl-2 text-center  text-[#fff] ">
        <p>Tên bài hất</p>
        <p>Album</p>
        <p>Trạng thái</p>
        <img className="m-auto w-4 " src={assets.clock_icon}></img>{" "}
        {/*  thoi luon*/}
      </div>
      <hr className="mx-5" />

      {songsData.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-5 sm:grid-cols-[4fr_2fr_2fr_2fr] mt-10 mb-4 pl-2 text-white items-center hover:bg-[#ffffff2b] cursor-pointer"
          onClick={() => handleClickedSongItem(currentActionType, item)}
        >
          <p className="text-white">
            {/* src={item.hinh_anh} */}
            <img
              className="inline w-10 mx-4 aspect-square "
              src={item.hinh_anh} />
            {item.ten_bai_hat}
          </p>

          <p className="text-[15px] text-center">{item.ten_album}</p>
          <p className="text-[15px] text-center">
            {item.trang_thai === 1 ? "Công khai" : "Ẩn"}
          </p>
          <p className="text-[15px] text-center">{item.thoi_luong}</p>
        </div>
      ))}
      <SongDetailModal
        className="float-start"
        songData={selectedSong}
        detailsSongModalState={detailsSongModalState}
        onClose={handleCloseDetailModal}
      />
      <EditSongModal
        className="float-start"
        songDetails={selectedSong}
        editSongModalState={editSongModalState}
        onClose={handleCloseDetailModal}
      />
    </div>
  );
};

export default ArtistSongPage;
