import React, { useState, startTransition, useEffect } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { assets } from "../../assets/assets";
import { FaBullseye } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
const menuItems = [
  {label: 'Xem thong tin', icon: <FaBullseye size={20} />, route: '/UserInfo', id: 'userInfo' },
  {label: 'Goi premium da dang ky', icon: <FaBullseye size={20} />, route: '/UserInfo/premium', id: 'userPremium' }
]

const SideBarUserInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);

  // Hàm xử lý khi click vào MenuItem
  const handleMenuItemClick = (id, route) => {
    setActiveItem(id);
    navigate(route);
  };
  useEffect(() => {
    const currentItem = menuItems.find(item => item.route === location.pathname);
    if (currentItem) {
      setActiveItem(currentItem.id);
    }
  }, [location.pathname]);

  return (
    <Sidebar
      width="20%"
      backgroundColor="#121212"
      style={{ border: "none" }}
      margin="10px"
      className="w-[24%] h-auto m-2 rounded p-2 flex-col gap-2 text-white hidden lg:flex !bg-[#121212] !sticky"
    >
      <img
        className="w-[100px] object-contain ml-[90px]"
        src={assets.mck}
        alt="Logo"
        onClick={() => {
          startTransition(() => {
            navigate("/");
          });
        }}
      />

      <Menu
        className="flex w-full flex-col self-stretch mt-5"
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

export default SideBarUserInfo;
