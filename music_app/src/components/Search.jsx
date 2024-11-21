import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AlbumItems from "./AlbumItems";
import SongItems from "./SongItems";
import ArtistItems from "./ArtistItems";
import { PlayerContext } from "../context/PlayerContext";

const Search = () => {
  const { genresData } = useContext(PlayerContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { artistResults, albumResults, songResults, searchTerm } = location.state || {};

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const hasResults = artistResults?.length > 0 || albumResults?.length > 0 || songResults?.length > 0;

  return (
    <>
      {searchTerm && searchTerm.trim() ? (
        hasResults ? (
          <div>
            {songResults?.length > 0 && (
              <>
                <h1 className="mb-4 font-bold text-[20px]">
                  Bài hát tìm thấy:
                </h1>
                <div className="flex overflow-auto">
                  {songResults.map((song, index) => (
                    <SongItems
                      key={index}
                      name={song.ten_bai_hat}
                      desc={song.ten_bai_hat}
                      id={song.artist}
                      img={song.hinh_anh}
                    />
                  ))}
                </div>
              </>
            )}
            {artistResults?.length > 0 && (
              <>
                <h1 className="mb-4 font-bold text-[20px]">
                  Nghệ sĩ tìm thấy:
                </h1>
                <div className="flex overflow-auto">
                  {artistResults.map((artist, index) => (
                    <ArtistItems
                      key={index}
                      name={artist.ma_nghe_si}
                      desc={artist.ten_nghe_si}
                      id={artist.ma_nghe_si}
                      img={artist.hinh_anh}
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
                      name={album.ten_album}
                      desc={album.nguoi_so_huu}
                      id={album.ma_album}
                      img={album.hinh_anh}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div>
            <div className="font-bold text-2xl">Thể loại:</div>
            <div className="grid grid-cols-4 gap-4 py-4">
              {genresData.map((genre) => (
                <div
                  key={genre.ma_the_loai}
                  className="rounded-xl h-40 flex items-center justify-center text-center font-semibold text-white text-[18px]"
                  style={{ backgroundColor: getRandomColor() }}
                >
                  {genre.ten_the_loai}
                </div>
              ))}
            </div>
          </div>
        )
      ) : (
        <div>
          <div className="font-bold text-2xl">Thể loại:</div>
          <div className="grid grid-cols-4 gap-4 py-4">
            {genresData.map((genre) => (
              <div
                key={genre.ma_the_loai}
                className="rounded-xl h-40 flex items-center justify-center text-center font-semibold text-white text-[18px]"
                style={{ backgroundColor: getRandomColor() }}
                onClick={() => navigate(`/category/${genre.ma_the_loai}`)}
              >
                {genre.ten_the_loai}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
