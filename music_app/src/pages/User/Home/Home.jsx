import React, { Suspense, useState, useEffect, useRef, startTransition, useContext } from "react";
import Sidebar from "../../../components/Sidebar";
import Player from "../../../components/Player";
import { Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { albumsData, artistData } from '../../../assets/assets';
import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import Poster from "../../../components/Poster";
import { PlayerContext } from "../../../context/PlayerContext";

const Home = () => {
  const {audioRef, track} = useContext(PlayerContext)
  const displayColor = useRef(null);
  const location = useLocation();
  const isAlbum = /\/albums(\/|$)/.test(location.pathname);
  const isArtist = /\/artist(\/|$)/.test(location.pathname);

  const id = isAlbum || isArtist ? location.pathname.split("/").pop() : "";

  const bgColor = isAlbum
    ? albumsData[Number(id)]?.bgColor
    : isArtist
    ? artistData[Number(id)]?.bgColor
    : "#121212";

  useEffect(() => {
    if (displayColor.current) {
      displayColor.current.scrollTop = 0;
    }
  }, [location.pathname]);
  // useEffect(() => {
  //   startTransition(() => {
  //     if (displayColor.current) {
  //       if (isAlbum) {
  //         displayColor.current.style.background = `linear-gradient(${bgColor}, #121212)`;
  //       } else {
  //         displayColor.current.style.background = `#121212`;
  //       }
  //     }
  //   });
  // }, [bgColor]);

  return (
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
        <Sidebar />
        <div
          ref={displayColor}
          className="w-full rounded bg-gradient-to-b from-[#311523] to-[#121212] text-white overflow-auto lh:w-[75%] lg:ml-0"
        >
          <NavBar />
          <Suspense
            fallback={
              <div className="h-screen bg-black text-white flex justify-center items-center">
                Loading...
              </div>
            }
          >
            <div className="px-7 pt-4">
              <Outlet />
              <Footer />
            </div>
          </Suspense>
        </div>
      </div>
      <Player />
      <audio ref={audioRef} src={track.file} preload="auto"></audio>
    </div>
  );
};
export default Home;
