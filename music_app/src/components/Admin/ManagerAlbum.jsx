import React, { useState } from 'react'
import { Button } from 'antd'
import { CiCirclePlus } from "react-icons/ci";
import { IoIosSearch } from 'react-icons/io'
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { albumsData, songsData } from '../../assets/assets';
import { IoClose } from "react-icons/io5";
import { BiSolidLock, BiSolidLockOpen } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa';
import SongItem from './ManagerAlbum/SongItem';

const ManagerAlbum = () => {
   const [selectedAlbum, setSelectedAlbum] = useState(null);

   const handleCardClick = (album) => {
     setSelectedAlbum(album);
   };

   const closeModal = () => {
     setSelectedAlbum(null);
   };

   return (
     <div className='pt-3 mx-[38px]'>
        <div className='flex justify-between'>
            <div className='flex items-center space-x-5'>
                {/* Search Box */}
                <div className='flex flex-col'>
                  <label className='mb-1'>Tìm kiếm album</label>
                  <div className='flex items-center p-2 w-[300px] bg-black justify-between rounded-3xl'>
                    <IoIosSearch className="text-white text-2xl cursor-pointer" />
                    <input
                      className="bg-black w-[100%] outline-none ml-3 text-white"
                      type="text"
                      placeholder="Tìm kiếm bài hát, album..."
                    />
                  </div>
                </div>

                {/* User Type Filter */}
                <div className='flex flex-col'>
                    <label className="mb-1">Trạng thái</label>
                    <select className='bg-black text-white p-2 rounded-3xl border-none w-[150px] outline-none cursor-pointer'>
                        <option>Tất cả</option>
                        <option>aaa</option>
                        <option>bbb</option>
                        <option>ccc</option>
                    </select>
                </div>
                <div className='flex flex-col'>
                  <label className='mb-1'>Ngày phát hành</label>
                  <div className='flex items-center p-1.5 w-[200px] bg-black justify-between rounded-3xl'>
                    <input
                      className="bg-black w-[100%] outline-none ml-3 text-white"
                      type="date"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <div className='flex flex-col'>
                  <label className='mb-1'>&nbsp;</label>
                  <Button type="primary" className='rounded-3xl bg-[#E0066F] h-[36px] w-[100px] hover:!bg-[#E0066F]'>
                    Tìm kiếm
                  </Button>
                </div>
            </div>
            <div className='flex flex-col'>
              <label className='mb-1'>&nbsp;</label>
              <div className='flex space-x-5'>
                <div className='w-[36px] h-[36px] flex items-center justify-center rounded-full bg-black'>
                    <MdOutlineEdit  size={20} />
                </div>
                <div className='w-[36px] h-[36px] flex items-center justify-center rounded-full bg-black'>
                    <MdDeleteOutline size={20}/>
                </div>
               </div>
            </div>
        </div>
        <div>
          {/* UI Album */}
          <div className="grid grid-cols-6 gap-4 mt-7 h-[540px] overflow-y-auto pb-8">
            {albumsData.map((album) => (
              <div
                key={album.id}
                className="bg-gradient-to-b from-gray-800 to-black shadow-lg cursor-pointer h-[280px] flex flex-col justify-between rounded-lg"
                onClick={() => handleCardClick(album)}
              >
                <div className='flex justify-center mt-1'>
                  <img
                    src={album.image}
                    alt={album.name}
                    className="aspect-square object-fit h-[160px] w-[160px] rounded-lg"
                  />
                </div>
                
                <div className="flex flex-row items-baseline justify-between px-2">
                  <div className="flex-1 flex flex-col">
                    <h2 className="text-[16px] font-semibold py-2">{album.name}</h2>
                    <p className="text-white"> 2023 </p>
                    <p className="text-lg text-white inline-flex items-center gap-1">
                      <FaHeart size={15} />
                      <span className='text-[14px]'>123</span>
                    </p>
                  </div>
                  <div className="statusIcon flex-none text-xl">
                    {album.isPublic ? <BiSolidLockOpen size={15} /> : <BiSolidLock size={15} />}
                  </div>
                </div>
              </div>
            ))}
            {selectedAlbum && (
              <AlbumDetailModal album={selectedAlbum} onClose={closeModal} />
            )}
          </div>
        </div>
      </div>
  );
};

export default ManagerAlbum;

const AlbumDetailModal = ({ album, onClose }) => {
  console.log(album.id)
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
              <h5 className="inline-flex items-center my-3">
                20/11/2024
              </h5>
              <h5 className="flex items-center ">
                <span className='mr-3 mb-1'>324</span>
                <FaHeart size={15} />
              </h5>
            </div>
          </div>
        </div>
        
        {/* Song List */}
        <div className="overflow-y-auto mt-4">
          <SongItem/>
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
