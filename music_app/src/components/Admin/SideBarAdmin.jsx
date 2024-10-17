import React from 'react'
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar'
import { assets } from '../../assets/assets'
import { FaRegBell } from 'react-icons/fa6'

const SideBarAdmin = () => {
  return (
    <Sidebar className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex !bg-[#121212] !sticky'>
        <image className='w-[100px] object-contain' src={assets.home_icon}></image>
        <Menu className='flex w-full flex-col self-stretch'
           MenuItemStyles={{button: {
            padding: "10px",
            gap: "11px",
            color: "#a4a298",
            fontWeight: 400,
            fontSize: "18px",
            borderColor: "transparent",
            borderLeftWidth: "5px", 
            borderStyle: "solid",
            borderRadius: "0px 15px 15px 0px",
            "&:hover, &.ps-active": {
              color: "#eb2272",
              fontWeight: 700, 
              borderColor: "#eb2272",
              backgroundColor: "#000000 !important",
            },
          },
        }}
        >
        <MenuItem icon={ <FaRegBell size={15} />} >Quản lý tài khoản</MenuItem>
        <MenuItem icon={ <FaRegBell size={15} />} >Quản lý tài khoản</MenuItem>
        <MenuItem icon={ <FaRegBell size={15} />} >Quản lý tài khoản</MenuItem>
        <MenuItem icon={ <FaRegBell size={15} />} >Quản lý tài khoản</MenuItem>
        <MenuItem icon={ <FaRegBell size={15} />} >Quản lý tài khoản</MenuItem>
        </Menu>
    </Sidebar>
  )
}

export default SideBarAdmin