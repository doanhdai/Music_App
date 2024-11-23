import React, { useState, useRef, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import { FaXmark } from "react-icons/fa6";

const AddSongModal = ({ onClose, modalState }) => {
  if (!modalState) return null;
  return <SongUpload closeModal={onClose} />;
};
export default AddSongModal;

const genresList = [
  "Pop",
  "Rock",
  "Hip-Hop",
  "Jazz",
  "Classical",
  "Electronic",
];
const artistsList = [
  "Artist A",
  "Artist B",
  "Artist C",
  "Artist D",
  "Artist E",
];

const SongUpload = ({ closeModal }) => {
  const [songName, setSongName] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [genreSearch, setGenreSearch] = useState("");
  const [artistSearch, setArtistSearch] = useState("");
  const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
  const [artistDropdownOpen, setArtistDropdownOpen] = useState(false);

  const [artistsData,setArtistData] = useState([])
  const [genresData, setGenresData] = useState([]);

  const [highQualityFile, setHighQualityFile] = useState(null);
  const [lowQualityFile, setLowQualityFile] = useState(null);
 
  const ImgRef = useRef(null);
  const currentArtistId = "ACC0006";

  //
  //http://127.0.0.1:8000/api/song : them bai hat

//   {
//   "ten_bai_hat": "Bài hát mới",
//   "ma_tk_artist": "ACC0006",
//   "ma_album": null,
//   "thoi_luong": 240,
//   "trang_thai": 1,
//   "hinh_anh": "https://example.com/images/baihat.jpg",
//   "ngay_phat_hanh": "2024-11-21",
//   "doanh_thu": 0,
//   "the_loai": ["CATE0002", "CATE0001"],
//   "links": {
//     "cao": "https://example.com/music/high.mp3",
//     "thap": "https://example.com/music/low.mp3"
//   },
//   "subartists": ["ACC0005", "ACC0004"]
// }
  useEffect(() => {
    const fetchArtists = async () => {

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/songs/artists`);

        if (!response.ok) {
          throw new Error(`artist Network response was not ok (status: ${response.status})`); // Provide more context for debugging
        }
        const data = await response.json();
        console.log(data.data);
        setArtistData(data.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
       
      }
    };
    const fetchGeners = async () => {

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/genres`);

        if (!response.ok) {
          throw new Error(`Network response was not ok (status: ${response.status})`); // Provide more context for debugging
        }
        const data = await response.json();
       // console.log(data.data);
        setGenresData(data.data); // Assuming "bai_hat" is the key containing the songs
      } catch (error) {
        console.error('Error fetching songs:', error);
       
      }
    };
    fetchArtists();
    fetchGeners();
  }, [currentArtistId]);

  const toggleDropdown = (type) => {
    if (type === "genre") {
      setGenreDropdownOpen(!genreDropdownOpen);
      setArtistDropdownOpen(false);
    } else {
      setArtistDropdownOpen(!artistDropdownOpen);
      setGenreDropdownOpen(false);
    }
  };

  const handleCheckboxChange = (type, value) => {
    if (type === "genre") {
      setSelectedGenres((prev) =>
        prev.includes(value)
          ? prev.filter((g) => g !== value)
          : [...prev, value]
      );
    } else {
      setSelectedArtists((prev) =>
        prev.includes(value)
          ? prev.filter((a) => a !== value)
          : [...prev, value]
      );
    }
  };
  function getCurrentDay() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  
  const imgData = ImgRef.current?.getData();
  async function getAudioDuration(file) {
    const url = URL.createObjectURL(file);

    return new Promise((resolve) => {
      const audio = document.createElement("audio");
      audio.muted = true; // Mute the audio to avoid unexpected playback

      const source = document.createElement("source");
      source.src = url;

      audio.appendChild(source);
      audio.preload = "metadata"; // Load metadata only

      audio.onloadedmetadata = () => {
        resolve(audio.duration);
        URL.revokeObjectURL(url); // Release the URL object
      };
    });
  }
  const formData = {
    "ten_bai_hat": songName,
    "ma_tk_artist": currentArtistId,
    "ma_album": null,
    "thoi_luong": getAudioDuration(highQualityFile),
    "trang_thai": 1,
    "hinh_anh": ImgRef,
    "ngay_phat_hanh": getCurrentDay(),
    "doanh_thu": 0,
    "the_loai": selectedGenres.map(genre => genre.ma_the_loai),
    "links": {
      "cao": highQualityFile,
      "thap": lowQualityFile
    },
    "subartists": selectedArtists.map(artist => artist.ma_artist) //["ACC0005", "ACC0004"] //them api
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // try {
    //   const response = await fetch(`http://127.0.0.1:8000/api/albums/${currentArtistId}`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body:  JSON.stringify(formData),
    //   });
  
    //   if (!response.ok) {
    //     // Attempt to parse the error message from the backend
    //     const errorData = await response.json();
    //     throw new Error(errorData.message || "An error occurred while processing your request.");
    //   }

    //   // Parse the successful response
    //   const data = await response.json();
    //   console.log("Form submitted successfully:", data);
    //   alert("Form submitted successfully!");
    // } catch (error) {
    //   // Handle errors
    //   console.error("Error submitting form:", error);
    //   alert(`Error: ${error.message}`);
    // }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-2xl mx-auto bg-[#1E1E1E] p-6 rounded-lg shadow-md relative">
        <FaXmark
          className="absolute right-5 text-2xl cursor-pointer"
          onClick={closeModal}
        />
        <h2 className="text-2xl font-bold mb-5 text-center">Tạo bài hát mới</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row">
            <ImageUpload ref={ImgRef} />

            <div className="w-sm">
              {/* Song Name */}
              <div className="mb-4">
                <label className="text-lg font-semibold text-gray-400">
                  Tên bài hát
                </label>
                <input
                  type="text"
                  value={songName}
                  onChange={(e) => setSongName(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 text-black rounded"
                  placeholder="Enter song name"
                />
              </div>

              {/* Genre Selection */}
              <div className="mb-4 relative">
                <label className="block text-lg font-semibold text-gray-400">
                  Thể loại
                </label>
                <input
                  type="text"
                  readOnly
                  value={
                    selectedGenres.length
                      ? selectedGenres.map(theLoai => theLoai.ten_the_loai).join(", ")
                      : "Chọn thể loại"
                  }
                  onClick={() => toggleDropdown("genre")}
                  className="w-full p-2 border border-gray-300 rounded text-black cursor-pointer"
                />
                {genreDropdownOpen && (
                  <div className="absolute z-10 bg-white border border-gray-300 w-full max-h-40 overflow-y-auto">
                    <input
                      type="text"
                      placeholder="Tìm kiếm nghệ sĩ..."
                      className="w-full p-2 border border-gray-300 rounded mb-2 text-black"
                      onChange={(e) => setGenreSearch(e.target.value)}
                    />
                    {genresData
                      .filter((genre) =>
                        genre.ten_the_loai.toLowerCase().includes(genreSearch.toLowerCase())
                      )
                      .slice(0, 6)
                      .map((genre) => (
                        <label
                          key={genre}
                          className="inline-flex items-center p-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-black"
                            checked={selectedGenres.includes(genre)}
                            onChange={() =>
                              handleCheckboxChange("genre", genre)
                            }
                          />
                          <span className="ml-2 text-gray-400">{genre.ten_the_loai}</span>
                        </label>
                      ))}
                  </div>
                )}
              </div>

              {/* Artist Selection */}
              <div className="mb-4 relative">
                <label className="block text-lg font-semibold text-gray-400">
                  Nghệ sĩ liên quan
                </label>
                <input
                  type="text"
                  readOnly
                  value={
                    selectedArtists.length
                      ? selectedArtists.map(artist => artist.ten_artist).join(", ")
                      : "Select Artist"
                  }
                  onClick={() => toggleDropdown("artist")}
                  className="w-full p-2 border border-gray-300 rounded text-black cursor-pointer"
                />
                {artistDropdownOpen && (
                  <div className="absolute z-10 bg-white border border-gray-300 w-full max-h-40 overflow-y-auto">
                    <input
                      type="text"
                      placeholder="Search artist..."
                      className="w-full p-2 border border-gray-300 rounded mb-2 text-black"
                      onChange={(e) => setArtistSearch(e.target.value)}
                    />
                    {artistsData
                      .filter((artist) =>
                        artist.ten_artist
                          .toLowerCase()
                          .includes(artistSearch.toLowerCase())
                      )
                      .slice(0, 6)
                      .map((artist) => (
                        <label
                          key={artist.ma_artist}
                          className="inline-flex items-center p-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600"
                            checked={selectedArtists.includes(artist)}
                            onChange={() =>
                              handleCheckboxChange("artist", artist)
                            }q
                          />
                          <span className="ml-2 text-gray-400">{artist.ten_artist}</span>
                        </label>
                      ))}
                  </div>
                )}
              </div>

              {/* File Uploads */}
              <div className="mb-4">
                <label className="block text-lg font-semibold text-gray-400">
                  File chất lượng cao
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  required
                  onChange={(e) => setHighQualityFile(e.target.files[0])}
                  className="w-full p-2 border bg-white text-black rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-semibold text-gray-400">
                  File chất lượng thấp
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  required
                  onChange={(e) => setLowQualityFile(e.target.files[0])}
                  className="w-full p-2 border bg-white text-black rounded"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#EB2272] text-white py-2 rounded hover:bg-[#FE61A0] transition"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
