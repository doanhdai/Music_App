import React, { startTransition, useContext, useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { assets, } from "../assets/assets";
import { FaRegBell } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { RiAccountCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import config from "../config";
import ComboIcon from "./Admin/ComboIcon/ComboIcon";
import { PlayerContext } from "../context/PlayerContext";

const NavBar = () => {
  // login
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const [isOpen, setIsOpen] = useState(false);
  
  const navigate = useNavigate();
  const { songsData, albumsData, artistsData } = useContext(PlayerContext);
  const [searchTerm, setSearchTerm] = useState("");
  count = JSON.parse(localStorage.getItem('account'));


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
      navigate("/search", { state: { searchTerm: ""} });
      return;
    }

    const searchTermNoAccent = removeVietnamese(trimmedTerm.toLowerCase());
    const artistResults = (artistsData || []).filter((artist) =>
      removeVietnamese(artist.ten_nghe_si)
        .toLowerCase()
        .includes(searchTermNoAccent)
    );
    const albumResults = (albumsData || []).filter((album) =>
      removeVietnamese(album.ten_album).toLowerCase().includes(searchTermNoAccent)
    );
    const songResults = (songsData || []).filter((song) =>
      removeVietnamese(song.ten_bai_hat).toLowerCase().includes(searchTermNoAccent)
    );

    navigate("/search", {
      state: { artistResults, albumResults, songResults, searchTerm: trimmedTerm},
    });
  };

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
                  <p onClick={()=>navigate(config.routes.PremiumSection)} className="bg-[#E0066F] text-white text-[15px] px-4 py-2 rounded-3xl hidden md:block cursor-pointer">Khám phá Primeum</p>
                  <div className="relative inline-block">
                    <FaRegBell size={25} />
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-700 rounded-full"></span>
                  </div>
                  <div
                    className="relative"
                    onMouseEnter={() => setIsOpen(true)}
                  >
                    <p className="bg-purple-500 text-black w-10 h-10 rounded-full flex items-center justify-center">
                      <img className="h-10 rounded-full" src={account.avatar} />
                    </p>
                    {isOpen && (
                      <div onMouseLeave={() => setIsOpen(false)} className="absolute top-12 right-0 bg-gray-800 shadow-lg rounded-lg py-2 px-3 w-48">
                        <ul className="text-white">
                          <li 
                            className="hover:bg-black p-2 rounded-md cursor-pointer flex items-center"
                            onClick={() => {
                              startTransition(() => {
                                navigate(config.routes.artistSite);
                              });
                            }}
                          >
                            <div className="mr-3"><IoSettingsOutline size={20} /></div>
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
                            <div className="mr-3"><RiAccountCircleLine size={20} /></div>
                            Tài khoản
                          </li>
                          <li 
                            className="hover:bg-black p-2 rounded-md cursor-pointer flex items-center"
                            onClick={() => {
                              localStorage.removeItem('account');
                              localStorage.removeItem('isLoggedIn');
                              window.location.href = '/';
                            }}
                          >
                            <div className="mr-3" ><CiLogin size={20} /></div>
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