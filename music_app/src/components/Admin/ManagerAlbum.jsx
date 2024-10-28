import React from 'react'
import { Button } from 'antd'

import { CiCirclePlus } from "react-icons/ci";
import { IoIosMore, IoIosSearch } from 'react-icons/io'
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { albumsData, assets, songsData } from '../../assets/assets';
import { Link } from 'react-router-dom';

const ManagerAlbum = () => {
  return (
   <div className='pt-3 mx-[38px]'>
        <div className='flex justify-between'>
            <div className='flex items-center space-x-5'>
                {/* Search Box */}
                

                <div className='flex flex-col'>
                  <label className='mb-2'>Tìm kiếm album</label>

                   <div className='flex items-center p-2.5 w-[300px] bg-black justify-between rounded-3xl'>
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
                    <lable className="mb-2">Trạng thái</lable>
                    <select className='bg-black text-white p-2.5 rounded-3xl border-none w-[150px] outline-none cursor-pointer'>
                        <option>Tất cả</option>
                        <option>aaa</option>
                        <option>bbb</option>
                        <option>ccc</option>
                    </select>
                </div>
                <div className='flex flex-col'>
                  <label className='mb-2'>Ngày phát hành</label>

                   <div className='flex items-center p-2.5 w-[200px] bg-black justify-between rounded-3xl'>
                    {/* <IoIosSearch className="text-white text-2xl cursor-pointer" /> */}
                    <input
                    className="bg-black w-[100%] outline-none ml-3 text-white"
                    type="date"
                    // placeholder="Tìm kiếm bài hát, album..."
                    />
                  </div>
                </div>

                {/* Search Button */}
                <div className='flex flex-col'>
                  <label className='mb-1'>&nbsp;</label> {/* Dùng label rỗng để giữ chiều cao tương tự */}
                  <Button type="primary" className='rounded-3xl bg-[#E0066F] h-[42px] w-[100px] hover:!bg-[#E0066F]'>
                    Tìm kiếm
                  </Button>
                </div>
            </div>
            <div className='flex flex-col'>
              <label className='mb-1'>&nbsp;</label>
              <div className='flex space-x-5'>
                <div className='w-[45px] h-[45px] flex items-center justify-center rounded-full bg-black'>
                    <CiCirclePlus size={30} />
                </div>
                <div className='w-[45px] h-[45px] flex items-center justify-center rounded-full bg-black'>
                    <MdOutlineEdit  size={30} />
                </div>
                <div className='w-[45px] h-[45px] flex items-center justify-center rounded-full bg-black'>
                    <MdDeleteOutline size={30}/>
                </div>
               </div>

            </div>
        </div>
        <div>
            <p className='mt-7 '>Tổng có : 100 Album.</p>
        <div className="grid grid-cols-5 sm:grid-cols-[2.5fr_2.5fr_2fr_2fr_1.5fr] mt-7 p-4 text-[#fff]">
          <p>
            Mã album
          </p>
          <p>Tên album</p>
          <p className="hidden sm:block">Nghệ sĩ</p>
          <p>Ngày phát hành</p>
          
          <p>Trạng thái</p>
        </div>

        <hr />

        {songsData.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-5 sm:grid-cols-[2.5fr_2.5fr_2fr_2fr_1.5fr] text-[#fff] items-center p-4 hover:bg-[#E0066F] cursor-pointer"
          >
            <Link to='/song/1' className="text-white">
              {item.name}
            </Link>
            <Link to="/song/:id" className="text-[15px]">{albumsData.name}</Link>
            <p className="text-[15px] hidden sm:block">2 ngày trước</p>
            <p className="text-[15px]">1.000.950</p>
            <p className="text-[15px] ml-5">{item.duration}</p>
            {/* <p className="text-[15px] flex justify-center"><IoIosMore /></p>  */}
          </div>
        
      ))}
      </div>
    </div>
  )
}

export default ManagerAlbum

// const AlbumDetailModal = ({ album, onClose }) => {
//   const closeModal = () => {
//     setSelectedAlbum(null);
//   };
//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
//     >
//       <div className="max-w-2xl mx-auto bg-[#1E1E1E] p-6 rounded-lg shadow-md relative ">
//         <div className="flex items-center justify-center ">
//           <div className="flex items-stretch gap-2">
//             <img
//               src={assets.ss}
//               alt={album.tenAlbum}
//               className=" aspect-square h-40 flex-none"
//             />

//             <div className="album-infor flex flex-col justify-between ml-4  text-gray-400 p-2">
//               <h5 className="text-sm ">
//                 <span>{album.status === 1 ? "Công khai" : "Ẩn"}</span>
//               </h5>
//               <h5 className="text-xl text-white ">99%</h5>
//               <h5 className="inline-flex items-center gap-2">
//                 {" "}
//                 2020 - 10000 <FaHeart />
//               </h5>
//             </div>
//           </div>
//         </div>
//         <div className="static overflow-y-auto ">
//           {/* <AlbumSongList /> */}
//         </div>

//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-white py-2 px-4 rounded"
//         >
//           {" "}
//           X
//         </button>
//       </div>
//     </div>
//   );
// };