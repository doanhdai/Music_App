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
          <div className="w-[100%]  rounded  text-white overflow-auto lh:w-[75%] lg:ml-0">
            <div className='my-2 px-6 pt-4 h-[60px] bg-[#121212] sticky top-0 '>
              <HeaderAdmin   />
            </div>
            <div className='my-2 bg-gradient-to-b from-[#311523] to-[#121212] h-full'>
              <Outlet />
            </div>
            
          
          </div>
        </div>


      </div>
    </Suspense>
  );
}

export default Admin