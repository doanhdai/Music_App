import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { IoIosPause } from "react-icons/io";
import { FaPlay } from "react-icons/fa6";
import { PlayerContext } from "../context/PlayerContext";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { IoMdPause } from "react-icons/io";
import { IoShuffle } from "react-icons/io5";
import { SlLoop } from "react-icons/sl";
import { GoMute } from "react-icons/go";
import { GoUnmute } from "react-icons/go";
import axios from "axios";
import AdModal from "./AdModal";

const Player = () => {
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [currentAd, setCurrentAd] = useState(null);
  const [advertisements, setAdvertisements] = useState([]);

  const formatTime = (minute, second) => {
    const formattedMinute = minute;
    const formattedSecond = second < 10 ? `0${second}` : second;
    return `${formattedMinute}:${formattedSecond}`;
  };

  const url = "http://localhost:8000";
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
    realPlayTime,
    toggleShuffle,
    isShuffle,
    setIsShuffle,
    isRepeat,
    toggleRepeat,
    setVolume: setAudioVolume,
  } = useContext(PlayerContext);

  const getAdvertisementsData = async () => {
    try {
      const response = await axios.get(`${url}/api/advertisements`);
      setAdvertisements(response.data.advertisements);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setAudioVolume(newVolume);
    newVolume > 0 ? setIsMuted(false) : setIsMuted(true);
  };

  const handleMuteClick = () => {
    isMuted ? setIsMuted(false) : setIsMuted(true);
    const newVolume = volume === 0 ? 0.5 : 0;
    setVolume(newVolume);
    setAudioVolume(newVolume);
  };
  // lấy ra quảng cáo rồi random nè
  useEffect(() => {
    // số 10 là số giây muốn hiện quảng cáo nè
    if (realPlayTime === 10) {
      const activeAds = advertisements.filter(
        (ad) => ad.trang_thai === 1 && ad.luot_phat_tich_luy > 0
      );

      if (activeAds.length > 0) {
        const randomAd =
          activeAds[Math.floor(Math.random() * activeAds.length)];
        updateAdPlayCount(randomAd.ma_quang_cao);
        setCurrentAd(randomAd);

        setShowAd(true);
        pause();
      }
    } else if (realPlayTime === 5) {
      updateListen();
    }
  }, [realPlayTime]);


  const updateListen = async () => {
    try {
      await axios.post(`${url}/api/song/listens/${track.ma_bai_hat}`);
    } catch (error) {
      console.log(error);
    }
  };
  const updateAdPlayCount = async (maQuangCao) => {
    try {
      await axios.put(`${url}/api/advertisements/${maQuangCao}/use`);
      console.log(maQuangCao);
      getAdvertisementsData();
    } catch (err) {
      console.error("Failed to update advertisement play count:", err);
    }
  };
  useEffect(() => {
    getAdvertisementsData();
  }, []);

  const handleAdClose = () => {
    setShowAd(false);
    play();
  };

  return (
    <>
      {/* Modal Quảng cáo */}
      {showAd && currentAd && (
        <AdModal
          isOpen={showAd}
          onClose={handleAdClose}
          title={currentAd.ten_quang_cao}
          urlImage={
            currentAd.hinh_anh ||
            "https://replus.com.vn/wp-content/uploads/2022/07/Dich-vu-thiet-ke-thuong-hieu-hinh-anh-quang-cao.png"
          }
        />
      )}
      <div className="h-[10%] bg-black flex justify-between items-center text-white px-5 py-2 ">
        <div className="hidden lg:flex items-center gap-4">
          <img className="w-12" src={assets.mck} alt="Song Thumbnail" />
          <div>
            <p className="font-semibold">{track ? track.ten_bai_hat : null}</p>
            <p className="text-sm text-gray-400">
              {track ? track.artist : null}
            </p>
          </div>
        </div>

        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1">
          <div className="flex gap-4 items-center">
            <div
              onClick={() => setIsShuffle(!isShuffle)}
              className="w-6 h-6 flex justify-center items-center"
            >
              {!isShuffle ? (
                <IoShuffle size={20} />
              ) : (
                <IoShuffle color="#00FF00" size={20} />
              )}
            </div>
            <div
              onClick={previous}
              className="w-6 h-6 flex justify-center items-center cursor-pointer"
            >
              <MdSkipPrevious size={25} />
            </div>
            <div className="w-7 h-7 flex justify-center items-center bg-white rounded-full">
              {playStatus ? (
                <IoMdPause
                  onClick={pause}
                  className="cursor-pointer text-black pl-0.4"
                  size={15}
                />
              ) : (
                <FaPlay
                  onClick={play}
                  className="cursor-pointer text-black pl-0.5"
                  size={15}
                />
              )}
            </div>
            <div
              onClick={next}
              className="w-6 h-6 flex justify-center items-center cursor-pointer"
            >
              <MdSkipNext size={25} />
            </div>
            <div
              onClick={toggleRepeat}
              className="w-6 h-6 flex justify-center items-center"
            >
              {" "}
              {!isRepeat ? (
                <SlLoop size={20} />
              ) : (
                <SlLoop color="#00FF00" size={20} />
              )}
            </div>
          </div>
          <div className="flex items-center gap-5 ">
            <p className="text-[14px]">
              {formatTime(time.currentTime.minute, time.currentTime.second)}
            </p>
            <div
              ref={seekBg}
              onClick={seekSong}
              className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer relative"
            >
              <hr
                ref={seekBar}
                className="h-1 border-none w-0 bg-green-800 rounded-full"
              ></hr>
            </div>
            <p className="text-[14px]">
              {formatTime(time.totalTime.minute, time.totalTime.second)}
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 opacity-75">
          {isMuted ? (
            <GoMute onClick={handleMuteClick} />
          ) : (
            <GoUnmute onClick={handleMuteClick} />
          )}

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 bg-white h-1 rounded"
          />
          <Link to={`/song/${track?.ma_bai_hat}`}>
            <img className="w-3" src={assets.zoom_icon} alt="Zoom Icon" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Player;
