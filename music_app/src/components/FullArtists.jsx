import React, { useContext } from "react";
import ArtistItems from "./ArtistItems";
import { PlayerContext } from "../context/PlayerContext";

const FullArtists = () => {
  const { artistsData } = useContext(PlayerContext);

  return (
    <>
      <div className="mb-4">
        <h1 className="mb-4 font-bold text-2xl">Nghệ sĩ đề xuất</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {artistsData.map((item, index) => (
            <ArtistItems
              key={index}
              artist={item.ten_artist}
              id={item.ma_artist}
              img={item.anh_dai_dien}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FullArtists;
