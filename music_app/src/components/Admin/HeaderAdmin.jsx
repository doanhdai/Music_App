import React, { useState } from 'react';
import { FaRegBell } from 'react-icons/fa6';
import { RiAccountCircleLine } from 'react-icons/ri';
import { CiLogin } from 'react-icons/ci';
import { useNavigate, useLocation } from 'react-router-dom';
import { assets } from '../../assets/assets';

const pageTitles = {
    '/admin': 'Quản lý tài khoản',
    '/admin/Manager_song': 'Quản lý bài hát',
    '/admin/Manager_Album': 'Quản lý album',
    '/admin/Manager_type': 'Quản lý thể loại',
    '/admin/Manager_premium': 'Quản lý premium',
    '/admin/Manager_ads': 'Quản lý quảng cáo',
    '/admin/Manager_ads/contract': 'Quản lý quảng cáo',
    '/admin/Manager_quyen': 'Phân quyền hệ thống',
    '/admin/Manager_statistical': 'Thống kê',
};

const HeaderAdmin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpenn, setIsOpenn] = useState(false);

    const title = pageTitles[location.pathname]

    return (
        <header className='flex justify-between items-center gap-5 h-8 sticky top-0 bg-[#121212] z-10 px-6'>
            <p className='text-[25px] font-bold text-pink-500 sm:text-[20px]'>{title}</p>
            <div className='flex items-center gap-5'>
                <div className='flex gap-5'>
                    <div className="relative inline-block">
                        <FaRegBell size={25} />
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-700 rounded-full"></span>
                    </div>
                    <div className='flex'>
                        <p className='font-bold'>Admin</p>
                    </div>
                </div>
                <div className="relative" onMouseEnter={() => setIsOpenn(true)}>
                    <p className="bg-purple-500 text-black w-10 h-10 rounded-full flex items-center justify-center">
                        <img className="h-10 rounded-full" src={assets.mck} alt="User avatar" />
                    </p>
                    {isOpenn && (
                        <div onMouseLeave={() => setIsOpenn(false)} className="absolute top-12 right-0 bg-gray-800 shadow-lg rounded-lg py-2 px-3 w-48">
                            <ul className="text-white">
                                <li className="hover:bg-black p-2 rounded-md cursor-pointer flex items-center" onClick={() => navigate("/admin/account_admin")}>
                                    <RiAccountCircleLine size={20} className="mr-3" />
                                    Tài khoản
                                </li>
                                <li className="hover:bg-black p-2 rounded-md cursor-pointer flex items-center">
                                    <CiLogin size={20} className="mr-3" />
                                    Đăng xuất
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default HeaderAdmin;
