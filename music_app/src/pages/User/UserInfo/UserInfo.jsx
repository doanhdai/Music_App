import React, { Suspense } from "react";
import SideBarUserInfo from "../../../components/UserInfo/SideBarUserInfo";
import HeaderUserInfo from "../../../components/UserInfo/HeaderUserInfo";
import { Outlet } from "react-router-dom";
import "../../../assets/css/auth_style.css";
import "../../../assets/css/base.css";

const UserInfo = () => {
  return (
    <Suspense
      fallback={
        <div className="h-screen bg-black text-white flex justify-center items-center">
          Loading...
        </div>
      }
    >
      <div className="h-screen bg-black">
        <div className="h-[100%] flex">
          <SideBarUserInfo />
          <div className="w-[100%]  rounded  text-white overflow-auto lh:w-[75%] lg:ml-0">
            <div className="my-2 px-6 pt-4 h-[60px] bg-[#121212] sticky top-0 z-30">
              <HeaderUserInfo />
            </div>
            <div className="my-2 bg-[#000000]">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default UserInfo;
