import React from 'react'
import { Button } from 'antd'

import { CiCirclePlus } from "react-icons/ci";
import { IoIosMore, IoIosSearch } from 'react-icons/io'
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { albumsData, assets, songsData } from '../../assets/assets';
import { Link } from 'react-router-dom';
import PurchasedPremiumCard from '../premium/PurchasedPremiumCard';

const ManagerPremium = () => {
  return (
   <div className='pt-3 mx-[38px]'>
        <div className='flex justify-between'>
            <div className='flex items-center space-x-5'>
                {/* Search Box */}
                

                <div className='flex flex-col'>
                  <label className='mb-1'>Tìm kiếm gói premium</label>

                   <div className='flex items-center p-2 w-[300px] bg-black justify-between rounded-3xl'>
                    <IoIosSearch className="text-white text-2xl cursor-pointer" />
                    <input
                    className="bg-black w-[100%] outline-none ml-3 text-white"
                    type="text"
                    placeholder="Tên gói"
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
                  <label className='mb-1'>Thời hạn</label>

                   <div className='flex items-center p-2 w-[200px] bg-black justify-between rounded-3xl'>
                    <input
                    className="bg-black w-[100%] outline-none ml-3 text-white"
                    type="date"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <div className='flex flex-col'>
                  <label className='mb-1'>&nbsp;</label> 
                  <Button type="primary" className='rounded-3xl bg-[#E0066F] h-[35px] w-[100px] hover:!bg-[#E0066F]'>
                    Tìm kiếm
                  </Button>
                </div>
            </div>
            <div className='flex flex-col'>
              <label className='mb-1'>&nbsp;</label>
              <div className='flex space-x-5'>
                <div className='w-[36px] h-[36px] flex items-center justify-center rounded-full bg-black'>
                    <CiCirclePlus size={20} />
                </div>
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
          {/* <p className='mt-7 '>Tổng có : 100 Gói .</p> */}
            <div className="grid grid-cols-4 gap-3 mt-5">
              <PurchasedPremiumCard
                isActive={true}
                title="Ten Premium"
                price="100.000"
                duration="2 tháng"
                descriptions={["không có quảng cáo", "chất lượng âm thanh tốt nhất", "tải xuống miễn phí"]}
              />   
              <PurchasedPremiumCard
                isActive={true}
                title="Ten Premium"
                price="giá_gói"
                duration="thoi_han"
                descriptions={["mo ta", "mo ta", "mo ta"]}
              />
              <PurchasedPremiumCard
                isActive={true}
                title="Ten Premium"
                price="giá_gói"
                duration="thoi_han"
                descriptions={["mo ta", "mo ta", "mo ta"]}
              />
              <PurchasedPremiumCard
                isActive={true}
                title="Ten Premium"
                price="giá_gói"
                duration="thoi_han"
                descriptions={["mo ta", "mo ta", "mo ta"]}
              />
              <PurchasedPremiumCard
                isActive={true}
                title="Ten Premium"
                price="giá_gói"
                duration="thoi_han"
                descriptions={["mo ta", "mo ta", "mo ta"]}
              />
          </div>
      </div>
    </div>
  )
}

export default ManagerPremium