import React, { useContext } from 'react'
// import { albumsData } from '../assets/assets'
import { songsData } from '../assets/assets'
import AlbumItems from './AlbumItems'
import SongItems from './SongItems'
import ArtistItems from './ArtistItems'
import { useNavigate } from 'react-router-dom'
import { PlayerContext } from '../context/PlayerContext'
const DisplayHome = () => {

      const navigate= useNavigate()

    const {songsData, albumsData} = useContext(PlayerContext)

  return (
    <>
      {/* nghệ sĩ */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="mb-4 font-bold text-2xl">Nghệ sĩ đề xuất</h1>
          <h1
            className="text-slate-200 mr-3 cursor-pointer hover:text-white"
            onClick={() => navigate(`/artist`)}
          >
            {" "}
            Xem tất cả
          </h1>
        </div>
        {/* <h1 className='my-4 font-bold'>Nghệ sĩ đề xuất</h1> */}
        <div className="flex overflow-auto">
          {albumsData.slice(0,6).map((item, index) => (
            <ArtistItems
              key={index}
              name={item.ten_album}
              desc={item.ten_album}
              id={item.ma_album}
              img={item.hinh_anh}
            />
          ))}
        </div>
      </div>

      <div className="mb-4 pt-10">
        <div className="flex items-center justify-between">
          <h1 className="my-4 font-bold text-2xl">Album đề xuất đề xuất</h1>
          <h1
            className="mr-3 cursor-pointer"
            onClick={() => navigate(`/albums`)}
          >
            {" "}
            Xem tất cả
          </h1>
        </div>
        <div className="flex overflow-auto justify-start">
          {albumsData.slice(0,6).map((item, index) => (
            <AlbumItems
              key={index}
              name={item.ten_album}
              desc={item.ten_album}
              id={item.ma_album}
              img={item.hinh_anh}
            />
          ))}
        </div>
      </div>

      <div className="mb-4 pt-10">
        <div className="flex items-center justify-between">
          <h1 className="my-4 font-bold text-2xl">Bài hát thịch hành</h1>
          <h1
            className="mr-3 cursor-pointer"
            onClick={() => navigate(`/songs`)}
          >
            {" "}
            Xem tất cả
          </h1>
        </div>
        <div className="flex overflow-auto justify-start">
          {songsData.slice(0, 6).map((item, index) => (
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

export default DisplayHome