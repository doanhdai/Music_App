import React, { Suspense } from 'react'
import HeaderAdmin from '../../components/Admin/HeaderAdmin';
import { Outlet } from 'react-router-dom';
import SideBarAdmin from '../../components/Admin/SideBarAdmin';

const Admin = () => {
  return (
   
    <Suspense fallback={<div className="h-screen bg-black text-white flex justify-center items-center">Loading...</div>}>
      <div className="h-screen bg-black">
        <div className="h-[100%] flex">
          <SideBarAdmin />
          <div className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lh:w-[75%] lg:ml-0">
            <HeaderAdmin />
            <Outlet />
          
          </div>
        </div>


      </div>
    </Suspense>
  );
}

export default Admin