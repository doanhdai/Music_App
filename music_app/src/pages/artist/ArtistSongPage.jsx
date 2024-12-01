import ManageBar from "./components/ManageBar";
import { useEffect, useState } from "react";
import { assets, } from "../../assets/assets";


import { CiSearch } from "react-icons/ci";
import { BsPlusCircleFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { TfiPencil } from "react-icons/tfi";
import { FaTrash } from "react-icons/fa";
import AddSongModal from "./components/AddSongModal";
import EditSongModal from "./components/EditSongModal";
import SongDetailModal from "./components/SongDetailModal";
import { removeVietnameseTones } from "../../assets/assets";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ArtistSongPage = () => {
  const [songsData, setSongsData] = useState([]);
  const [currentActionType, setCurrentActionType] = useState("details");
  const [showAddSongModal, setShowAddSongModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(3);

  const account = JSON.parse(localStorage.getItem('account')) || {};
  const currentArtistId = account.ma_artist || "ACC0006";
  
  const handleShowAddSongModal = () => {
    setShowAddSongModal(true);
  };
  const handleCloseAddSongModal = () => {
    setShowAddSongModal(false);
  };

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
        pauseOnHover: true,
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
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };
  // fetch data from server
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/song/admin/artist/${currentArtistId}`)
      .then(res=> res.json())
      .then(res => {
        console.log(res.data[0].bai_hat);
        setSongsData(res.data[0].bai_hat);
      });
    
  }, [currentActionType]);
  // 0 : an/ xoa
  // 1 : hoat dong
  // 2 : cho duyet
  // 3 : all
  const filteredSongs = songsData.filter((item) => { 
    return (
      removeVietnameseTones(item.ten_bai_hat.toLowerCase()).includes(removeVietnameseTones(searchQuery.toLowerCase())) &&
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
              <option value="1">Công khai</option>
              <option value="2">Chờ duyệt</option>          
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
           {/* edit*/}
           <button
            onClick={() => handleClickStatusChange("edit")}
            className={`text-xl h-10 w-10 rounded-full bg-[#1E1E1E]  text-white ${
              currentActionType === "edit" ? "bg-[#EB2272]" : ""
            }`}
          >
            <TfiPencil className="m-auto" />
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
      <SongList
        songsData={filteredSongs}
        currentActionType={currentActionType}
        setCurrentActionType={setCurrentActionType}
      />
    </div>
  );
};

const SongList = ({ songsData, currentActionType, setCurrentActionType }) => {
  // fake data

  const [selectedSong, setSelectedSong] = useState(null);
  const [editSongModalState, setEditSongModalState] = useState(false);
  const [detailsSongModalState, setDetailsSongModalState] = useState(false);

  const statusSong ={
    0: "Ẩn",
    1: "Công khai",
    2: "Chờ duyệt",
  }
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
    const song = selectedSong
    if (confirm(`Bạn có chắc muốn xóa album ${song.ten_bai_hat} không?`)) {
      fetch(`http://127.0.0.1:8000/api/song/${song.ma_bai_hat}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            toast.success('Đã xóa bài hát thành công', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              });
            setCurrentActionType("details");
          } else {
            toast.error('🦄 Xóa bài hát thất bại!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
    
              });
          }
        })
        .catch((error) => {
          console.error("Lỗi khi xóa bài hát:", error);
        });
    }
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

  return (
    <div className="mt-5 bg-[#121212] h-screen overflow-scroll">
      {!songsData ? (
        <div className="flex items-center h-[500px] justify-center text-center text-white">
          Chưa có bài hát 
        </div>
      ) : (<> 
      <div className=" py-2 grid grid-cols-5 sm:grid-cols-[4fr_2fr_2fr_2fr] pl-2 text-center  text-[#fff] ">
        <p>Tên bài hát</p>
        <p>Album</p>
        <p>Trạng thái</p>
        <img className="m-auto w-4 " src={assets.clock_icon}></img>{" "}
        {/*  thoi luon*/}
      </div>
      <hr className="mx-5" />

      { songsData.map((item, index) => (
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
            {statusSong[item.trang_thai]}
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
      </>)}
    </div>
    
  );
};

export default ArtistSongPage;
