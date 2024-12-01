import ManageBar from "./components/ManageBar";
import { useEffect, useState } from "react";
import {
  removeVietnameseTones,
  extractDayMonthYear,
  extractYear,
} from "../../assets/assets";
import { assets } from "../../assets/assets";
import { CiSearch } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { BiSolidLock } from "react-icons/bi";
import { BiSolidLockOpen } from "react-icons/bi";
import { GoPlus } from "react-icons/go";
import { TfiPencil } from "react-icons/tfi";
import { FaTrash } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import AddAlbumModal from "./components/AddAlbumModal";
import EditAlbumModal from "./components/EditAlbumModal";
import AlbumDetailModal from "./components/AlbumDetailModal";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ArtistAlbumPage = () => {
  const [albumsData, setAlbumsData] = useState([]);
  const [showAddAlbumModal, setShowAddAlbumModal] = useState(false);
  const [currentActionType, setCurrentActionType] = useState("details");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(3);

  const account = JSON.parse(localStorage.getItem('account')) || {};
  const currentArtistId = account.ma_tk 

  //const currentArtistId = parsedUser.ma_tai_khoan;;



  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/albums/artist/${currentArtistId}`)
      .then((res) => res.json())
      .then((res) => setAlbumsData(res.albums));
  }, [currentActionType,showAddAlbumModal]);

  const handleShowAddAlbumModal = () => {
    setShowAddAlbumModal(true);
  };
  const handleCloseAddAlbumModal = () => {
    setShowAddAlbumModal(false);
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

  const filteredAlbums = albumsData?.filter((item) => {
    return (
      removeVietnameseTones(item.ten_album.toLowerCase()).includes(
        removeVietnameseTones(searchQuery.toLowerCase())
      ) &&
      (selectedStatus == 3 || item.trang_thai == selectedStatus) // 2 la tat ca
    );
  });

  return (
    <>
      <div className="p-2 mt-5">
        {/* manage bar */}
        <div className="grid grid-cols-2 justify-center ">
          <div className="inline-flex items-center gap-10">
            <div className="flex items-center p-1 w-[500px] bg-[#1E1E1E] justify-between rounded-3xl">
              <CiSearch className="text-3xl font-bold" />
              <input
                className="bg-inherit w-[100%] outline-none ml-3"
                type="text"
                placeholder="Tìm kiếm album"
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
              onClick={() => handleShowAddAlbumModal()}
              className="text-3xl h-10 w-10 rounded-full bg-[#1E1E1E]  text-white"
            >
              <GoPlus className="m-auto" />
            </button>
            <button
              onClick={() => handleClickStatusChange("edit")}
              className={`text-xl h-10 w-10 rounded-full bg-[#1E1E1E]  text-white ${
                currentActionType === "edit" ? "bg-[#EB2272]" : ""
              }`}
            >
              <MdOutlineEdit className="m-auto" />
            </button>
            <button
              onClick={() => handleClickStatusChange("delete")}
              className={`text-xl h-10 w-10 rounded-full bg-[#1E1E1E]  text-white ${
                currentActionType === "delete" ? "bg-[#EB2272]" : ""
              }`}
            >
              <FaTrash className="m-auto" />
            </button>
          </div>
          <AddAlbumModal
            handleCloseAddAlbumModal={handleCloseAddAlbumModal}
            modalState={showAddAlbumModal}
          />
        </div>
        <h3 className="mt-3">
          Tổng cộng: {filteredAlbums ? filteredAlbums.length : 0}
        </h3>
        <AlbumList
          albumsData={filteredAlbums}
          currentActionType={currentActionType}
          setCurrentActionType={setCurrentActionType}
        />
      </div>
    </>
  );
};

const AlbumList = ({ albumsData, currentActionType, setCurrentActionType }) => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [editAlbumModalState, setEditAlbumModalState] = useState(false);
  const [detailsAlbumSodalState, setDetailsAlbumModalState] = useState(false);

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
  const handleCloseEditModal = () => {
    setSelectedAlbum(null);
    setDetailsAlbumModalState(false);
    setEditAlbumModalState(false);
    setCurrentActionType("details");
  };
  function deleteAlbum(album) {
    if (confirm(`Bạn có chắc muốn xóa album ${album.ten_album} không?`)) {
      fetch(`http://127.0.0.1:8000/api/albums/${album.ma_album}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            toast.success('Đã xóa album thành công', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              });
            setCurrentActionType("details");
          } else {
            toast.error('🦄 Wow so easy!', {
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
    details: (album) => handleShowDetails(album),
    edit: (album) => handleShowEditModal(album),
    delete: (album) => deleteAlbum(album),
  };

  function handleClickedSongItem(actionType, albumInformation) {
    const action = clickedAction[actionType];
    if (action) {
      return clickedAction[actionType](albumInformation);
    } else {
      alert(`Wrong action type ${actionType}`);
    }
  }

  return (
    <div>
      {albumsData ? (
        <div className="grid grid-cols-6 gap-4 mt-7 h-[540px] overflow-y-auto pb-8">
          {albumsData.map((album) => (
            <div
              key={album.ma_album}
              className="bg-gradient-to-b from-gray-800 to-black shadow-lg cursor-pointer h-[280px] flex flex-col justify-between rounded-lg"
              onClick={() => handleClickedSongItem(currentActionType, album)}
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
                  <h2 className="text-[16px] font-semibold py-2">
                    {album.ten_album}
                  </h2>
                  <p className="text-white">
                    {" "}
                    {extractDayMonthYear(album.ngay_tao)}{" "}
                  </p>
                  <p className="text-lg text-white inline-flex items-center gap-1">
                    <FaHeart size={15} />
                    <span className="text-[14px]">12</span>
                  </p>
                </div>
                <div className="statusIcon flex-none text-xl ">
                  {album.trang_thai === 1 ? (
                    <BiSolidLockOpen />
                  ) : (
                    <BiSolidLock />
                  )}
                </div>
              </div>
            </div>
          ))}{" "}
        </div>
      ) : (
        <div className="flex items-center h-[500px] justify-center text-center text-white">
          <hr />
          Chưa có album
        </div>
      )}

      {selectedAlbum && (
        <AlbumDetailModal
          album={selectedAlbum}
          detailsAlbumSodalState={detailsAlbumSodalState}
          onClose={handleCloseDetailModal}
        />
      )}
      <EditAlbumModal
        className="float-start"
        selectedAlbum={selectedAlbum}
        editAlbumModalState={editAlbumModalState}
        onClose={handleCloseEditModal}
      />
    </div>
  );
};

export default ArtistAlbumPage;
