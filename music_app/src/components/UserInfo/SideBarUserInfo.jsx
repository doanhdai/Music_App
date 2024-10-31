import React, { useState, startTransition } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { assets } from "../../assets/assets";
import { FaBullseye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SideBarUserInfo = () => {
  // State để lưu trữ menuItem đang được active
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();

  // Hàm xử lý khi click vào MenuItem
  const handleMenuItemClick = (item) => {
    setActiveItem(item); // Cập nhật trạng thái activeItem
  };

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
        <MenuItem
          style={{
            gap: "0",
            ...(activeItem === "userInfo" && {
              color: "#E0066F",
              backgroundColor: "#000000",
              borderColor: "#E0066F",
              fontWeight: 700,
            }),
          }}
          icon={<FaBullseye size={35} />}
          onClick={() => {
            handleMenuItemClick("userInfo");
            navigate("/UserInfo");
          }}
        >
          Xem thong tin
        </MenuItem>

        <MenuItem
          style={{
            gap: "0",
            ...(activeItem === "premium" && {
              color: "#E0066F",
              backgroundColor: "#000000",
              borderColor: "#E0066F",
              fontWeight: 700,
            }),
          }}
          icon={<FaBullseye size={35} />}
          onClick={() => {
            handleMenuItemClick("premium");
            navigate("/UserInfo/premium");
          }}
        >
          Goi premium da dang ky
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SideBarUserInfo;
