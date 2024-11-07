import React, { useState } from 'react'
import { Button } from 'antd'


import { FaHeart } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa6";
import { IoTimeSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { CiUnlock } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { IoIosMore, IoIosSearch } from 'react-icons/io'
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { albumsData, assets, songData2, songsData } from '../../assets/assets';
import { Link } from 'react-router-dom';

const ManagerSong = () => {
    const baihat= songData2;

  const [selectedSong, setSelectedSong] = useState(null);

  const handleShowDetails = (song) => {
    setSelectedSong(song);
  };

  const handleCloseModal = () => {
    setSelectedSong(null);
  };



  return (
    <div className="pt-3 mx-[38px]">
      <div className="flex justify-between">
        {/* Phần tìm kiếm và bộ lọc */}
        <div className="flex items-center space-x-5">
          <div className="flex flex-col">
            <label className="mb-2">Tìm kiếm bài hát</label>
            <div className="flex items-center p-2.5 w-[300px] bg-black justify-between rounded-3xl">
              <IoIosSearch className="text-white text-2xl cursor-pointer" />
              <input
                className="bg-black w-full outline-none ml-3 text-white"
                type="text"
                placeholder="Tìm kiếm bài hát, album..."
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="mb-2">Trạng thái</label>
            <select className="bg-black text-white p-2.5 rounded-3xl border-none w-[150px] outline-none cursor-pointer">
              <option>Tất cả</option>
              <option>Công khai</option>
              <option>Bị khóa</option>
              <option>Chờ duyệt</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-2">Ngày phát hành</label>
            <div className="flex items-center p-2.5 w-[200px] bg-black justify-between rounded-3xl">
              <input
                className="bg-black w-full outline-none ml-3 text-white"
                type="date"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="mb-1">&nbsp;</label>
            <Button type="primary" className="rounded-3xl bg-[#E0066F] h-[42px] w-[100px] hover:!bg-[#E0066F]">
              Tìm kiếm
            </Button>
          </div>
        </div>
        {/* Phần icon thêm, sửa, xóa */}
        <div className="flex flex-col">
          <label className="mb-1">&nbsp;</label>
          <div className="flex space-x-5">
            <div className="w-[45px] h-[45px] flex items-center justify-center rounded-full bg-black">
              <CiCirclePlus size={30} />
            </div>
            <div className="w-[45px] h-[45px] flex items-center justify-center rounded-full bg-black">
              <MdOutlineEdit size={30} />
            </div>
            <div className="w-[45px] h-[45px] flex items-center justify-center rounded-full bg-black">
              <MdDeleteOutline size={30} />
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <p className="mt-4">Tổng có: 100 bài hát.</p>

        {/* Khu vực cuộn cho danh sách bài hát */}
        <div className="grid grid-cols-5 sm:grid-cols-[1fr_4fr_2fr_2fr_1.5fr] mt-2 p-4 text-[#fff]">
          <p>Mã bài hát</p>
          <p>Tên bài hát</p>
          <p className="hidden sm:block">album</p>
          <p>Thời gian</p>
          <p>Trạng thái</p>
        </div>

        <hr />

        <div className="overflow-y-auto h-[440px]"> 
          {baihat.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-5 sm:grid-cols-[1fr_4fr_2fr_2fr_1.5fr] text-[#fff] items-center p-4 hover:bg-[#E0066F] cursor-pointer"
              onClick={() => handleShowDetails(item)}
            >
              <p className="text-white">{item.ma_bai_hat}</p>
              <p className="text-[15px] flex items-center">
                <img className="inline w-10 mr-2" src={assets.mck} alt="album" /> 
                {item.ten_bai_hat}
              </p>
              <p className="text-[15px] hidden sm:block">2 ngày trước</p>
              <p className="text-[15px]">1.000.950</p>
              <p className="flex ml-7"><CiUnlock /></p> 
            </div>
          ))}
        </div>
      </div>

      {/* Modal chi tiết bài hát */}
      <SongDetailModal
        className="float-start"
        song={selectedSong}
        onClose={handleCloseModal}
      />
    </div>
  );
}
export default ManagerSong;



const SongDetailModal = ({ song, onClose }) => {
  if (!song) return null;
  const songData = songData2[1];
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div className="bg-[#1E1E1E]  p-10 p rounded-lg max-w-screen-sm shadow-lg  relative">
        <div className="flex items-center gap-10 justify-center ">
          <div className="flex items-stretch">
            <img
              // src={songData.hinh_anh}
              src={assets.mck}
              alt={songData.ten_bai_hat}
              className="mb-4 w-40 h-40 rounded"
            />

            <div className="flex flex-col justify-between ml-4 gap-5 text-white">
              <h5 className="text-sm text-gray-400">
                {songData.trang_thai === 1 ? "Công khai" : "ẩn"}
              </h5>
              <h3 className="text-lg text-wrap font-semibold">
                {songData.ten_bai_hat}
              </h3>
              <h5 className="text-sm text-gray-400">
                Ngày phát hành: <span className="text-white">{songData.ngay_phat_hanh}</span>
              </h5>
              <h5 className="text-sm text-gray-400">
                Album: <span className="text-white">{songData.ma_album} ma album</span>
              </h5>
              <h5 className="text-sm text-gray-400">
                Thể loại: <span className="text-white">99%{songData.theloa} the loai</span>
              </h5>
              <h5 className="text-sm text-gray-400">
                Nghệ sĩ: <span className="text-white">{songData.ma_artist}</span>
              </h5>
            </div>
          </div>
          <div className="flex flex-col  gap-3 justify-between w-[60] ml-2">
            <div className="flex flex-row items-center text-gray-400 gap-2">
              <FaHeart />
              <span>11{song.luot_yeu_thich}</span>
            </div>
            <div className="flex flex-row items-center text-gray-400 gap-2">
              <FaHeadphones />
              <span>11{song.luot_nghe}</span>
            </div>
            <div className="flex flex-row items-center text-gray-400 gap-2">
              <IoTimeSharp />
              <span>3:2</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white py-2 px-4 rounded"
        >
          {" "}
          <IoClose size={25} />
        </button>
      </div>
    </div>
  );
};
