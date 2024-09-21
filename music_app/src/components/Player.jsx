import React from 'react'
import { assets, songsData } from '../assets/assets'

const Player = () => {
  return (
    <div className='h[10%] bg-black flex justify-between items-center text-white px-4 '>
        <div className='hidden lg:flex items-center gap-4'>
            <img className='w-12' src={songsData[0].image} />
            <div className=''>
                <p className=''>{songsData[0].name}</p>
                <p className=''>{songsData[0].desc.slice(0,12)}</p>

            </div>
        </div>
        <div className='absolute buttom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1'>
        <div className='flex gap-4 '>
            <img className='w-4 cursor-pointer' src={assets.shuffle_icon}></img>
            <img className='w-4 cursor-pointer' src={assets.prev_icon}></img>
            <img className='w-4 cursor-pointer' src={assets.play_icon}></img>
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
            <img className='w-3' src={assets.plays_icon}/>
            <img className='w-3' src={assets.mic_icon}/>
            <img className='w-3' src={assets.queue_icon}/>
            <img className='w-3' src={assets.speaker_icon}/>
            <img className='w-3' src={assets.volume_icon}/>
            <div className='w-20 bg-slate-50 h-1 rounded '></div>

            <img className='w-3' src={assets.mini_player_icon}/>
            <img className='w-3' src={assets.zoom_icon}/>
        </div>
    </div>
  )
}

export default Player