import React from 'react'
import { Button } from 'antd'

import { CiCirclePlus } from "react-icons/ci";
import { IoIosMore, IoIosSearch } from 'react-icons/io'
import { MdEdit } from "react-icons/md";
import { albumsData, assets, songsData } from '../../assets/assets';
import { Link } from 'react-router-dom';

const ManagerSong = () => {
  return (
   <div className='pt-3 mx-[38px]'>
        <div className='flex justify-between'>
            <div className='flex items-center space-x-5'>
                {/* Search Box */}
                <div className='flex items-center p-2.5 w-[300px] bg-black justify-between rounded-3xl'>
                    <IoIosSearch className="text-white text-2xl cursor-pointer" />
                    <input
                    className="bg-black w-[100%] outline-none ml-3 text-white"
                    type="text"
                    placeholder="Tìm kiếm bài hát, album..."
                    />
                </div>

                {/* User Type Filter */}
                <div>
                    <select className='bg-black text-white p-2.5 rounded-3xl border-none w-[200px] outline-none cursor-pointer'>
                        <option>Tất cả người dùng</option>
                        <option>aaa</option>
                        <option>bbb</option>
                        <option>ccc</option>
                    </select>
                </div>
                <div>
                    <select className='bg-black text-white p-2.5 rounded-3xl border-none w-[200px] outline-none cursor-pointer'>
                        <option>Trạng thái</option>
                        <option>aaa</option>
                        <option>bbb</option>
                        <option>ccc</option>
                    </select>
                </div>

                {/* Search Button */}
                <div>
                    <Button type="primary" className='rounded-3xl bg-[#E0066F] h-[42px] w-[100px] hover:!bg-[#E0066F]'>
                    Tìm kiếm
                    </Button>
                </div>
            </div>
            <div className='flex space-x-5'>
                <div className='w-[40px] h-[40px] flex items-center justify-center rounded-full bg-black'>
                    <CiCirclePlus size={25} />
                </div>
                <div className='w-[40px] h-[40px] flex items-center justify-center rounded-full bg-black'>
                    <MdEdit size={25} />
                </div>
                <div className='w-[40px] h-[40px] flex items-center justify-center rounded-full bg-black'>
                    <CiCirclePlus size={25} />
                </div>
                
                
                
            </div>
        </div>
        <div>
            <p className='mt-7 '>Tổng có : 100 bài hát.</p>
        <div className="grid grid-cols-5 sm:grid-cols-[2.5fr_2.5fr_2fr_2fr_1.5fr] mt-7 p-4 text-[#fff]">
          <p>
            Mã bài hát
          </p>
          <p>Tên bài hát</p>
          <p className="hidden sm:block">album</p>
          <p>thời gian</p>
          
          <p>Trạng thái</p>
        </div>

        <hr />

        {songsData.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-5 sm:grid-cols-[2.5fr_2.5fr_2fr_2fr_1.5fr] text-[#fff] items-center p-4 hover:bg-[#ffffff2b] cursor-pointer"
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

export default ManagerSong