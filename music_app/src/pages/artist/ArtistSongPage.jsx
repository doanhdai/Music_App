import ManageBar from "./components/ManageBar";
import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";

import { FiEye } from "react-icons/fi";

const ArtistSongPage = () => {
  const fakeSongData = [
    {
      id: 1,
      imgUrl:"https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg",
      title: "Show Me Love",
      album: "99%",
      status: "Công khai",
      duration: "3:15"
    },
    {
      id: 1,
      title: "Show Me Love asdfasdf",
      album: "99%",
      status: "Công khai",
      duration: "3:15"
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
    <div>
      <ManageBar></ManageBar>
      <h3 className="mt-3">Tong cong:</h3>
     <SongList songs={songs}/>
    </div>
  );
};

const SongDetailModal = ({ song, onClose }) => {
  if (!song) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#1E1E1E]  p-6 rounded-lg shadow-lg max-w-m w-5/12 relative">
        
        {/* Additional Song Information */}
        {/*
        <div className="mb-2">
          <p><strong>Album:</strong> {song.album}</p>
          <p><strong>Duration:</strong> {song.duration}</p>
          <p><strong>Status:</strong> {song.status === 1 ? 'Active' : 'Inactive'}</p>
          
          <p><strong>Description:</strong> {song.description || 'No description available.'}</p>
        </div>
        */}
        
      <div className="flex items-center justify-around ">
        <div className="flex items-center">
        <img src={song.imgUrl} alt={song.title} className="mb-4 w-40 h-40 rounded" />

          <div className="ml-4 grow text-white">
            <h3 className="text-lg font-semibold">Show me love</h3>
            <h5 className="text-sm text-gray-400">{song.status === 1 ? 'Cong khai' : 'An'}</h5>
            <h5 className="text-sm text-gray-400">Album: 99%</h5>
            <h5 className="text-sm text-gray-400">The loai: {song.grender}</h5>
            <h5 className="text-sm text-gray-400">Nghe si {song.grender}</h5>
          </div>
        </div>
        <div className="flex-none flex space-x-4">
          <button className="text-white hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">  

              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-.656-0.545-1.2-1.2-1.2h-5.25A2.25 2.25 0 0 0 13 7.5H6a2.25 2.25 0 0 0-2.25 2.25V16.5A2.25 2.25 0 0 0 6 18.75h5.25a2.25 2.25 0 0 0 2.25-2.25V10.5H18a2.25 2.25 0 0 0 2.25-2.25Z" />
            </svg>
          </button>
          <button className="text-white hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">  

              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.25-2.25-2.25 2.25-2.25-2.25-2.25 2.25H5.25a2.25 2.25 0 0 0 0 4.5h13.5a2.25 2.25 0 0 0 0-4.5H9.75l2.25 2.25 2.25-2.25 2.25 2.25 2.25-2.25Z" />
            </svg>
          </button>
          <button className="text-white hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">  

              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3.75h18M3 12h18M3 18.75h18" />
            </svg>
          </button>
        </div>
      </div>
      
    
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2  bg-blue-500 text-white py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const SongList = ({songs}) => {
  const [selectedSong, setSelectedSong] = useState(null);

  const handleShowDetails = (song) => {
    setSelectedSong(song);
  };

  const handleCloseModal = () => {
    setSelectedSong(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Song List</h1>
      <div className="bg-[#141414] p-5">
      <table className=" min-w-full table-fixed">
        <thead>
          <tr className="w-full ">
            <th className="py-2 text-center"></th>
            <th className="py-2 px-4 text-left ">Title</th>
            <th className="py-2 px-4 text-center">Album</th>
            <th className="py-2 px-4 text-center">Duration</th>
            <th className="py-2 px-4 text-center">Status</th>
            <th className="py-2  text-center"></th>
          </tr>
        </thead>
        <tbody>
          {songs.map(song => (
            <tr key={song.id} >
              <td className="w-0 py-1 px-0 ">
                <img src={song.imgUrl} alt={song.title} className="w-16 h-16 object-cover" />
              </td>
              <td className="py-1 px-4">
                {song.title}</td>
              <td className="py-1 px-4 text-center">{song.album}</td>
              <td className="py-1 px-4 text-center">{song.duration}</td>
              <td className="py-1 px-4 text-center">{song.status === 1 ? 'Cong khai' : 'An'}</td>
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
