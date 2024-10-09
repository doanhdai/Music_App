import ManageBar from "./components/ManageBar";
import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";

import { FiEye } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa6";
import { IoTimeSharp } from "react-icons/io5";

const ArtistSongPage = () => {
  const fakeSongData = [
    {
      id: 1,
      imgUrl:
        "https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg",
      title: "Show Me Love",
      album: "99%",
      status: "Công khai",
      duration: "3:15",
    },
    {
      id: 1,
      title: "Show Me Love asdfasdf",
      album: "99%",
      status: "Công khai",
      duration: "3:15",
    },
  ];
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // fetch("link")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     setSongs(data);
    //   });
    setSongs(fakeSongData);
  }, []);
  
  return (
    <div className="p-5">
      <ManageBar></ManageBar>
      <h3 className="mt-3">Tong cong: {songs.length}</h3>
      <SongList songs={songs} />
    </div>
  );
};

const SongDetailModal = ({ song, onClose }) => {
  if (!song) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-[#1E1E1E]  p-10 p rounded-lg max-w-screen-sm shadow-lg   relative">
        <div className="flex items-center justify-center ">
          <div className="flex items-stretch">
            <img
              src={song.imgUrl}
              alt={song.title}
              className="mb-4 w-40 h-40 rounded"
            />

            <div className="flex flex-col justify-between ml-4  text-white">
              <h3 className="text-lg text-wrap font-semibold">Show me love fads adfasd f</h3>
              <h5 className="text-sm text-gray-400">
                <span></span>{song.status === 1 ? "Cong khai" : "An"}
              </h5>
              <h5 className="text-sm text-gray-400">Album: <span className="text-white">99%</span></h5>
              <h5 className="text-sm text-gray-400">
                The loai: <span className="text-white">99%{song.grender}</span>
              </h5>
              <h5 className="text-sm text-gray-400">Nghe si:  <span className="text-white">99%</span></h5>
            </div>
          </div>
          <div className="flex flex-col  gap-3 justify-between w-[60] ml-2">
            <div className="flex flex-row items-center text-gray-400 gap-2">
              <FaHeart class/>
              <span>11{song.luot_yeu_thich}</span>

            </div>
            <div className="flex flex-row items-center text-gray-400 gap-2">
              <FaHeadphones/>
              <span>11{song.luot_nghe}</span>
            </div>
            <div className="flex flex-row items-center text-gray-400 gap-2">
              <IoTimeSharp/>
              <span>3:2</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white py-2 px-4 rounded"
        > X
        </button>
      </div>
    </div>
  );
};

const SongList = ({ songs }) => {
  const [selectedSong, setSelectedSong] = useState(null);

  const handleShowDetails = (song) => {
    setSelectedSong(song);
  };

  const handleCloseModal = () => {
    setSelectedSong(null);
  };

  return (
    <div className="container mx-auto ">
      <div className="bg-[#141414] p-5">
        <table className=" min-w-full table-fixed">
          <thead className="border-b-2">
            <tr className="w-full ">
              <th className="py-2 text-center"></th>
              <th className="py-2 px-4 text-left ">Ten bai hat</th>
              <th className="py-2 px-4 text-center">Album</th>
              <th className="py-2 px-4 text-center">Trang thai</th>
              <th className="py-2 px-4 text-center">Thoi luong</th>
              
              <th className="py-2  text-center"></th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr key={song.id}>
                <td className="w-0 py-3 px-0 ">
                  <img
                    src={song.imgUrl}
                    alt={song.title}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="py-1 px-4">{song.title}</td>
                <td className="py-1 px-4 text-center">{song.album}</td>
                <td className="py-1 px-4 text-center">
                  {song.status === 1 ? "Cong khai" : "An"}
                </td>
                <td className="py-1 px-4 text-center">{song.duration}</td>              
                <td className="w-2 py-1 px-0 text-center">
                  <button
                    onClick={() => handleShowDetails(song)}
                    className="text-3xl text-white py-1 px-2 rounded"
                  >
                    <FiEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal for song details */}
      <SongDetailModal song={selectedSong} onClose={handleCloseModal} />
    </div>
  );
};
export default ArtistSongPage;
