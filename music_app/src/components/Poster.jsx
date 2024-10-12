import React from 'react'
import { assets, songsData } from '../assets/assets'
import { Button } from 'antd'

const Poster = () => {
  return (
    <div className='h[8%] bg-white flex justify-between items-center text-black px-4 py-1'>
       <div>
        <p className='font-bold text-lg'>Bạn muốn đắm chìm vào âm nhạc của Gnine ?</p>
        <h5>Đăng kí để xem toàn bộ bài hát và danh sách phát không giới hạn.</h5>
       </div>
    <Button className='w-[220px] py-5 rounded-full text-white font-bold' style={{
        background: 'linear-gradient(153deg, rgba(185, 90, 120, 1) 34%, rgba(224, 6, 111, 1) 99%)'}}>Đăng kí miễn phí</Button>
    </div>
  )
}

export default Poster