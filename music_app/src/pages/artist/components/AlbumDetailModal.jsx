import { FaHeart } from "react-icons/fa"
import { FaXmark } from "react-icons/fa6";
import { useState,useEffect, } from "react";
import { extractYear } from "../../../assets/assets";
const AlbumDetailModal = ({ album, detailsAlbumSodalState, onClose }) => {
  if (!detailsAlbumSodalState) return null;
  
  const status = {
    0:"Ẩn",
    1: "Công khai",
    2: "Chờ duyệt"
  }
  const [songsOfAlbumData, setSongOfAlbumData] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/albums/${album.ma_album}/songs`)
    .then(res=>res.json())
    .then(res => setAlbumData(res.album))
    
  },[detailsAlbumSodalState])
  console.log('d',albumData)
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="min-w-3xl mx-auto bg-[#1E1E1E] p-6 rounded-lg shadow-md relative ">
        <div className="flex items-center justify-center ">
          <div className="flex items-stretch gap-2">
            <img
              src={albumData.hinh_anh}
              alt={albumData.ten_album}
              className=" aspect-square h-40 flex-none"
            />

            <div className="album-infor flex flex-col justify-between ml-4  text-gray-400 p-2">
              <h5 className="text-sm ">
                <span>{status[albumData.trang_thai]}</span>
              </h5>
              <h5 className="text-xl text-white ">{albumData.ten_album}</h5>
              <h5 className="inline-flex items-center gap-2">
                {extractYear(albumData.ngay_tao) + " * " +albumData.luot_yeu_thich}
                <FaHeart />
              </h5>
            </div>
          </div>
        </div>
        <div className="static overflow-y-auto ">
        <div className="flex mt-8 flex-col gap-4 max-h-80 overflow-y-auto">
      { albumData.songs?.length > 0  ?
       albumData.songs.map((song, index) => (
          <div
            key={song.ma_bai_hat}
            className="flex flex-row justify-between items-center h-fit gap-4 max-w-50"
          >
            <div className="inline-flex items-center gap-4">
              <h5>{index + 1}</h5>
              <img
                src={song.hinh_anh}
                alt={song.ten_bai_hat}
                className="flex-none w-10 h-10 aspect-square"
              />
            </div>
            <p className="text-wrap max-w-80 flex-1 ">{song.ten_bai_hat}</p>
            <p className="flex-none">{song.thoi_luong}</p>
          </div>
        )) : "không có bài hát"
    }
    </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white py-2 px-4 rounded"
        >
          <FaXmark />
        </button>
      </div>
    </div>
  );
};

export default AlbumDetailModal;

{/* Intruction how to use
  parent component

  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const handleCardClick = (album) => {
    setSelectedAlbum(album); thong tin album hien tai
  };

  const closeModal = () => {
    setSelectedAlbum(null);
  };
  
  return( ....
  <AlbumDetailModal album={selectedAlbum} onClose={closeModal} /> 
   )
  
  
   */}
  