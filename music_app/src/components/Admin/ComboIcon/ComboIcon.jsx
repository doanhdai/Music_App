import React, { startTransition, useState } from "react";
import config from "../../../config";
import { FaRegBell } from "react-icons/fa";
import { assets } from "../../../assets/assets";
import { IoSettingsOutline } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { CiLogin } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
const ComboIcon = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <p
        onClick={() => navigate(config.routes.PremiumSection)}
        className="bg-[#E0066F] text-white text-[15px] px-4 py-2 rounded-3xl hidden md:block cursor-pointer"
      >
        Khám phá Primeum
      </p>
      <div className="relative inline-block">
        <FaRegBell size={25} />
        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-700 rounded-full"></span>
      </div>
      <div className="relative" onMouseEnter={() => setIsOpen(true)}>
        <p className="bg-purple-500 text-black w-10 h-10 rounded-full flex items-center justify-center">
          <img className="h-10 rounded-full" src={assets.mck} />
        </p>
        {isOpen && (
          <div
            onMouseLeave={() => setIsOpen(false)}
            className="absolute top-12 right-0 bg-gray-800 shadow-lg rounded-lg py-2 px-3 w-48"
          >
            <ul className="text-white">
              <li
                className="hover:bg-black p-2 rounded-md cursor-pointer flex items-center"
                onClick={() => {
                  startTransition(() => {
                    navigate(config.routes.artistSite);
                  });
                }}
              >
                <div className="mr-3">
                  <IoSettingsOutline size={20} />
                </div>
                Quản lý
              </li>
              <li
                className="hover:bg-black p-2 rounded-md cursor-pointer flex items-center"
                onClick={() => {
                  startTransition(() => {
                    navigate(config.routes.UserInfo);
                  });
                }}
              >
                <div className="mr-3">
                  <RiAccountCircleLine size={20} />
                </div>
                Tài khoản
              </li>
              <li
                className="hover:bg-black p-2 rounded-md cursor-pointer flex items-center"
                onClick={() => {
                  startTransition(() => {
                    navigate(config.routes.logout);
                  });
                }}
              >
                <div className="mr-3">
                  <CiLogin size={20} />
                </div>
                Đăng xuất
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default ComboIcon;
