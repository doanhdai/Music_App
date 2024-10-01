import React, { useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {
    const navigate = useNavigate()



    return (
        <div >
            <div className='w-full flex justify-between items-center font-semibold '>
                <div className='flex items-center gap-2'>
                    <img onClick={() => navigate(-1)} className='w-8 h-8 bg-black p-2 rounded-full cursor-pointer' src={assets.arrow_left} alt="Arrow left" />
                    <img onClick={() => navigate(1)} className='w-8 h-8 bg-black p-2 rounded-full cursor-pointer' src={assets.arrow_right} alt="Arrow right" />


                </div>
                <div className='flex gap-2 items-center'> 
                    <Link to='/' className='m-0  no-underline bg-black p-3 rounded-full '>
                        <img className='w-6 hover:scale-110' src={assets.home_icon} alt="Home icon" />
                    </Link>
                    <div className='flex items-center p-3 w-[500px] bg-black justify-between rounded-3xl'>
                        <IoIosSearch className='text-white text-2xl cursor-pointer' />
                        <input className='bg-black w-[100%] outline-none ml-3' type="text" placeholder="Tìm kiếm bài hát, album,..." />

                    </div>
                </div>

                <div className='flex items-center gap-4'>
                    {/* <Link to='/premium' className='no-underline text-white text-[15px] px-5 p-2 rounded-3xl hidden md:block cursor-pointer hover:scale-105' 
                        style={{
                            background: 'linear-gradient(153deg, rgba(185, 90, 120, 1) 34%, rgba(224, 6, 111, 1) 99%)'
                    }}>Khám phá Premium</Link> */}
                    <p className='text-gray-400 text-[15px] px-5 p-3 rounded-3xl hidden md:block cursor-pointer hover:text-white hover:scale-110'>Đăng kí</p>
                    <p className='text-white text-[15px] px-5 p-3 rounded-3xl hidden md:block cursor-pointer hover:scale-105' 
                        style={{
                            background: 'linear-gradient(153deg, rgba(185, 90, 120, 1) 34%, rgba(224, 6, 111, 1) 99%)'
                    }}>Đăng nhập</p>
                    {/* <p className='cursor-pointer text-xl'><abbr title="Thông báo mới" className='text-white font-bold hover:text-yellow-400'><i class="fa-solid fa-bell"></i></abbr></p> */}
                    {/* <p className='bg-purple-500 text-black w-9 h-9 rounded-full flex items-center justify-center cursor-pointer'>Đ</p> */}
                </div>
            </div>
            {/* <div className='flex items-center gap-2 mt-4'>
                <p className='bg-white text-black px-4 py-0 rounded-2xl cursor-pointer' onClick={() => navigate(`/`)}>Tất cả</p>
                <p className='bg-black  px-4 py-0 rounded-2xl cursor-pointer' onClick={() => navigate(`/songs`)}>Bài hát</p>
                <p className='bg-black  px-4 py-0 rounded-2xl cursor-pointer' onClick={() => navigate(`/albums`)}>Album</p>
                <p className='bg-black  px-4 py-0 rounded-2xl cursor-pointer' onClick={() => navigate(`/songs`)}>Poscast</p>


            </div> */}
        </div>
    )
}

export default NavBar