import React, { useContext } from "react";
// import { albumsData } from '../assets/assets'
import { assets, songsData } from "../assets/assets";
import AlbumItems from "./AlbumItems";
import SongItems from "./SongItems";
import ArtistItems from "./ArtistItems";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
const DisplayHome = () => {
  const navigate = useNavigate();

  const { songsData, albumsData, artistsData } = useContext(PlayerContext);

  // Sắp xếp danh sách nghệ sĩ
  const sortedArtistsData = artistsData.sort((a, b) => {
    const hasSongsA = songsData.some((song) => song.ma_artist === a.ma_artist);
    const hasSongsB = songsData.some((song) => song.ma_artist === b.ma_artist);

    // Nghệ sĩ có bài hát được ưu tiên
    if (hasSongsA && !hasSongsB) return -1;
    if (!hasSongsA && hasSongsB) return 1;
    return 0;
  });
  return (
    <>
      {songsData.length != 0 &&
        albumsData.length != 0 &&
        artistsData.length != 0 ? (
        <>
          <div>
            <div className="flex items-center justify-between mb-4">
              {artistsData.length > 0 ? (
                <h1 className="font-bold text-2xl">Nghệ sĩ đề xuất</h1>
              ) : (
                ""
              )}
              {artistsData.length > 6 ? (
                <h1
                  className="text-slate-200 mr-3 cursor-pointer hover:text-white"
                  onClick={() => navigate(`/artist`)}
                >
                  {" "}
                  Xem tất cả
                </h1>
              ) : (
                ""
              )}
            </div>
            {/* <h1 className='my-4 font-bold'>Nghệ sĩ đề xuất</h1> */}
            <div className="flex overflow-auto">
              {sortedArtistsData.slice(0, 6).map((item, index) => (
                <ArtistItems
                  key={index}
                  name={item.ten_artist}
                  id={item.ma_artist}
                  img={assets.mck}
                />
              ))}
            </div>
          </div>

          <div className="mb-4 pt-10">
            <div className="flex items-center justify-between mb-4">
              {albumsData.length > 0 ? (
                <h1 className="font-bold text-2xl">Album phổ biến</h1>
              ) : (
                ""
              )}
              {albumsData.length > 6 ? (
                <h1
                  className="text-slate-200 mr-3 cursor-pointer hover:text-white"
                  onClick={() => navigate(`/albums`)}
                >
                  Xem tất cả
                </h1>
              ) : (
                ""
              )}
            </div>
            <div className="flex overflow-auto justify-start">
              {albumsData.slice(0, 6).map((item, index) => (
                <AlbumItems
                  key={index}
                  name={item.ten_album}
                  desc={item.nguoi_so_huu}
                  id={item.ma_album}
                  img={item.hinh_anh}
                />
              ))}
            </div>
          </div>

          <div className="mb-4 pt-10">
            <div className="flex items-center justify-between mb-4">
              {songsData.length > 0 ? (
                <h1 className="font-bold text-2xl">Bài hát thịnh hành</h1>
              ) : (
                ""
              )}
              {songsData.length > 6 ? (
                <h1
                  className="text-slate-200 mr-3 cursor-pointer hover:text-white"
                  onClick={() => navigate(`/songs`)}
                >
                  {" "}
                  Xem tất cả
                </h1>
              ) : (
                ""
              )}
            </div>
            <div className="flex overflow-auto justify-start">
              {songsData.slice(0, 6).map((item, index) => (
                <SongItems
                  key={index}
                  name={item.ten_bai_hat}
                  artistName={item.artist}
                  id={item.ma_bai_hat}
                  img={item.hinh_anh}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="wrap-loader">
          <span className="loader"></span>
        </div>
      )}
      {/* nghệ sĩ */}
    </>
  );
};

export default DisplayHome;
