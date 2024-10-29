import React, { useState, startTransition } from "react";
import { FaRegBell } from "react-icons/fa6";
import { assets } from "../../assets/assets";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { RiAccountCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const HeaderUserInfo = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="w-full flex justify-between items-center font-semibold">
      <p className="text-[25px] font-bold text-pink-500 sm:text-[20px]">
        Quản lí tài khoản
      </p>
      <div className="flex items-center gap-4">
        {/* Chưa đăng nhập, đăng kí */}
        {/* <p
            className="text-gray-400 text-[15px] px-5 p-3 rounded-3xl hidden md:block cursor-pointer hover:text-white hover:scale-110"
            onClick={() => {
              startTransition(() => {
                navigate("/authentication/sign-in");
              });
            }}
          >
            Đăng kí
          </p>
          <p
            className="text-white text-[15px] px-5 p-3 rounded-3xl hidden md:block cursor-pointer hover:scale-105"
            style={{
              background:
                "linear-gradient(153deg, rgba(185, 90, 120, 1) 34%, rgba(224, 6, 111, 1) 99%)",
            }}
            onClick={() => {
              startTransition(() => {
                navigate("/authentication/log-in");
              });
            }}
          >
            Đăng nhập
          </p> */}
        {/* hết chưa đăng nhập,đăng kí */}

        {/* đã đăng nhập */}
        <p className="bg-[#E0066F] text-while text-[15px] px-4 py-2 rounded-3xl hidden md:block cursor-pointer ">
          Khám phá Primeum
        </p>
        <div className="cursor-pointer">
          <FaRegBell size={25} />
        </div>
        <div className="relative" onMouseEnter={() => setIsOpen(true)}>
          <p className="bg-purple-500 text-black w-10 h-10 rounded-full flex items-center justify-center">
            <img className="h-10 rounded-full" src={assets.mck} />
          </p>

          {/* Cửa sổ thông tin người dùng */}
          {isOpen && (
            <div
              onMouseLeave={() => setIsOpen(false)}
              className="absolute top-12 right-0 bg-gray-800 shadow-lg rounded-lg py-2 px-3 w-48"
            >
              <ul className="text-white">
                <li className="hover:bg-black p-2 rounded-md cursor-pointer flex items-center ">
                  <div
                    onClick={() => navigate("/artist-site")}
                    className="mr-3"
                  >
                    <IoSettingsOutline size={20} />
                  </div>
                  {/* chua lien ket duoc */}
                  Quản lý
                </li>
                <li
                  className="hover:bg-black p-2 rounded-md cursor-pointer flex items-center"
                  onClick={() => {
                    startTransition(() => {
                      navigate("/UserInfo");
                    });
                  }}
                >
                  <div className="mr-3">
                    <RiAccountCircleLine size={20} />
                  </div>
                  Tài khoản
                </li>
                <li className="hover:bg-black p-2 rounded-md cursor-pointer flex items-center">
                  <div className="mr-3">
                    <CiLogin size={20} />
                  </div>
                  Đăng xuất
                </li>
              </ul>
            </div>
          )}
        </div>
        {/* hết đã đăng nhâp */}
      </div>
    </header>
  );
};

export default HeaderUserInfo;
