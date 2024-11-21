import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { useParams } from "react-router-dom";
import SongItems from "./SongItems";

const CategorySong = () => {
  const { songsData, genresData } = useContext(PlayerContext);
  const { id } = useParams();

  const filteredSongs = songsData.filter((song) => song.ma_the_loai === id);

  const genre = genresData.find((genre) => genre.ma_the_loai === id);
  const genreName = genre ? genre.ten_the_loai : "Thể loại không xác định";

  return (
    <>
      <div className="mb-4">
        <div className="flex justify-between">
          <h1 className="mb-4 font-bold text-2xl">
            Bài hát thuộc: {genreName}
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {filteredSongs.map((item, index) => (
            <SongItems
              key={index}
              name={item.ten_bai_hat}
              artistName ={item.artist}
              id={item.ma_bai_hat}
              img={item.hinh_anh}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategorySong;
