import React, {
  startTransition,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoIosSearch } from "react-icons/io";
import { assets } from "../assets/assets";
import { FaRegBell } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { GiLetterBomb } from "react-icons/gi";
import { RiAccountCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import config from "../config";
import ComboIcon from "./Admin/ComboIcon/ComboIcon";
import { PlayerContext } from "../context/PlayerContext";


const NavBar = () => {
  // login
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const navigate = useNavigate();
  const { songsData, albumsData, artistsData, thongbaoList } = useContext(PlayerContext);
  const [searchTerm, setSearchTerm] = useState("");
  const account = JSON.parse(localStorage.getItem('account'));
  const thongbaotheoAcc = thongbaoList.filter((item) => item.ma_tk == account.ma_tk);


  const removeVietnamese = (str) => {
    if (typeof str !== "string") {
      return "";
    }
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  // const [color, setColor] = useState(getRandomColor());
  const handleSearch = (term) => {
    const trimmedTerm = term.trim();
    if (!trimmedTerm) {
      navigate("/search", { state: { searchTerm: "" } });
      return;
    }

    const searchTermNoAccent = removeVietnamese(trimmedTerm.toLowerCase());
    const artistResults = (artistsData || []).filter((artist) =>
      removeVietnamese(artist.ten_nghe_si)
        .toLowerCase()
        .includes(searchTermNoAccent)
    );
    const albumResults = (albumsData || []).filter((album) =>
      removeVietnamese(album.ten_album)
        .toLowerCase()
        .includes(searchTermNoAccent)
    );
    const songResults = (songsData || []).filter((song) =>
      removeVietnamese(song.ten_bai_hat)
        .toLowerCase()
        .includes(searchTermNoAccent)
    );

    navigate("/search", {
      state: {
        artistResults,
        albumResults,
        songResults,
        searchTerm: trimmedTerm,
      },
    });
  };

  const ItemNotification = () => {

    if (thongbaotheoAcc.length == 0) {
      return <div className="w-full h-[40vh] flex-col flex items-center justify-center">
        <img className="w-[50%] h-auto text-white mb-2" src="https://cdni.iconscout.com/illustration/premium/thumb/empty-notification-illustration-download-in-svg-png-gif-file-formats--new-logo-call-notifications-no-pack-user-interface-illustrations-8944796.png?f=webp" />
        <span>Chưa có thông báo</span>
      </div>
    } else
      return <>
        {
          thongbaoList.map((item) => account.ma_tk == item.ma_tk && (
            <li className="flex gap-2 border-b pb-1 border-[#A4A298] items-center mb-1">
              <GiLetterBomb className="w-[45px] h-[45px] bg-transparent text-[#EB2272]" />
              <span className=" w-full">
                <p className="font-bold">{item.ten_tb}</p>
                <div className="font-normal text-sm my-1">{item.noi_dung_tb}</div>
                <div className="font-normal text-xs text-[#A4A298] mt-2">{item.ngay_thong_bao}</div>
              </span>
            </li>
          ))
        }

      </>
  }

  return (
    <div className="sticky top-0 z-50 px-7 py-4 backdrop-blur-md bg-opacity-1">
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <img
            onClick={() => navigate(-1)}
            className="w-8 h-8 bg-black p-2 rounded-full cursor-pointer"
            src={assets.arrow_left}
            alt="Arrow left"
          />
          <img
            onClick={() => navigate(1)}
            className="w-8 h-8 bg-black p-2 rounded-full cursor-pointer"
            src={assets.arrow_right}
            alt="Arrow right"
          />
        </div>

        <div className="flex gap-2 items-center justify-center">
          <Link
            to="/"
            className="m-0 no-underline bg-[#E0066F] p-3 rounded-full"
          >
            <img
              className="w-6 hover:scale-110"
              src={assets.home_icon}
              alt="Home icon"
            />
          </Link>
          <div className="flex items-center p-3 w-[500px] bg-black justify-between rounded-3xl">
            <IoIosSearch className="text-white text-2xl cursor-pointer" />
            <input
              value={searchTerm}
              onFocus={() => navigate("/search", { state: { searchTerm } })}
              onChange={(e) => {
                const term = e.target.value;
                setSearchTerm(term);
                handleSearch(term);
              }}
              className="bg-black w-[100%] outline-none ml-3"
              type="text"
              placeholder="Tìm kiếm bài hát, album, nghệ sĩ..."
            />
          </div>
        </div>

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
              <p className="bg-purple-500 text-black w-10 h-10 rounded-full flex items-center justify-center">
                {/* <img className="h-10 rounded-full" src={account.avatar} /> */}
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
      </div>
    </div>
  );
};

export default NavBar;