import React, { useEffect, useState } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { assets } from '../../assets/assets';
import { FaChartBar } from "react-icons/fa";
import { TbAlignBoxRightStretch } from "react-icons/tb";
import { RiAdvertisementLine } from "react-icons/ri";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { IoAlbumsOutline } from "react-icons/io5";
import { RiFolderMusicLine } from "react-icons/ri";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { label: 'Quản lý tài khoản', icon: <MdOutlineSupervisorAccount size={20} />, route: '/admin', id: 'account' },
  { label: 'Quản lý bài hát', icon: <RiFolderMusicLine size={20} />, route: '/admin/Manager_song', id: 'songs' },
  { label: 'Quản lý album', icon: <IoAlbumsOutline size={20} />, route: '/admin/Manager_Album', id: 'albums' },
  { label: 'Quản lý chủng loại', icon: <BiCategory size={20} />, route: '/admin/Manager_type', id: 'category' },
  { label: 'Quản lý premium', icon: <MdOutlineWorkspacePremium size={20} />, route: '/admin/Manager_premium', id: 'premium' },
  { label: 'Quản lý quảng cáo', icon: <RiAdvertisementLine size={20} />, route: '/admin/Manager_ads', id: 'ads' },
  { label: 'Phân quyền hệ thống', icon: <TbAlignBoxRightStretch size={20} />, route: '/admin/Manager_quyen', id: 'system' },
  { label: 'Thống kê', icon: <FaChartBar size={20} />, route: '/admin/Manager_statistical', id: 'statistics' },
];

const SideBarAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);

  // Set trạng thái active dựa vào location pathname
  useEffect(() => {
    const currentItem = menuItems.find(item => item.route === location.pathname);
    if (currentItem) {
      setActiveItem(currentItem.id);
    }
  }, [location.pathname]);

  const handleMenuItemClick = (id, route) => {
    setActiveItem(id);
    navigate(route);
  };

  return (
    <Sidebar
      width="20%"
      backgroundColor="#121212"
      style={{ border: 'none' }}
      margin="10px"
      className="w-[24%] h-auto m-2 rounded p-2 flex-col gap-2 text-white hidden lg:flex !bg-[#121212] !sticky"
    >
      <img className="w-[100px] object-contain ml-[90px]" src={assets.mck} alt="Logo" />

      <Menu
        className="flex w-full flex-col self-stretch mt-5"
        menuItemStyles={{
          button: {
            padding: '10px',
            gap: '11px',
            color: '#ffff',
            fontWeight: 450,
            fontSize: '18px',
            borderColor: 'transparent',
            borderLeftWidth: '5px',
            borderStyle: 'solid',
            borderRadius: '0px 15px 15px 0px',
            '&:hover, &.ps-active': {
              color: '#E0066F',
              fontWeight: 700,
              borderColor: '#E0066F',
              backgroundColor: '#000000',
            },
          },
        }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            icon={item.icon}
            onClick={() => handleMenuItemClick(item.id, item.route)}
            style={{
              gap: '0',
              ...(activeItem === item.id && {
                color: '#E0066F',
                backgroundColor: '#000000',
                borderColor: '#E0066F',
                fontWeight: 700,
              }),
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Sidebar>
  );
};

export default SideBarAdmin;
