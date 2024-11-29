import React, { startTransition, useState, useContext } from "react";
import config from "../../../config";
import { FaRegBell } from "react-icons/fa";
import { assets } from "../../../assets/assets";
import { IoSettingsOutline } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { CiLogin } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../../../context/PlayerContext";
import { GiLetterBomb } from "react-icons/gi";
const ComboIcon = () => {
  const navigate = useNavigate();
  const { thongbaoList } = useContext(PlayerContext);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  let thongbaotheoAcc = [];
  let account = null;
  if (isLoggedIn) {
    account = JSON.parse(localStorage.getItem('account'));
    if (account) {
      thongbaotheoAcc = thongbaoList.filter((item) => item.ma_tk === account.ma_tk);
    }
  }
  const ItemNotification = () => {

    if (thongbaotheoAcc.length == 0) {
      return <div className="w-full h-[40vh] flex-col flex items-center justify-center">
        <img className="w-[50%] h-auto text-white mb-2" src="https://cdni.iconscout.com/illustration/premium/thumb/empty-notification-illustration-download-in-svg-png-gif-file-formats--new-logo-call-notifications-no-pack-user-interface-illustrations-8944796.png?f=webp" />
        <span>Chưa có thông báo</span>
      </div>
    } else
      return <>
        {
          thongbaoList
            .filter(item => account.ma_tk === item.ma_tk)
            .map(item => (
              <li
                key={item.ma_tb} // Đảm bảo mỗi phần tử có key duy nhất
                className="flex gap-2 border-b pb-1 border-[#A4A298] items-center mb-1"
                onClick={() => { }}
              >
                <GiLetterBomb className="w-[45px] h-[45px] bg-transparent text-[#EB2272]" />
                <span className="w-full">
                  <p className="font-bold">{item.ten_tb}</p>
                  <div className="font-normal text-sm my-1">{item.noi_dung_tb}</div>
                  <div className="font-normal text-xs text-[#A4A298] mt-2">
                    {item.ngay_thong_bao}
                  </div>
                </span>
              </li>
            ))
        }

      </>
  }
  return (
    <>
      {isLoggedIn ? (
        <div className="flex items-center gap-4">
          <p
            onClick={() => navigate(config.routes.PremiumSection)}
            className="bg-[#E0066F] text-white text-[15px] px-4 py-2 rounded-3xl hidden md:block cursor-pointer"
          >
            Khám phá Primeum
          </p>
          <div className="relative" onMouseEnter={() => setIsOpenNotification(true)} onMouseLeave={() => setIsOpenNotification(false)}>
            <div>
              <FaRegBell size={25} />
              {thongbaotheoAcc.length != 0 && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-700 rounded-full"></span>}

            </div>

            {
              isOpenNotification && (
                <>
                  <div
                    className="absolute top-10 right-0 bg-gray-800 shadow-lg rounded-lg py-2 px-3 w-[25vw] h-[40vh] overflow-y-auto"
                  >
                    <ul className="text-white">
                      <ItemNotification />

                    </ul>
                  </div>
                  <div className="absolute right-0 w-[150%] h-[20px]"></div>
                </>

              )
            }
          </div>
          <div className="relative" onMouseEnter={() => setIsOpen(true)}>
          <p className="text-black w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
            <img className="w-full h-full object-cover" src={account.avatar} alt="avatar" />
          </p>
            {isOpen && (
              <div
                onMouseLeave={() => setIsOpen(false)}
                className="absolute top-12 right-0 bg-gray-800 shadow-lg rounded-lg py-2 px-3 w-48"
              >
                <ul className="text-white">
                  {account.ma_quyen == "AUTH0002" && (
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
                  )}
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
                      localStorage.removeItem("account");
                      localStorage.removeItem("isLoggedIn");
                      window.location.href = "/";
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
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <p
            className="text-gray-400 text-[15px] px-5 p-2 rounded-3xl hidden md:block cursor-pointer hover:text-white hover:scale-110"
            onClick={() => {
              startTransition(() => {
                navigate("/authentication/sign-in");
              });
            }}
          >
            Đăng kí
          </p>
          <p
            className="text-white text-[15px] px-5 p-2 rounded-3xl hidden md:block cursor-pointer hover:scale-105"
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
          </p>
        </div>
      )}
    </>
  );
};

export default ComboIcon;