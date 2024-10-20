import React, { useState } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { assets } from '../../assets/assets';
import { FaRegBell } from 'react-icons/fa6';
import { FaChartBar } from "react-icons/fa";
import { TbAlignBoxRightStretch } from "react-icons/tb";
import { RiAdvertisementLine } from "react-icons/ri";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { IoAlbumsOutline } from "react-icons/io5";
import { RiFolderMusicLine } from "react-icons/ri";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const SideBarAdmin = () => {
  // State để lưu trữ menuItem đang được active
  const [activeItem, setActiveItem] = useState(null);
  const navigate =useNavigate()

  // Hàm xử lý khi click vào MenuItem
  const handleMenuItemClick = (item) => {
    setActiveItem(item); // Cập nhật trạng thái activeItem
  };

  return (
    <Sidebar 
      width='20%' 
      backgroundColor='#121212'
      style={{ border: 'none' }} 
      margin='10px' 
      className='w-[24%] h-auto m-2 rounded p-2 flex-col gap-2 text-white hidden lg:flex !bg-[#121212] !sticky'>
      
      <img className='w-[100px] object-contain ml-[90px]' src={assets.mck} alt="Logo" />
      
      <Menu className='flex w-full flex-col self-stretch mt-5'
        menuItemStyles={{
          button: {
            padding: "10px",
            gap: "11px",
            color: "#ffff",
            fontWeight: 450,
            fontSize: "18px",
            borderColor: "transparent",
            borderLeftWidth: "5px", 
            borderStyle: "solid",
            borderRadius: "0px 15px 15px 0px",
            "&:hover, &.ps-active": { 
              color: "#E0066F",  
              fontWeight: 700,
              borderColor: "#E0066F", 
              backgroundColor: "#000000",
            },
          },
        }}
      >
        <MenuItem 
          style={{ gap: "0", ...(activeItem === 'account' && { color: "#E0066F", backgroundColor: "#000000", borderColor: "#E0066F",fontWeight: 700 }) }} 
          icon={<MdOutlineSupervisorAccount size={20} />} 
          onClick={() => {
            handleMenuItemClick('account');
            navigate("/admin");
          }}
       
        >
          Quản lý tài khoản
        </MenuItem>
        
        <MenuItem 
          style={{ gap: "0", ...(activeItem === 'songs' && { color: "#E0066F", backgroundColor: "#000000", borderColor: "#E0066F", fontWeight: 700 }) }} 
          icon={<RiFolderMusicLine size={20} />} 
          onClick={() => {
            handleMenuItemClick('songs');
            navigate("/admin/Manager_song");
          }}
        >
          Quản lý bài hát
        </MenuItem>
        
        <MenuItem 
          style={{ gap: "0", ...(activeItem === 'albums' && { color: "#E0066F", backgroundColor: "#000000", borderColor: "#E0066F",fontWeight: 700 }) }} 
          icon={<IoAlbumsOutline size={20} />} 
          onClick={() =>{
            handleMenuItemClick('albums');
            navigate("/admin/Manager_Album");

          }
            
          }
        >
          Quản lý album
        </MenuItem>
        
        <MenuItem 
          style={{ gap: "0", ...(activeItem === 'category' && { color: "#E0066F", backgroundColor: "#000000", borderColor: "#E0066F",fontWeight: 700 }) }} 
          icon={<BiCategory size={20} />} 
          onClick={() => {
            handleMenuItemClick('category');
            navigate("/admin/Manager_type");

          }}
        >
          Quản lý chủng loại
        </MenuItem>
        
        <MenuItem 
          style={{ gap: "0", ...(activeItem === 'premium' && { color: "#E0066F", backgroundColor: "#000000", borderColor: "#E0066F",fontWeight: 700 }) }} 
          icon={<MdOutlineWorkspacePremium size={20} />} 
          onClick={() => {
            handleMenuItemClick('premium');
            navigate("/admin/Manager_premium");

          }}
        >
          Quản lý premium
        </MenuItem>
        
        <MenuItem 
          style={{ gap: "0", ...(activeItem === 'ads' && { color: "#E0066F", backgroundColor: "#000000", borderColor: "#E0066F",fontWeight: 700 }) }} 
          icon={<RiAdvertisementLine size={20} />} 
          onClick={() => handleMenuItemClick('ads')}
        >
          Quản lý quảng cáo
        </MenuItem>
        
        <MenuItem 
          style={{ gap: "0", ...(activeItem === 'system' && { color: "#E0066F", backgroundColor: "#000000", borderColor: "#E0066F",fontWeight: 700 }) }} 
          icon={<TbAlignBoxRightStretch size={20} />} 
          onClick={() => handleMenuItemClick('system')}
        >
          Phân quyền hệ thống
        </MenuItem>
        
        <MenuItem 
          style={{ gap: "0", ...(activeItem === 'statistics' && { color: "#E0066F", backgroundColor: "#000000", borderColor: "#E0066F",fontWeight: 700 }) }} 
          icon={<FaChartBar size={20} />} 
          onClick={() => handleMenuItemClick('statistics')}
        >
          Thống kê
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SideBarAdmin;
