import { Button } from 'antd'
import React from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { IoIosMore, IoIosSearch } from 'react-icons/io'
import { MdOutlineEdit } from "react-icons/md";
import { albumsData, assets, songsData } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { MdDeleteOutline } from "react-icons/md";

const ManagerAccount = () => {
  return (
    <div className='pt-3 mx-[38px]'>
        <div className='flex justify-between items-center'>
            <div className='flex items-center  space-x-5'>
                <div className='flex flex-col'>
                  <label className='mb-2'>Tìm kiếm tài khoản</label>

                  <div className='flex items-center p-2.5 w-[300px] bg-black justify-between rounded-3xl'>
                      <IoIosSearch className="text-white text-2xl cursor-pointer" />
                      <input
                      className="bg-black w-[100%] outline-none ml-3 text-white"
                      type="text"
                      placeholder="Tìm kiếm theo email"
                      />
                  </div>
                </div>
                

                <div className='flex flex-col'>
                    <label className="mb-2">Loại người dùng</label>
                    <select className='bg-black text-white p-2.5 rounded-3xl border-none w-[200px] outline-none cursor-pointer'>
                        <option>Tất cả người dùng</option>
                        <option>Người nghe</option>
                        <option>Nghệ sĩ</option>
                    </select>
                </div>
                <div className='flex flex-col'>
                    <label className="mb-2">Trạng thái</label>
                    <select className='bg-black text-white p-2.5 rounded-3xl border-none w-[170px] outline-none cursor-pointer'>
                        <option>Tất cả </option>
                        <option>Hoạt động</option>
                        <option>Bị khóa</option>
                        <option>Chờ duyệt</option>
                    </select>
                </div>


                <div className='flex flex-col'>
                  <label className='mb-1'>&nbsp;</label>
                  <button type="primary" className='rounded-3xl bg-[#E0066F] h-[42px] w-[100px] hover:!bg-[#E0066F]'>
                    Tìm kiếm
                  </button>
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
            <p className='mt-7 '>Tổng có : 100 tài khoản.</p>
        <div className="grid grid-cols-5 sm:grid-cols-[2.5fr_2.5fr_2fr_2fr_1.5fr_1fr] mt-7 p-4 text-[#fff]">
          <p className='text-[#E0066F]'>
            Mã tài khoản
          </p>
          <p className='text-[#E0066F]'>Gmail</p>
          <p className="hidden sm:block text-[#E0066F]">Mật khẩu</p>
          <p className='text-[#E0066F]'> Ngày tạo</p>
          <p className='text-[#E0066F]'>Quyền</p>
          <p className='text-[#E0066F]'>Trạng thái</p>
        </div>

        <hr />

        {songsData.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-5 sm:grid-cols-[2.5fr_2.5fr_2fr_2fr_1.5fr_1fr] text-[#fff] items-center p-4 hover:bg-[#E0066F] cursor-pointer"
          >
            <Link to='/song/1' className="text-white">
              {item.name}
            </Link>
            <Link to="/song/:id" className="text-[15px]">{albumsData.name}</Link>
            <p className="text-[15px] hidden sm:block">2 ngày trước</p>
            <p className="text-[15px]">1.000.950</p>
            <p className="text-[15px]">{item.duration}</p>
            <p className="text-[15px] flex justify-center"><IoIosMore /></p> 
          </div>
        
      ))}
      </div>
    </div>
  )
}

export default ManagerAccount