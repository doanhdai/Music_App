import React, { useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
import { songsData } from '../assets/assets'
import SongItems from './SongItems'
import { PlayerContext } from '../context/PlayerContext';

const FullSongPopular = () => {
  const { songsData, albumsData } = useContext(PlayerContext);
  return (
    <>
      <div className="mb-4">
        <div className="flex justify-between">
          <h1 className="mb-4 font-bold text-2xl">Bài hát thịch hành</h1>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {songsData
            .filter((item) => item.chat_luong === "Thấp")
            .map((item, index) => (
              <SongItems
                key={index}
                name={item.ten_bai_hat}
                desc={item.ten_bai_hat}
                id={item.ma_bai_hat}
                img={item.hinh_anh}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default FullSongPopular