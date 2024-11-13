import React, { useState, startTransition } from "react";
import { FaRegBell } from "react-icons/fa6";
import { assets } from "../../assets/assets";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { RiAccountCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ComboIcon from "../Admin/ComboIcon/ComboIcon";

const HeaderUserInfo = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="w-full flex justify-between items-center font-semibold">
      <p className="text-[25px] font-bold text-pink-500 sm:text-[20px]">
        Quản lí tài khoản
      </p>
      <div className="flex items-center gap-4">
        <ComboIcon />
      </div>
    </header>
  );
};

export default HeaderUserInfo;
