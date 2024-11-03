import React from 'react';
import { useLocation } from 'react-router-dom';

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
    { id: 12, name: "Latin" }
  ];

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const hasResults = artistResults?.length > 0  || albumResults?.length > 0 || songResults?.length > 0;

  return (
    <>
      {searchTerm && searchTerm.trim() ? (
        hasResults ? (
          <div>
            <h2>Kết quả tìm kiếm:</h2>
            <div>
              <h3>Nghệ sĩ</h3>
              {artistResults?.map((artist) => (
                <p key={artist.id}>{artist.name}</p>
              ))}
              <h3>Album</h3>
              {albumResults?.map((album) => (
                <p key={album.id}>{album.name}</p>
              ))}
              <h3>Bài hát</h3>
              {songResults?.map((song) => (
                <p key={song.id}>{song.name}</p>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className='px-4 font-bold text-[20px]'>Thể loại:</div>
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
          <div className='px-4 font-bold text-[20px]'>Thể loại:</div>
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