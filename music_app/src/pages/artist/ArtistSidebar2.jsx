import React, { useState } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { assets } from '../../assets/assets';
import { useNavigate} from 'react-router-dom';
import { RiAlbumLine } from "react-icons/ri";
import { MdOutlineQueueMusic } from "react-icons/md";


const ArtistSidebar2 = () => {
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
      backgroundColor='none'
      style={{ border: 'none' }} 
      className='mr-2 mb-2 sticky'
    >
      <div className='p-4 rounded flex flex-col justify-around pl-8'>
            <a onClick={()=> navigate('/')} className='m-0 p-0 no-underline'><img src={assets.home_icon} className='w-[20%] '/></a>
      </div>
    <Sidebar 
      width='100%' 
      backgroundColor='#121212'
      style={{ border: 'none' }} 
       
      className='h-[100%] m-2 rounded p-2 flex-col gap-2 text-white hidden lg:flex !bg-[#121212] '>
      
      
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
        <MenuItem 
          style={{ gap: "0", ...(activeItem === 'songs' && { color: "#E0066F", backgroundColor: "#000000", borderColor: "#E0066F", fontWeight: 700 }) }} 
          icon={<MdOutlineQueueMusic   size={20} />} 
          onClick={() => {
            handleMenuItemClick('widthdrawal');
            navigate("/artist-site/widthdrawal");
          }}
        >
          Rut tien
        </MenuItem>
        <MenuItem 
          style={{ gap: "0", ...(activeItem === 'songs' && { color: "#E0066F", backgroundColor: "#000000", borderColor: "#E0066F", fontWeight: 700 }) }} 
          icon={<MdOutlineQueueMusic   size={20} />} 
          onClick={() => {
            handleMenuItemClick('statistic');
            navigate("/artist-site/statistic");
          }}
        >
          Thong ke
        </MenuItem>
      </Menu>
    </Sidebar>
    </Sidebar>       
  );
};

export default ArtistSidebar2;
