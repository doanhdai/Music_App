import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { IoIosPause } from "react-icons/io";
import { FaPlay } from "react-icons/fa6";
import { PlayerContext } from '../context/PlayerContext';
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { IoMdPause } from "react-icons/io";
import { IoShuffle } from "react-icons/io5";
import { SlLoop } from "react-icons/sl";

const Player = () => {
    const [volume, setVolume] = useState(0.5);

    const formatTime = (minute, second) => {
        const formattedMinute = minute;
        const formattedSecond = second < 10 ? `0${second}` : second;
        return `${formattedMinute}:${formattedSecond}`;
    };

    const {
        seekBar,
        track,
        seekBg,
        play,
        playStatus,
        pause,
        time,
        next,
        previous,
        seekSong,
        setVolume: setAudioVolume
    } = useContext(PlayerContext);


    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        setAudioVolume(newVolume);
    };

    return (
        <div className='h-[10%] bg-black flex justify-between items-center text-white px-5 py-2 '>
            <div className='hidden lg:flex items-center gap-4'>
                <img className='w-12' src={assets.mck} alt="Song Thumbnail" />
                <div>
                    <p className='font-semibold'>{track.name}</p>
                    <p className='text-sm text-gray-400'>{track.desc}</p>
                </div>
            </div>

            <div className='absolute bottom-1 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1'>
                <div className='flex gap-4 items-center'>
                    <div className='w-6 h-6 flex justify-center items-center'>
                        <IoShuffle size={20} />
                    </div>
                    <div onClick={previous} className='w-6 h-6 flex justify-center items-center cursor-pointer'>
                        <MdSkipPrevious size={25} />
                    </div>
                    <div className='w-7 h-7 flex justify-center items-center bg-white rounded-full'>
                        {playStatus ? (
                            <IoMdPause onClick={pause} className='cursor-pointer text-black pl-0.4' size={15} />
                        ) : (
                            <FaPlay onClick={play} className='cursor-pointer text-black pl-0.5' size={15} />
                        )}
                    </div>
                    <div onClick={next} className='w-6 h-6 flex justify-center items-center cursor-pointer'>
                        <MdSkipNext size={25} />
                    </div>
                    <div className='w-6 h-6 flex justify-center items-center'>
                        <SlLoop size={20} />
                    </div>
                </div>
                <div className='flex items-center gap-5 '>
                    <p className='text-[14px]'>{formatTime(time.currentTime.minute, time.currentTime.second)}</p>
                    <div ref={seekBg} onClick={seekSong} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer relative'>
                        <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full'></hr>
                    </div>
                    <p className='text-[14px]'>{formatTime(time.totalTime.minute, time.totalTime.second)}</p>
                </div>
            </div>

            <div className='hidden lg:flex items-center gap-2 opacity-75'>
                <img 
                    className='w-3 cursor-pointer' 
                    src={assets.volume_icon} 
                    alt="Volume Icon" 
                    onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
                />
                <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={volume} 
                    onChange={handleVolumeChange} 
                    className="w-20 bg-white h-1 rounded"
                />
                <Link to="/song/2">
                    <img className='w-3' src={assets.zoom_icon} alt="Zoom Icon" />
                </Link>
            </div>
        </div>
    )
}

export default Player;
