import React, { Suspense, useState, useEffect, useRef, startTransition } from "react";
import Sidebar from "../../../components/Sidebar";
import Player from "../../../components/Player";
import { Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { albumsData, artistData } from '../../../assets/assets';
import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import Poster from "../../../components/Poster";

const Home = () => {
  const displayColor = useRef(null);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const isAlbum = /\/albums(\/|$)/.test(location.pathname);
  const isArtist = /\/artist(\/|$)/.test(location.pathname);

  const id = isAlbum || isArtist ? location.pathname.split("/").pop() : "";

  const bgColor = isAlbum
    ? albumsData[Number(id)]?.bgColor
    : isArtist
    ? artistData[Number(id)]?.bgColor
    : "#121212";

  useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(() => {
        setIsLoading(false);
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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

  if (isLoading) {
    return (
      <div className="h-screen bg-black text-white flex justify-center items-center">
        <p>Loading, please wait...</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="h-screen bg-black text-white flex justify-center items-center">Loading...</div>}>
      <div className="h-screen bg-black">
        <div className="h-[92%] flex">
          <Sidebar />
          <div ref={displayColor} className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lh:w-[75%] lg:ml-0">
            <NavBar />
            <Outlet />
            <Footer />
          </div>
        </div>
        {/* <Player /> */}
        <Poster/>
      </div>
    </Suspense>
  );
};

export default Home;
