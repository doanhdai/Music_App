import React from 'react';
import { FaRegBell } from 'react-icons/fa6';
import { FaAngleDown } from "react-icons/fa6";


const HeaderAdmin = () => {

    return (
        <header className='flex justify-between items-center gap-5 h-8 sticky top-0 bg-[#121212] z-10 px-6'>
            <p className='text-[25px] font-bold text-pink-500 sm:text-[20px]'>Quản lí tài khoản</p>
            <div className='flex items-center gap-5'>
                <FaRegBell size={25} />
                <div className='flex items-center'>     
                    <p className='font-bold'>Admin</p>
                    <FaAngleDown className='mt-1' size={20}/>    
                </div>
            </div>
        </header>
    );
}

export default HeaderAdmin;
