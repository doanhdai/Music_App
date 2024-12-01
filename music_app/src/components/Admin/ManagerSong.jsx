import React, { useContext, useEffect, useState } from "react";
import { Button } from "antd";

import { FaHeart } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa6";
import { IoTimeSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { CiUnlock } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { IoIosMore, IoIosSearch } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { assets, songData2 } from "../../assets/assets";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils";
import EditSongModal from "../../pages/artist/components/EditSongModal";
import { PlayerContext } from "../../context/PlayerContext";
import SongDetailModal from "../../pages/artist/components/SongDetailModal";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManagerSong = () => {
 // const [songsData ,setSongsData] = useState([]);
  const { songsData } = useContext(PlayerContext);
  const [selectedSong, setSelectedSong] = useState(null);
  const [baihat, setSong] = useState(songsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const [currentActionType, setCurrentActionType] = useState("details");
  const [editSongModalState, setEditSongModalState] = useState(false);
  const [detailsSongModalState, setDetailsSongModalState] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All_status");

  useEffect(() =>{
    //api chua xong
    fetch(``)
  },[editSongModalState]);
  const actionList = {
    delete: " xóa",
    edit: "chỉnh sửa",
    details: " xem chi tiết",
  };

  const handleClickStatusChange = (actionType) => {
    // status include details,edit,delete
    if (actionType === currentActionType) {
      setCurrentActionType("details");
      toast.info(`Thoát trạng thái ${actionList[actionType]}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } else {
      setCurrentActionType(actionType);
      toast.info(`Đang ở trạng thái ${actionList[actionType]}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };
  const removeVietnamese = (str) => {
    if (typeof str !== "string") {
      return "";
    }
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  const handleShowDetails = () => {

    setDetailsSongModalState(true);
  };
  const handleShowEditModal = () => {
  
    setEditSongModalState(true);
  };
  const handleCloseDetailModal = () => {
    setSelectedSong(null);
    setDetailsSongModalState(false);
    setEditSongModalState(false);
  };

  function deleteSong() {
    //gửi data song để xóa
    alert("xoa" );
  }

  const clickedAction = {
    details: () => handleShowDetails(),
    edit: () => handleShowEditModal(),
    delete: () => deleteSong(),
  };
  const fetchSongDetailData = async (ma_bai_hat) => {
    try {
      
      const response = await fetch(`http://127.0.0.1:8000/api/song/${ma_bai_hat}`);
      const data = await response.json();
      console.log(data.data);
      setSelectedSong(data.data);
    } catch (error) {
      console.error("Error fetching song data:", error);
    }
  };
  function handleClickedSongItem(actionType, songInformation) {
    const action = clickedAction[actionType];
    console.log(songInformation);
    fetchSongDetailData(songInformation.ma_bai_hat)
    if (action) {
      return clickedAction[actionType]();
    } else {
      alert(`Wrong action type ${actionType}`);
    }
  }
  const handleSearchAndReset = () => {
    const results = filteredSongs();
    console.log('click', results)
    setSong(results);
    setSearchTerm("");
    setFilterStatus("All_status");
  };
  function isDateMatch(itemDate, inputDate) {
    const itemDateObj = new Date(itemDate);
    const inputDateObj = new Date(inputDate);
    
    return (
      itemDateObj.getFullYear() === inputDateObj.getFullYear() ||
      itemDateObj.getMonth() === inputDateObj.getMonth() ||
      itemDateObj.getDate() === inputDateObj.getDate()
    );
}
  const filteredSongs = () => {
    return songsData.filter((song) => {
      const matchesText = removeVietnamese(song.ten_bai_hat)
        .toLowerCase()
        .includes(removeVietnamese(searchTerm).toLowerCase());
      const matchesStatus =
        filterStatus === "All_status" ||
        song.trang_thai == filterStatus;

      const matchesDate = !releaseDate || isDateMatch(song.ngay_phat_hanh, releaseDate);
      console.log('d', matchesDate)
      return matchesText && matchesStatus && matchesDate;
    });
  };
  // console.log("Dữ liệu ban đầu:", songsData);
  // console.log("Điều kiện lọc:", searchTerm);
  // console.log("Kết quả sau lọc:", filteredSongs());

  return (
    <div className="pt-3 mx-[38px]">
      <div className="flex justify-between">
        <div className="flex items-center space-x-5">
          <div className="flex flex-col">
            <label className="mb-1">Tìm kiếm bài hát</label>
            <div className="flex items-center p-2 w-[300px] bg-black justify-between rounded-3xl">
              <IoIosSearch className="text-white text-2xl cursor-pointer" />
              <input
                className="bg-black w-full outline-none ml-3 text-white"
                type="text"
                placeholder="Tìm kiếm bài hát, album..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Trạng thái</label>
            <select
              className="bg-black text-white p-2 rounded-3xl border-none w-[150px] outline-none cursor-pointer"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All_status">Tất cả</option>
              <option value="1">Công khai</option>
              <option value="0">Ẩn</option>
              <option value="2">Chờ duyệt</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Ngày phát hành</label>
            <div className="flex items-center p-1.5 w-[200px] bg-black justify-between rounded-3xl">
              <input
                className="bg-black w-full outline-none ml-3 text-white"
                type="date"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="mb-1">&nbsp;</label>
            <Button
              type="primary"
              className="rounded-3xl bg-[#E0066F] h-[36px] w-[100px] hover:!bg-[#E0066F]"
              onClick={handleSearchAndReset}
            >
              Tìm kiếm
            </Button>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="mb-1">&nbsp;</label>
          <div className="flex space-x-5">
            <div
              onClick={() => handleClickStatusChange("edit")}
              className={`w-[36px] h-[36px] flex items-center justify-center rounded-full ${
                currentActionType === "edit" ? "bg-[#EB2272]" : "bg-black"
              }`}
            >
              <MdOutlineEdit size={20} />
            </div>
          </div>
        </div>
      </div>

      {baihat.length === 0 ? (
        <div className="flex items-center h-[500px] justify-center text-center text-white">
          Không có bài hát bạn tìm
        </div>
      ) : (
        <div>
          <p className="mt-4">Tổng có: 100 bài hát.</p>

          <div className="grid grid-cols-5 sm:grid-cols-[1fr_4fr_2fr_2fr_1.5fr] items-center mt-2 p-4 text-[#fff] ">
            <p>Mã bài hát</p>
            <p>Tên bài hát</p>
            <p className="hidden sm:block">album</p>
            <p>Ngày phát hành</p>
            <p>Trạng thái</p>
          </div>
          <hr />
          <div className="overflow-y-auto h-[440px]">
            {baihat
              .filter((item) => item.chat_luong === "Thấp")
              .map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 sm:grid-cols-[1fr_4fr_2fr_2fr_1.5fr] text-[#fff] items-center p-4 hover:bg-[#E0066F] cursor-pointer"
                  onClick={() => handleClickedSongItem(currentActionType, item)}
                >
                  <p className="text-white">{item.ma_bai_hat}</p>
                  <p className="text-[15px] flex items-center">
                    <img className="inline w-10 mr-2" src={item.hinh_anh} alt="error"/>
                    {item.ten_bai_hat}
                  </p>
                  <p className="text-[15px] hidden sm:block">{item.album}</p>
                  <p className="text-[15px]">
                    {formatDate(item.ngay_phat_hanh)}
                  </p>
                  <p className="flex ml-7">
                    <CiUnlock />
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Modal chi tiết bài hát */}
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
export default ManagerSong;
