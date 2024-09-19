import React from 'react'
import { assets } from '../assets/assets'

const NavBar = () => {
  return (
    <>
        <div className='w-full flex justify-between items-center font-semibold'>
            <div className='flex items-center gap-2'>
                <img className='w-8 h-8 bg-black p-2 rounded-full cursor-pointer' src={assets.arrow_left} alt="Arrow left" />
                <img className='w-8 h-8 bg-black p-2 rounded-full cursor-pointer' src={assets.arrow_right} alt="Arrow right" />


            </div>
            <div className='flex items-center gap-4'>
                <p className='bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer '>Primeum</p>
                <p className='bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer'>Install App</p>
                <p className='bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center '>Đ</p>
            </div>
        </div>

    </>
  )
}

export default NavBar