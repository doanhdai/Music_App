import React from "react";
import { useLocation } from "react-router-dom";
import AlbumItems from "./AlbumItems";
import SongItems from "./SongItems";
import ArtistItems from "./ArtistItems";

const Search = () => {
  const location = useLocation();
  const { artistResults, albumResults, songResults, searchTerm } = location.state || {};
  const genres = [
    { id: 1, name: "Pop" },
    { id: 2, name: "Rock" },
    { id: 3, name: "Hip Hop" },
    { id: 4, name: "Jazz" },
    { id: 5, name: "Classical" },
    { id: 6, name: "Electronic" },
    { id: 7, name: "R&B" },
    { id: 8, name: "Country" },
    { id: 9, name: "Blues" },
    { id: 10, name: "Reggae" },
    { id: 11, name: "Folk" },
    { id: 12, name: "Latin" },
  ];

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const hasResults =
    artistResults?.length > 0 ||
    albumResults?.length > 0 ||
    songResults?.length > 0;

  return (

  <>
    {searchTerm && searchTerm.trim() ? (
      hasResults ? (
        <div>
          {artistResults?.length > 0 && (
            <>
              <h1 className="mb-4 font-bold text-[20px]">Nghệ sĩ tìm thấy:</h1>
              <div className="flex overflow-auto">
                {artistResults.map((artist, index) => (
                  <ArtistItems
                    key={index}
                    name={artist.name}
                    desc={artist.desc}
                    id={artist.id}
                    img={artist.image}
                  />
                ))}
              </div>
            </>
          )}
          {albumResults?.length > 0 && (
            <>
              <h1 className="mb-4 font-bold text-[20px]">Album tìm thấy:</h1>
              <div className="flex overflow-auto">
                {albumResults.map((album, index) => (
                  <AlbumItems
                    key={index}
                    name={album.name}
                    desc={album.desc}
                    id={album.id}
                    img={album.image}
                  />
                ))}
              </div>
            </>
          )}
          {songResults?.length > 0 && (
            <>
              <h1 className="mb-4 font-bold text-[20px]">Bài hát tìm thấy:</h1>
              <div className="flex overflow-auto">
                {songResults.map((song, index) => (
                  <SongItems
                    key={index}
                    name={song.name}
                    desc={song.desc}
                    id={song.id}
                    img={song.image}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div>
          <div className="px-4 font-bold text-[20px]">Thể loại:</div>
          <div className="grid grid-cols-4 gap-4 p-4">
            {genres.map((genre) => (
              <div
                key={genre.id}
                className="rounded-xl h-40 flex items-center justify-center text-center font-semibold text-white text-[18px]"
                style={{ backgroundColor: getRandomColor() }}
              >
                {genre.name}
              </div>
            ))}
          </div>
        </div>
      )
    ) : (
      <div>
        <div className="px-4 font-bold text-[20px]">Thể loại:</div>
        <div className="grid grid-cols-4 gap-4 p-4">
          {genres.map((genre) => (
            <div
              key={genre.id}
              className="rounded-xl h-40 flex items-center justify-center text-center font-semibold text-white text-[18px]"
              style={{ backgroundColor: getRandomColor() }}
            >
              {genre.name}
            </div>
          ))}
        </div>
      </div>
    )}
  </>
);
};

export default Search;
