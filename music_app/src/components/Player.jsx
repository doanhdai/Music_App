import React from 'react'
import { assets, songsData } from '../assets/assets'
import { Link } from 'react-router-dom'
import { IoIosPause } from "react-icons/io";
import { FaPlay } from "react-icons/fa6";
const Player = () => {
  return (
    <div className='h[10%] bg-black flex justify-between items-center text-white px-5 py-2 '>
        <div className='hidden lg:flex items-center gap-4'>
            <img className='w-12' src={songsData[0].image} />
            <div className=''>
                <p className=''>{songsData[0].name}</p>
                <p className=''>{songsData[0].desc.slice(0,12)}</p>

            </div>
        </div>
        <div className='absolute buttom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1'>
            <div className='flex gap-4 items-center'>
                <img className='w-4 cursor-pointer' src={assets.shuffle_icon}></img>
                <img className='w-4 cursor-pointer' src={assets.prev_icon}></img>
                {/* <img className='w-4 cursor-pointer' src={assets.play_icon}></img> */}
                {/* <IoIosPause size={25}/> */}
                <FaPlay size={19}/>
                <img className='w-4 cursor-pointer' src={assets.next_icon}></img>
                <img className='w-4 cursor-pointer' src={assets.loop_icon}></img>
            </div>
            <div className='flex items-center gap-5 '>
                <p>1:14</p>
                <div className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
                    <hr className='h-1 border-none w-10 bg-green-800 rounded-full'></hr>
                </div>
                <p>3:20</p>
            </div>
        </div>

        <div className='hidden lg:flex items-center gap-2 opacity-75'>
            {/* <img className='w-3' src={assets.plays_icon}/>
            <img className='w-3' src={assets.mic_icon}/>
            <img className='w-3' src={assets.queue_icon}/>
            <img className='w-3' src={assets.speaker_icon}/> */}
            <img className='w-3' src={assets.volume_icon}/>
            <div className='w-20 bg-slate-50 h-1 rounded '></div>

            {/* <img className='w-3' src={assets.mini_player_icon}/> */}
            <Link to="/song/2"><img className='w-3' src={assets.zoom_icon}/></Link>
            
        </div>
    </div>
  )
}

export default Player