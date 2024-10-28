import React, { startTransition, useState } from 'react';
import { FaRegBell } from 'react-icons/fa6';
import { FaAngleDown } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { RiAccountCircleLine } from 'react-icons/ri';
import { CiLogin } from 'react-icons/ci';


const HeaderAdmin = () => {
    const navigate = useNavigate();
    const [isOpenn, setIsOpenn] = useState(false)


    return (
        <header className='flex justify-between items-center gap-5 h-8 sticky top-0 bg-[#121212] z-10 px-6'>
            <p className='text-[25px] font-bold text-pink-500 sm:text-[20px]'>Quản lí tài khoản</p>
            <div className='flex items-center gap-5'>
            <div className='flex float-end gap-5'>
                <FaRegBell size={25} />
                
                <div className='flex'>     
                    <p className='font-bold'>Admin</p>
                    {/* <FaAngleDown className='mt-1' size={20}/>     */}
                </div>

            </div>
            <div className="relative"
              onMouseEnter={() => setIsOpenn(true)}>
                <p className="bg-purple-500 text-black w-10 h-10 rounded-full flex items-center justify-center">
                  <img className="h-10 rounded-full" src={assets.mck}/>
              </p>
            {isOpenn && (
                <div onMouseLeave={() => setIsOpenn(false)} className="absolute top-12 right-0 bg-gray-800 shadow-lg rounded-lg py-2 px-3 w-48">
                  <ul className="text-white">
                    
                    <li className="hover:bg-black p-2 rounded-md cursor-pointer flex items-center" onClick={() => navigate("/admin/account_admin")}>
                      <div className="mr-3"><RiAccountCircleLine size={20} /></div>
                      Tài khoản
                    </li>
                    <li className="hover:bg-black p-2 rounded-md cursor-pointer flex items-center">
                      <div className="mr-3"><CiLogin size={20}/></div>
                      Đăng xuất
                    </li>
                  </ul>
                </div>
              )}
              </div>
              </div>
        </header>
    );
}

export default HeaderAdmin;
