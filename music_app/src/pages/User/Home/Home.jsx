import React from "react";
import Sidebar from "../../../components/Sidebar";
import DisplayHome from "../../../components/DisplayHome";

import Player from "../../../components/Player";
import { Outlet } from "react-router-dom";
import { useEffect, useRef } from 'react'

import { useLocation } from 'react-router-dom'

import { albumsData } from '../../../assets/assets'
import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";

const Home = () => {
  const displayColor = useRef()
  const location = useLocation()
  // const isAlbum = location.pathname.includes("album")
  const isAlbum = /\/album(\/|$)/.test(location.pathname);
  const albumId = isAlbum ? location.pathname.slice(-1) : ""
  const bgColor = albumsData[Number(albumId)].bgColor
  console.log(albumId)

  useEffect(()=>{
    if(isAlbum)
      displayColor.current.style.background = `linear-gradient(${bgColor}, #121212)`
    else
      displayColor.current.style.background = `#121212`
  })



  return (
    <div>
      <div className="h-screen bg-black">
        <div className="h-[90%] flex">
          <Sidebar />
            <div ref={displayColor} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lh:w-[75%] lg:ml-0'>
                <NavBar/>
                 
                <Outlet/>
                <Footer />
            </div>
      

        </div>
        
        <Player />
      </div>
    </div>
  );
};

export default Home;
