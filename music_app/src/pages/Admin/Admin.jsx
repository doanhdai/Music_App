import React, { Suspense, useContext } from 'react';
import HeaderAdmin from '../../components/Admin/HeaderAdmin';
import { Outlet } from 'react-router-dom';
import SideBarAdmin from '../../components/Admin/SideBarAdmin';
import AdminContextProvider, { AdminContext } from '../../context/AdminContext';
import CheckAccount from '../CheckAccount';

const AdminContent = () => {
    const { isBgCover } = useContext(AdminContext);
    
    return (
        
        <>
        <CheckAccount ma_quyen="AUTH0001"/>
            <div className={`h-screen w-screen fixed top-0 left-0 bg-[#A4A298] opacity-25 z-20 ${isBgCover ? 'block' : 'hidden'}`}></div>
            <div className="h-screen bg-black">
                <div className="h-[100%] flex">
                    <SideBarAdmin />
                    <div className="w-[100%] rounded text-white overflow-auto lh:w-[75%] lg:ml-0">
                        <div className='my-2 px-6 pt-4 h-[60px] bg-[#121212] sticky top-0'>
                            <HeaderAdmin />
                        </div>
                        <div className='h-[88.5%] my-2 bg-gradient-to-b from-[#311523] to-[#121212]'>
                            <Suspense fallback={<div className="h-screen bg-black text-white flex justify-center items-center">Loading...</div>}>
                                <Outlet />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const Admin = () => (
    <AdminContextProvider>
        <AdminContent />
    </AdminContextProvider>
);

export default Admin;
