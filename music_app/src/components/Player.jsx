import React, { useContext } from 'react'
import { assets, songsData } from '../assets/assets'
import { Link } from 'react-router-dom'
import { IoIosPause } from "react-icons/io";
import { FaPlay } from "react-icons/fa6";
import { PlayerContext } from '../context/PlayerContext';
const Player = () => {
    const {seekBar,track, seekBg, play, playStatus, pause, time, next, previous} = useContext(PlayerContext)
  return (
    <div className='h[10%] bg-black flex justify-between items-center text-white px-5 py-2 '>
        <div className='hidden lg:flex items-center gap-4'>
            <img className='w-12' src={assets.mck} />
            <div className=''>
                <p className=''>{track.name}</p>
                <p className=''>{track.desc}</p>

            </div>
        </div>
        <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1'>
            <div className='flex gap-4 items-center'>
                <div className='w-6 h-6 flex justify-center items-center'>
                    <img className='w-4 cursor-pointer' src={assets.shuffle_icon}></img>
                </div>
                <div ref={previous} className='w-6 h-6 flex justify-center items-center'>
                    <img className='w-4 cursor-pointer' src={assets.prev_icon}></img>
                </div>
                <div className='w-6 h-6 flex justify-center items-center'>
                    {playStatus ? (
                        <IoIosPause onClick={pause} size={25} />
                    ) : (
                        <FaPlay onClick={play} size={20} />
                    )}
                </div>
                <div ref={next} className='w-6 h-6 flex justify-center items-center'>
                    <img className='w-4 cursor-pointer' src={assets.next_icon}></img>
                </div>
                <div className='w-6 h-6 flex justify-center items-center'>
                    <img className='w-4 cursor-pointer' src={assets.loop_icon}></img>
                </div>
            </div>
            <div className='flex items-center gap-5 '>
                <p>{time.currentTime.minute}:{time.currentTime.second}</p>
                <div ref={seekBg} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
                    <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full'></hr>
                </div>
                <p>{time.totalTime.minute}:{time.totalTime.second}</p>
            </div>
        </div>

        <div className='hidden lg:flex items-center gap-2 opacity-75'>
            {/* <img className='w-3' src={assets.plays_icon}/>
            <img className='w-3' src={assets.mic_icon}/>
            <img className='w-3' src={assets.queue_icon}/>
            <img className='w-3' src={assets.speaker_icon}/> */}
            <img className='w-3' src={assets.volume_icon}/>
            <div className='w-20 bg-slate-50 h-1 rounded '></div>
            <Link to="/song/2"><img className='w-3' src={assets.zoom_icon}/></Link>
            
        </div>
    </div>
  )
}

export default Player