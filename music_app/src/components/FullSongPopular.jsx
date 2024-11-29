import React, { useContext } from 'react'
import SongItems from './SongItems'
import { PlayerContext } from '../context/PlayerContext';

const FullSongPopular = () => {
  const { songsData, } = useContext(PlayerContext);
  return (
    <>
      <div className="mb-4">
        <div className="flex justify-between">
          <h1 className="mb-4 font-bold text-2xl">Bài hát thịch hành</h1>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {songsData.map((item, index) => (
              <SongItems
                key={index}
                name={item.ten_bai_hat}
                artistName={item.ten_bai_hat}
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