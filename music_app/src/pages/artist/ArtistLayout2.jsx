import React, { Suspense, useState, useEffect, useRef } from "react";
import ArtistSidebar2 from "./ArtistSidebar2";
import { Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ArtistNavbar from "./components/ArtisNavbar";

const ArtistLayout2 = () => {
  const displayColor = useRef(null);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const isAlbum = /\/albums(\/|$)/.test(location.pathname);
  const isArtist = /\/artist(\/|$)/.test(location.pathname);

  const id = isAlbum || isArtist ? location.pathname.split("/").pop() : "";

  const bgColor = "#121212";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (displayColor.current) {
      if (isAlbum) {
        displayColor.current.style.background = `linear-gradient(${bgColor}, #121212)`;
      } else {
        displayColor.current.style.background = `#121212`;
      }
    }
  }, [bgColor, isAlbum]);

  // Nếu đang loading, hiển thị màn hình loading
  if (isLoading) {
    return (
      <div className="h-screen bg-black text-white flex justify-center items-center">
        <p>Loading, please wait...</p>
      </div>
    );
  }

  // Khi hết loading, hiển thị giao diện chính
  return (
    <div className="h-full bg-black">
      <div className="flex">
        <ArtistSidebar2 />
        <div ref={displayColor} className="w-[100%] m-2 pt-4 rounded text-white overflow-auto lh:w-[75%] lg:ml-0">
          <ArtistNavbar className="mb-10" />
          <Suspense fallback={<div className="h-screen bg-black text-white flex justify-center items-center">Loading...</div>}>
            <Outlet />
          </Suspense>
          <hr />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ArtistLayout2;
