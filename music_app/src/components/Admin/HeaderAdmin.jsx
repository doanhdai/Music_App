import React, { useState, useContext } from 'react';
import { FaRegBell } from 'react-icons/fa6';
import { RiAccountCircleLine } from 'react-icons/ri';
import { CiLogin } from 'react-icons/ci';
import { useNavigate, useLocation } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { GiLetterBomb } from "react-icons/gi";
import { AdminContext } from '../../context/AdminContext';
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
    const { thongbaoList, account } = useContext(AdminContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpenn, setIsOpenn] = useState(false);

    const title = pageTitles[location.pathname]
    const [isOpenNotification, setIsOpenNotification] = useState(false);
    let thongbaotheoAcc = thongbaoList.filter((item) => item.ma_tk === account.ma_tk);
    const ItemNotification = () => {

        if (thongbaotheoAcc.length == 0) {
            return <div className="w-full h-[40vh] flex-col flex items-center justify-center">
                <img className="w-[50%] h-auto text-white mb-2" src="https://cdni.iconscout.com/illustration/premium/thumb/empty-notification-illustration-download-in-svg-png-gif-file-formats--new-logo-call-notifications-no-pack-user-interface-illustrations-8944796.png?f=webp" />
                <span>Chưa có thông báo</span>
            </div>
        } else
            return <>
                {
                    thongbaoList
                        .filter(item => account.ma_tk === item.ma_tk)
                        .map(item => (
                            <li
                                key={item.ma_tb} // Đảm bảo mỗi phần tử có key duy nhất
                                className="flex gap-2 border-b pb-1 border-[#A4A298] items-center mb-1"
                                onClick={() => { }}
                            >
                                <GiLetterBomb className="w-[45px] h-[45px] bg-transparent text-[#EB2272]" />
                                <span className="w-full">
                                    <p className="font-bold">{item.ten_tb}</p>
                                    <div className="font-normal text-sm my-1">{item.noi_dung_tb}</div>
                                    <div className="font-normal text-xs text-[#A4A298] mt-2">
                                        {item.ngay_thong_bao}
                                    </div>
                                </span>
                            </li>
                        ))
                }

            </>
    }
    return (
        <header className='flex justify-between items-center gap-5 h-8 sticky top-0 bg-[#121212] z-10 px-6'>

            <p className='text-[25px] font-bold text-pink-500 sm:text-[20px]'>{title}</p>
            <div className='flex items-center gap-5'>
                <div className='flex gap-5'>
                    <div className="relative" onMouseEnter={() => setIsOpenNotification(true)} onMouseLeave={() => setIsOpenNotification(false)}>
                        <div>
                            <FaRegBell size={25} />
                            {thongbaotheoAcc.length != 0 && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-700 rounded-full"></span>}

                        </div>

                        {
                            isOpenNotification && (
                                <>
                                    <div
                                        className="absolute top-10 right-0 bg-gray-800 shadow-lg rounded-lg py-2 px-3 w-[25vw] h-[40vh] overflow-y-auto"
                                    >
                                        <ul className="text-white">
                                            <ItemNotification />

                                        </ul>
                                    </div>
                                    <div className="absolute right-0 w-[150%] h-[20px]"></div>
                                </>

                            )
                        }
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
                                <li className="hover:bg-black p-2 rounded-md cursor-pointer flex items-center" onClick={() => {
                                    localStorage.removeItem("account");
                                    localStorage.removeItem("isLoggedIn");
                                    window.location.href = "/";
                                }}>
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
