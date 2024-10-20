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
import { RiAlbumLine } from "react-icons/ri";
import { MdOutlineQueueMusic } from "react-icons/md";
import ArtistSlidebar from './ArtistSlidebar';

const ArtistSlidebar2 = () => {
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
          style={{ gap: "0", ...(activeItem === 'songs' && { color: "#E0066F", backgroundColor: "#000000", borderColor: "#E0066F", fontWeight: 700 }) }} 
          icon={<RiAlbumLine size={20} />} 
          onClick={() => {
            handleMenuItemClick('song');
            navigate("/artist-site");
          }}
        >
          Bai hat
        </MenuItem>
        <MenuItem 
          style={{ gap: "0", ...(activeItem === 'songs' && { color: "#E0066F", backgroundColor: "#000000", borderColor: "#E0066F", fontWeight: 700 }) }} 
          icon={<MdOutlineQueueMusic   size={20} />} 
          onClick={() => {
            handleMenuItemClick('album');
            navigate("/artist-site/album");
          }}
        >
          Album
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default ArtistSlidebar2;
