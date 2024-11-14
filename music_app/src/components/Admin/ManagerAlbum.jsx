import React, { useState } from "react";
import { Button } from "antd";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { albumsData } from "../../assets/assets"; // Đảm bảo rằng albumsData có sẵn trong dự án
import { IoClose } from "react-icons/io5";
import { BiSolidLock, BiSolidLockOpen } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import SongItem from "./ManagerAlbum/SongItem";
import EditAlbumModal from "../../pages/artist/components/EditAlbumModal";

const ManagerAlbum = () => {
  const [album, setAlbum] = useState(albumsData);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [currentActionType, setCurrentActionType] = useState("details");
  const [editAlbumModalState, setEditAlbumModalState] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  const displayStatus = (status) => {
    switch (status) {
      case 1:
        return "Chờ duyệt";
      case 2:
        return "Công khai";
      case 3:
        return "bị Khóa";
      default:
        return "";
    }
  };
  const handleCardClick = (album) => {
    setSelectedAlbum(album);
  };

  const closeModal = () => {
    setSelectedAlbum(null);
  };

  const actionList = {
    delete: " xóa",
    edit: "chỉnh sửa",
    details: " xem chi tiết",
  };

  const handleClickStatusChange = (actionType) => {
    if (actionType === currentActionType) {
      setCurrentActionType("details");
      alert(`Thoát trạng thái ${actionList[actionType]}`);
    } else {
      setCurrentActionType(actionType);
      alert(`Đang ở trạng thái ${actionList[actionType]}`);
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

  const handleCloseDetailModal = () => {
    setSelectedAlbum(null);
    setDetailsAlbumModalState(false);
    setEditAlbumModalState(false);
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
      const matchesQuery = album.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        selectedStatus === "" || displayStatus(album.status) === selectedStatus;
      const matchesReleaseDate = releaseDate
        ? album.releaseDate === releaseDate
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
              <option value="public">Công khai</option>
              <option value="private">Ẩn</option>
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
            <div
              onClick={() => handleClickStatusChange("delete")}
              className={`w-[36px] h-[36px] flex items-center justify-center rounded-full ${
                currentActionType === "delete" ? "bg-[#EB2272]" : "bg-black"
              }`}
            >
              <MdDeleteOutline size={20} />
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
              key={album.id}
              className="bg-gradient-to-b from-gray-800 to-black shadow-lg cursor-pointer h-[280px] flex flex-col justify-between rounded-lg"
              onClick={() => handleClickedAlbumItem(currentActionType, album)}
            >
              <div className="flex justify-center mt-1">
                <img
                  src={album.image}
                  alt={album.name}
                  className="aspect-square object-fit h-[160px] w-[160px] rounded-lg"
                />
              </div>

              <div className="flex flex-row items-baseline justify-between px-2">
                <div className="flex-1 flex flex-col">
                  <h2 className="text-[16px] font-semibold py-2">
                    {album.name}
                  </h2>
                  <p className="text-white"> 2023 </p>
                  <p className="text-lg text-white inline-flex items-center gap-1">
                    <FaHeart size={15} />
                    <span className="text-[14px]">123</span>
                  </p>
                </div>
                <div className="statusIcon flex-none text-xl">
                  {album.isPublic ? (
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
          <AlbumDetailModal album={selectedAlbum} onClose={closeModal} />
        )}
        <EditAlbumModal
          className="float-start"
          selectedAlbum={selectedAlbum}
          editAlbumModalState={editAlbumModalState}
          onClose={handleCloseDetailModal}
        />
      </div>
    </div>
  );
};

export default ManagerAlbum;

const AlbumDetailModal = ({ album, onClose }) => {
  console.log(album.id);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-xl mx-auto bg-[#1E1E1E] p-6 rounded-lg shadow-md relative">
        <div className="flex items-center">
          <div className="flex items-center justify-start gap-2">
            <img
              src={album.image}
              alt={album.name}
              className="aspect-square h-40 flex-none"
            />
            <div className="album-info flex flex-col justify-between ml-4 text-gray-400 py-4">
              <h5 className="text-sm">
                <span>{album.isPublic ? "Công khai" : "Ẩn"}</span>
              </h5>
              <h5 className="text-4xl text-white ">{album.name}</h5>
              <h5 className="inline-flex items-center my-3">20/11/2024</h5>
              <h5 className="flex items-center ">
                <span className="mr-3 mb-1">324</span>
                <FaHeart size={15} />
              </h5>
            </div>
          </div>
        </div>

        {/* Song List */}
        <div className="overflow-y-auto mt-4">
          <SongItem />
          {/* {songsData
            .filter(song => song.albumId === album.id)
            .map((song) => (
              <div key={song.id} className="flex justify-between p-2 text-white bg-gray-700 rounded-lg mb-2">
                <span>{song.name}</span>
                <span>{song.duration}</span>
              </div>
            ))
          
            } */}
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white py-3 px-3 rounded"
        >
          <IoClose size={25} />
        </button>
      </div>
    </div>
  );
};
