import  { useContext, useEffect, useState } from "react";
import { Button } from "antd";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { albumsData } from "../../assets/assets";
import { IoClose } from "react-icons/io5";
import { BiSolidLock, BiSolidLockOpen } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import SongItem from "./ManagerAlbum/SongItem";
import EditAlbumModal from "../../pages/artist/components/EditAlbumModal";
import { PlayerContext } from "../../context/PlayerContext";
import AlbumDetailModal from "../../pages/artist/components/AlbumDetailModal";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ManagerAlbum = () => {
  const { albumsData } = useContext(PlayerContext);
  const [album, setAlbum] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [currentActionType, setCurrentActionType] = useState("details");
  const [editAlbumModalState, setEditAlbumModalState] = useState(false);
  const [detailsAlbumSodalState, setDetailsAlbumModalState] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  useEffect(() => {

    setAlbum(albumsData);
  }, [albumsData]);

  const displayStatus = (status) => {
    switch (status) {
      case 0:
        return "bị khóa";
      case 1:
        return "Công khai";
      case 2:
        return "Chờ duyệt";
      default:
        return "";
    }
  };
  const handleCardClick = (album) => {
    setSelectedAlbum(album);
  };

  const closeModal = () => {
    setDetailsAlbumModalState(false);
    setEditAlbumModalState(false);
    setSelectedAlbum(null);
    setCurrentActionType("details")
  };

  const actionList = {
    delete: " xóa",
    edit: "chỉnh sửa",
    details: " xem chi tiết",
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
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleClickStatusChange = (actionType) => {
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

  const handleShowDetails = (album) => {
    setSelectedAlbum(album);
    setDetailsAlbumModalState(true);
  };

  const handleShowEditModal = (album) => {
    setSelectedAlbum(album);
    setEditAlbumModalState(true);
  };

  const handleCloseEditModal = () => {
    setSelectedAlbum(null);
    setEditAlbumModalState(false);
    setCurrentActionType("details");
  };

  const deleteAlbum = (album) => {
    alert("xoa");
  };

  const clickedAction = {
    details: (album) => handleShowDetails(album),
    edit: (album) => handleShowEditModal(album),
    delete: (album) => deleteAlbum(album),
  };

  function handleClickedAlbumItem(actionType, albumInformation) {
    const action = clickedAction[actionType];
    if (action) {
      return clickedAction[actionType](albumInformation);
    } else {
      alert(`Wrong action type ${actionType}`);
    }
  }

  const handleSearchAndReset = () => {
    setAlbum(filteredAlbums);
    setSearchQuery("");
    setSelectedStatus("");
  };
  const filteredAlbums = () => {
    return albumsData.filter((album) => {
      const matchesQuery = removeVietnamese(album.ten_album)
        .toLowerCase()
        .includes(removeVietnamese(searchQuery).toLowerCase());
      const matchesStatus =
        selectedStatus === "" ||
        album.trang_thai == selectedStatus;
      const matchesReleaseDate = releaseDate
        ? album.ngay_tao === releaseDate
        : true;
      return matchesQuery && matchesStatus && matchesReleaseDate;
    });
  };

  return (
    <div className="pt-3 mx-[38px]">
      <div className="flex justify-between">
        <div className="flex items-center space-x-5">
          <div className="flex flex-col">
            <label className="mb-1">Tìm kiếm album</label>
            <div className="flex items-center p-2 w-[300px] bg-black justify-between rounded-lg">
              <IoIosSearch className="text-white text-2xl cursor-pointer" />
              <input
                className="bg-black w-[100%] outline-none ml-3 text-white"
                type="text"
                placeholder="Tìm kiếm album..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Trạng thái</label>
            <select
              className="bg-black text-white p-2 rounded-lg border-none w-[150px] outline-none cursor-pointer"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="1">Công khai</option>
              <option value="0">Ẩn</option>
              <option value="2">Chờ duyệt</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Ngày phát hành</label>
            <div className="flex items-center p-1.5 w-[200px] bg-black justify-between rounded-lg">
              <input
                className="bg-black w-[100%] outline-none ml-3 text-white"
                type="date"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-1">&nbsp;</label>
            <Button
              onClick={handleSearchAndReset}
              type="primary"
              className="rounded-lg bg-[#E0066F] h-[36px] w-[100px] hover:!bg-[#E0066F]"
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

      <div className="grid grid-cols-6 gap-4 mt-7 h-[540px] overflow-y-auto pb-8">
        {album.length === 0 ? (
          <div className="flex items-center justify-center col-span-6 text-center text-white">
            Không có album bạn tìm
          </div>
        ) : (
          album.map((album) => (
            <div
              key={album.ma_album}
              className="bg-gradient-to-b from-gray-800 to-black shadow-lg cursor-pointer h-[280px] flex flex-col justify-between rounded-lg"
              onClick={() => handleClickedAlbumItem(currentActionType, album)}
            >
              <div className="flex justify-center mt-1">
                <img
                  src={album.hinh_anh}
                  alt={album.ten_album}
                  className="aspect-square object-fit h-[160px] w-[160px] rounded-lg"
                />
              </div>

              <div className="flex flex-row items-baseline justify-between px-2">
                <div className="flex-1 flex flex-col">
                  <h2 className="text-[16px] font-semibold py-2 ellipsis">
                    {album.ten_album.slice(0, 18)}
                  </h2>
                  <p className="text-white"> {formatDate(album.ngay_tao)} </p>
                  <p className="text-lg text-white inline-flex items-center gap-1">
                    <FaHeart size={15} />
                    <span className="text-[14px]">123</span>
                  </p>
                </div>
                <div className="statusIcon flex-none text-xl">
                  {album.trang_thai == 1 ? (
                    <BiSolidLockOpen size={15} />
                  ) : (
                    <BiSolidLock size={15} />
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        {selectedAlbum && (
          <AlbumDetailModal 
            album={selectedAlbum} onClose={closeModal} 
            detailsAlbumSodalState={detailsAlbumSodalState} />
        )}
        <EditAlbumModal
          className="float-start"
          selectedAlbum={selectedAlbum}
          editAlbumModalState={editAlbumModalState}
          onClose={handleCloseEditModal}
        />
      </div>
    </div>
  );
};

export default ManagerAlbum;

