import ManageBar from "./components/ManageBar";
import { useEffect, useState } from "react";
import { removeVietnameseTones,extractDayMonthYear,extractYear } from "../../assets/assets";
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
const ArtistAlbumPage = () => {
  const currentArtistId = "ACC0006";
  const [albumsData, setAlbumsData] = useState([]);
  const [showAddAlbumModal, setShowAddAlbumModal] = useState(false);
  const [currentActionType, setCurrentActionType] = useState('details');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(2);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/albums/artist/${currentArtistId}`)
    .then(res=>res.json())
    .then(res=>setAlbumsData(res.albums))
  }, []);

  
  
  const handleShowAddAlbumModal = () => {
    
    setShowAddAlbumModal(true);
    
  };
  const handleCloseAddAlbumModal = () => {
    setShowAddAlbumModal(false);
  };

  const actionList = {
    'delete': ' xóa',
    'edit' : 'chỉnh sửa',
    'details': ' xem chi tiết'
  }
  const handleClickStatusChange =(actionType) => {
    // status include details,edit,delete
    if (actionType === currentActionType) {
      setCurrentActionType('details');
      alert(`Thoát trạng thái ${actionList[actionType]}`);
    }
    else {
      setCurrentActionType(actionType);
      alert(`Đang ở trạng thái ${actionList[actionType]}`)
    }
  }

  const filteredAlbums = albumsData.filter((item) => { 
    return (
      removeVietnameseTones(item.ten_album.toLowerCase())
        .includes(removeVietnameseTones(searchQuery.toLowerCase())) &&
      ( selectedStatus == 3 || item.trang_thai == selectedStatus) // 2 la tat ca
    )
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
            onClick={() => handleClickStatusChange('edit')}
            className={`text-xl h-10 w-10 rounded-full bg-[#1E1E1E]  text-white ${currentActionType === "edit" ? 'bg-[#EB2272]' : '' }`}>
              <MdOutlineEdit className="m-auto" />
            </button>
            <button 
            onClick={() => handleClickStatusChange('delete')}
            className={`text-xl h-10 w-10 rounded-full bg-[#1E1E1E]  text-white ${currentActionType === "delete" ? 'bg-[#EB2272]' : '' }`}>
              <FaTrash className="m-auto" />
            </button>
          </div>
          <AddAlbumModal
            onClose={handleCloseAddAlbumModal}
            modalState={showAddAlbumModal}
          />
        </div>
        <h3 className="mt-3">Tổng cộng: {filteredAlbums.length}</h3>
        <AlbumList albumsData={filteredAlbums} currentActionType={currentActionType}/>
      </div>
    </>
  );
};

const AlbumList = ({ albumsData,currentActionType }) => {

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
  }
  const handleCloseDetailModal = () => {
    setSelectedAlbum(null);
    setDetailsAlbumModalState(false);
    setEditAlbumModalState(false);
  };

  function deleteAlbum(album) {
    //gửi data song để xóa
    alert('xoa')
  }

  const clickedAction = {
    'details': (album) =>  handleShowDetails(album),
    'edit': (album) =>  handleShowEditModal(album),
    'delete': (album) =>  deleteAlbum(album),
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
    <div className="grid grid-cols-6 gap-4 mt-7 h-[540px] overflow-y-auto pb-8">
      {albumsData.map((album) => (
        <div
          key={album.ma_album}
          className="bg-gradient-to-b from-gray-800 to-black shadow-lg cursor-pointer h-[280px] flex flex-col justify-between rounded-lg"
          onClick={() => handleClickedSongItem(currentActionType,album)}
        >
          <div className='flex justify-center mt-1'>
          <img
            src={album.hinh_anh}
            alt={album.ten_album}
            className="aspect-square object-fit h-[160px] w-[160px] rounded-lg"
          />
          </div>
          <div className="flex flex-row items-baseline justify-between px-2">
                  <div className="flex-1 flex flex-col">
                    <h2 className="text-[16px] font-semibold py-2">{album.ten_album}</h2>
                    <p className="text-white"> {extractDayMonthYear(album.ngay_tao)} </p>
                    <p className="text-lg text-white inline-flex items-center gap-1">
                      <FaHeart size={15} />
                      <span className='text-[14px]'>12</span>
                    </p>
                  </div>
            <div className="statusIcon flex-none text-xl ">
              {album.trang_thai === 1 ? <BiSolidLockOpen /> : <BiSolidLock />}
            </div>
          </div>
        </div>
      ))}
      {selectedAlbum && (
        <AlbumDetailModal album={selectedAlbum} onClose={handleCloseDetailModal} />
      )}
      <EditAlbumModal
        className="float-start"
        selectedAlbum={selectedAlbum}
        editAlbumModalState={editAlbumModalState}
        onClose={handleCloseDetailModal} />
    </div>
  );
};

// const AlbumDetailModal = ({ album, onClose }) => {
//   const [songsOfAlbumData, setSongOfAlbumData] = useState([]);
//   console.log(album.ma_album)
//   useEffect(() => {
//        //fetch(`http://127.0.0.1:8000/api/albumsAL0009/songs`)
//     fetch(`http://127.0.0.1:8000/api/albums${album.ma_album}/songs`)
//     .then(res=>res.json())
//     .then(res => setSongOfAlbumData(res.album.songs))
    
//   },[])
//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
//     >
//       <div className="min-w-3xl mx-auto bg-[#1E1E1E] p-6 rounded-lg shadow-md relative ">
//         <div className="flex items-center justify-center ">
//           <div className="flex items-stretch gap-2">
//             <img
//               src={album.hinh_anh}
//               alt={album.ten_album}
//               className=" aspect-square h-40 flex-none"
//             />

//             <div className="album-infor flex flex-col justify-between ml-4  text-gray-400 p-2">
//               <h5 className="text-sm ">
//                 <span>{album.trang_thai === 1 ? "Cong khai" : "An"}</span>
//               </h5>
//               <h5 className="text-xl text-white ">99%</h5>
//               <h5 className="inline-flex items-center gap-2">
//                 {extractYear(album.ngay_tao) + " * " +album.luot_yeu_thich}
//                 <FaHeart />
//               </h5>
//             </div>
//           </div>
//         </div>
//         <div className="static overflow-y-auto ">
//         <div className="flex mt-8 flex-col gap-4 max-h-80 overflow-y-auto">
//       { songsOfAlbumData.length > 0  ?
//        songsOfAlbumData.map((song, index) => (
//           <div
//             key={song.ma_bai_hat}
//             className="flex flex-row justify-between items-center h-fit gap-4 max-w-50"
//           >
//             <div className="inline-flex items-center gap-4">
//               <h5>{index + 1}</h5>
//               <img
//                 src={song.hinh_anh}
//                 alt={song.ten_bai_hat}
//                 className="flex-none w-10 h-10 aspect-square"
//               />
//             </div>
//             <p className="text-wrap max-w-80 flex-1 ">{song.ten_bai_hat}</p>
//             <p className="flex-none">{song.thoi_luong}</p>
//           </div>
//         )) : "không có bài hát"
//     }
//     </div>
//         </div>

//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-white py-2 px-4 rounded"
//         >
//           <FaXmark />
//         </button>
//       </div>
//     </div>
//   );
// };

export default ArtistAlbumPage;
