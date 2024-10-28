import { Button } from 'antd'
import React from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { IoIosMore, IoIosSearch } from 'react-icons/io'
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { albumsData, assets, songsData } from '../../assets/assets';
import { Link } from 'react-router-dom';


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
                    <lable className="mb-2">Loại người dùng</lable>
                    <select className='bg-black text-white p-2.5 rounded-3xl border-none w-[200px] outline-none cursor-pointer'>
                        <option>Tất cả người dùng</option>
                        <option>aaa</option>
                        <option>bbb</option>
                        <option>ccc</option>
                    </select>
                </div>
                <div className='flex flex-col'>
                    <lable className="mb-2">Trạng thái</lable>
                    <select className='bg-black text-white p-2.5 rounded-3xl border-none w-[170px] outline-none cursor-pointer'>
                        <option>Tất cả </option>
                        <option>aaa</option>
                        <option>bbb</option>
                        <option>ccc</option>
                    </select>
                </div>


                <div className='flex flex-col'>
                  <label className='mb-1'>&nbsp;</label> {/* Dùng label rỗng để giữ chiều cao tương tự */}
                  <Button type="primary" className='rounded-3xl bg-[#E0066F] h-[42px] w-[100px] hover:!bg-[#E0066F] !z-0'>
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
                    <CiCirclePlus size={30} />
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