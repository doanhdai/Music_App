import React, { Suspense } from "react";
import Sidebar from "../../../components/Sidebar";
import Player from "../../../components/Player";
import { Outlet } from "react-router-dom";
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { albumsData } from '../../../assets/assets'
import { artistData } from '../../../assets/assets'

import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import { Spin } from "antd";

const Home = () => {
  const displayColor = useRef(null);
  const location = useLocation();
const isAlbum = /\/albums(\/|$)/.test(location.pathname);
const isArtist = /\/artist(\/|$)/.test(location.pathname);

// Lấy albumId hoặc artistId dựa trên điều kiện
const id = isAlbum || isArtist ? location.pathname.split("/").pop() : "";

// Nếu là album, lấy bgColor từ albumsData, nếu là artist thì lấy từ artistsData
// Giả sử bạn có một mảng `artistsData` tương tự như `albumsData`
const bgColor = isAlbum
  ? albumsData[Number(id)]?.bgColor
  : isArtist
  ? artistData[Number(id)]?.bgColor
  : "#121212";

console.log("id", id);
console.log("bgColor", bgColor);

  useEffect(() => {
    if (displayColor.current) {
      if (isAlbum) {
        displayColor.current.style.background = `linear-gradient(${bgColor}, #121212)`;
      } else {
        displayColor.current.style.background = `#121212`;
      }
    }
  }, [bgColor]); 

  return (
    <Suspense  fallback={<Spin size="large" />}>
      <div  className="h-screen bg-black">
        <div className="h-[90%] flex">
          <Sidebar />
          <div ref={displayColor} className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lh:w-[75%] lg:ml-0">
            <NavBar />
            <Outlet />
            <Footer />
          </div>
        </div>
        <Player />
      </div>
    </Suspense>
  );
};

export default Home;
