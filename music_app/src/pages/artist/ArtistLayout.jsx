import { Suspense } from "react";

import { Outlet } from "react-router-dom";
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import ArtistSlidebar from './ArtistSlidebar'
import NavBar from "../../components/NavBar";


const ArtistLayout = () => {

  return (
    <Suspense  >
      <div  className="h-screen bg-black">
        <div className="h-[100%] flex">
          <ArtistSlidebar/>
          <div className="w-[100%] m-0 pt-4 rounded text-white overflow-auto lh:w-[75%] lg:ml-0">
            <NavBar />

            <Outlet />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default ArtistLayout;
