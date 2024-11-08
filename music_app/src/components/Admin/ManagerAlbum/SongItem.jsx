import React from "react";
import { songsData } from "../../../assets/assets";

const SongItem = () => {
  return (
    <div className="flex mt-8 flex-col gap-4 max-h-80 overflow-y-auto">
      {songsData.map((song, index) => (
        <div
          key={song.id}
          className="flex flex-row justify-between items-center h-fit max-w-50"
        >
          <div className="inline-flex items-center gap-4">
            <h5>{index + 1}</h5>
            <img
              src={song.image}
              alt={song.name}
              className="flex-none w-10 h-10 aspect-square"
            />
            <p className="text-wrap max-w-80 flex-1 ">{song.name}</p>
          </div>
          <p className="flex-none">{song.duration}</p>
        </div>
      ))}
    </div>
  );
};

export default SongItem;
