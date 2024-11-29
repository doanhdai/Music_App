import React, { useContext } from "react";
import AlbumItems from "./AlbumItems";
import { PlayerContext } from "../context/PlayerContext";

const FullAlbums = () => {
  const { albumsData } = useContext(PlayerContext);
  return (
    <div>
      <div className="mb-4">
          <h1 className="mb-4 font-bold text-2xl">Album phổ biến</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {albumsData.map((item, index) => (
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
    </div>
  );
};

export default FullAlbums;
