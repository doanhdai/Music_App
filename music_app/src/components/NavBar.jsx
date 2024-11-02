import React, { startTransition, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { albumsData, artistData, assets, songsData } from "../assets/assets";
import { FaRegBell } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { RiAccountCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import config from "../config";

const NavBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const removeVietnameseTones = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  const handleSearch = (term) => {
    const trimmedTerm = term.trim();
    if (!trimmedTerm) {
      navigate("/search", { state: { searchTerm: "" } });
      return;
    }

    const searchTermNoAccent = removeVietnameseTones(trimmedTerm.toLowerCase());
    const artistResults = artistData.filter((artist) =>
      removeVietnameseTones(artist.name.toLowerCase()).includes(searchTermNoAccent)
    );
    const albumResults = albumsData.filter((album) =>
      removeVietnameseTones(album.name.toLowerCase()).includes(searchTermNoAccent)
    );
    const songResults = songsData.filter((song) =>
      removeVietnameseTones(song.name.toLowerCase()).includes(searchTermNoAccent)
    );

    navigate("/search", {
      state: { artistResults, albumResults, songResults, searchTerm: trimmedTerm },
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
                {console.log(term)}
              }}
              className="bg-black w-[100%] outline-none ml-3"
              type="text"
              placeholder="Tìm kiếm bài hát, album, nghệ sĩ..."
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <p className="bg-[#E0066F] text-white text-[15px] px-4 py-2 rounded-3xl hidden md:block cursor-pointer">Khám phá Primeum</p>
          <div className="relative inline-block">
            <FaRegBell size={25} />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-700 rounded-full"></span>
          </div>
          <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
          >
            <p className="bg-purple-500 text-black w-10 h-10 rounded-full flex items-center justify-center">
              <img className="h-10 rounded-full" src={assets.mck} />
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
                      startTransition(() => {
                        // Thực hiện điều hướng khi đăng xuất nếu có thêm logic
                        navigate(config.routes.logout); // Thay 'config.routes.logout' bằng route phù hợp nếu cần
                      });
                    }}
                  >
                    <div className="mr-3"><CiLogin size={20} /></div>
                    Đăng xuất
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
