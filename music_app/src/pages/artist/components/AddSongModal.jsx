import { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { FaXmark } from "react-icons/fa6";
import UploadMusic from "../../../services/UploadMusic";
import { uploadImage } from "../../../services/UserServices";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const fetchArtists = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/songs/artists`);
    return response.data;
  } catch (error) {
    console.error('Error fetching artists:', error);
    throw error;
  }
};

export const fetchGenres = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/genres`);
    return response.data;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export const createSong = async (songData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/song`, songData, {
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`
      }
    });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error creating song:', error);
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
};



const AddSongModal = ({ onClose, modalState }) => {
  if (!modalState) return null;
  return <SongUpload closeModal={onClose} />;
};
export default AddSongModal;

const SongUpload = ({ closeModal }) => {

    const [fileMusicLow, setFileMusicLow] = useState(null);
    const [fileMusicHigh, setFileMusicHigh] = useState(null);
  const ACCESS_TOKEN = 'sl.CBlFYSqqTUj6sgoe-QyANXoRjH6oXWnaAHtrA8pBH--urVct8hmFwoeClAma2b72nUtOeiRdKI-YiPGKYFwBMuqBiCd_IokudNZB9rUj4XtP6VS0N9jGpg7u0OTDhrLRj1sEB_wH27Ki3R4';
  const handleFileMusicHighChange = (event) => {
    setFileMusicHigh(event.target.files[0]);
  };
  const handleFileMusicLowChange = (event) => {
    setFileMusicLow(event.target.files[0]);
  };
  const uploadMusicHigh = UploadMusic({ 
    quality: "high",
    file: fileMusicHigh,
    accessToken: ACCESS_TOKEN,
  });
  const uploadMusicLow = UploadMusic({ 
    quality: "low",
    file: fileMusicLow,
    accessToken: ACCESS_TOKEN,
  });
  // State management
  const [file, setFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [songName, setSongName] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [genreSearch, setGenreSearch] = useState("");
  const [artistSearch, setArtistSearch] = useState("");
  const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
  const [artistDropdownOpen, setArtistDropdownOpen] = useState(false);
  
  // Data states
  const [artistsData, setArtistData] = useState([]);
  const [genresData, setGenresData] = useState([]);


  // Refs and constants
  const fileInputRef = useRef(null);
  const account = JSON.parse(localStorage.getItem('account')) || {};
  const currentArtistId = account.ma_artist || "ACC0006";

  // Fetch artists and genres on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [artistsResponse, genresResponse] = await Promise.all([
          fetchArtists(),
          fetchGenres()
        ]);

        setArtistData(artistsResponse.data || []);
        setGenresData(genresResponse.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to load artists or genres');
      }
    };

    loadData();
  }, []);

  // File handling
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAvatarPreview(URL.createObjectURL(selectedFile));
    }
  };

  // Dropdown toggle
  const toggleDropdown = (type) => {
    if (type === "genre") {
      setGenreDropdownOpen(!genreDropdownOpen);
      setArtistDropdownOpen(false);
    } else {
      setArtistDropdownOpen(!artistDropdownOpen);
      setGenreDropdownOpen(false);
    }
  };

  // Checkbox selection handler
  const handleCheckboxChange = (type, value) => {
    const setter = type === "genre" ? setSelectedGenres : setSelectedArtists;
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Get current date
  const getCurrentDay = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getAudioDuration = (file) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.preload = "metadata";
      audio.onloadedmetadata = () => resolve(audio.duration);
      audio.onerror = reject;
      audio.src = URL.createObjectURL(file);
    });
  };
      

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formFileImage = new FormData();
    formFileImage.append('image', file);

    try {

        const avatar = await uploadImage(formFileImage);
        const shareLinkHigh = await uploadMusicHigh();
        const shareLinkLow = await uploadMusicLow();

      // Get audio duration
      const audioDuration = await getAudioDuration(fileMusicHigh);

      // Prepare form data
      const formData = {
        ten_bai_hat: songName,
        ma_tk_artist: currentArtistId,
        ma_album: null,
        thoi_luong: Math.round(audioDuration),
        trang_thai: 2,
        hinh_anh: avatar,
        ngay_phat_hanh: getCurrentDay(),
        doanh_thu: 0,
        the_loai: selectedGenres.map(genre => genre.ma_the_loai),
        links: {
          cao: shareLinkHigh,
          thap: shareLinkLow,
        },
        subartists: selectedArtists.map(artist => artist.ma_artist)
      };
    console.log(formData);
    
      // Submit song
    const response = await createSong(formData);
     if (response.success ) {
      toast.success('Tạo bài hát thành công', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        });
        closeModal()
     } 
     
    } catch (error) {
      console.error("Song upload error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-2xl mx-auto bg-[#1E1E1E] p-6 rounded-lg shadow-md relative">
        <FaXmark
          className="absolute right-5 top-5 text-2xl cursor-pointer text-white"
          onClick={closeModal}
        />
        <h2 className="text-2xl font-bold mb-5 text-center text-white">Tạo bài hát mới</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row">
            {/* Image Upload Section */}
            <div className="rounded-lg mr-5 max-w-sm">
              <h2 className="text-lg font-semibold text-gray-400 mb-2">Chèn ảnh</h2>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <div
                className="flex bg-white aspect-square items-center justify-center w-40 border-2 rounded-lg cursor-pointer"
                onClick={() => fileInputRef.current.click()}
              >
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Uploaded"
                    className="aspect-square object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-400">Click để tải ảnh</span>
                )}
              </div>
            </div>

            {/* Song Details Section */}
            <div className="w-sm">
              {/* Song Name Input */}
              <div className="mb-4">
                <label className="block text-lg font-semibold text-gray-400 mb-2">
                  Tên bài hát
                </label>
                <input
                  type="text"
                  value={songName}
                  onChange={(e) => setSongName(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 text-black rounded"
                  placeholder="Nhập tên bài hát"
                />
              </div>

              {/* Genre Selection */}
              <div className="mb-4 relative">
                <label className="block text-lg font-semibold text-gray-400 mb-2">
                  Thể loại
                </label>
                <input
                  type="text"
                  readOnly
                  value={
                    selectedGenres.length
                      ? selectedGenres.map(genre => genre.ten_the_loai).join(", ")
                      : "Chọn thể loại"
                  }
                  onClick={() => toggleDropdown("genre")}
                  className="w-full p-2 border border-gray-300 rounded text-black cursor-pointer"
                />
                {genreDropdownOpen && (
                  <div className="absolute z-10 bg-white border border-gray-300 w-full max-h-40 overflow-y-auto">
                    <input
                      type="text"
                      placeholder="Tìm kiếm thể loại..."
                      className="w-full p-2 border border-gray-300 rounded mb-2 text-black"
                      value={genreSearch}
                      onChange={(e) => setGenreSearch(e.target.value)}
                    />
                    {genresData
                      .filter((genre) =>
                        genre.ten_the_loai.toLowerCase().includes(genreSearch.toLowerCase())
                      )
                      .slice(0, 6)
                      .map((genre) => (
                        <label
                          key={genre.ma_the_loai}
                          className="block p-2 cursor-pointer hover:bg-gray-100"
                        >
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={selectedGenres.includes(genre)}
                            onChange={() => handleCheckboxChange("genre", genre)}
                          />
                          <span className="text-black">{genre.ten_the_loai}</span>
                        </label>
                      ))}
                  </div>
                )}
              </div>

              {/* Artist Selection */}
              <div className="mb-4 relative">
                <label className="block text-lg font-semibold text-gray-400 mb-2">
                  Nghệ sĩ liên quan
                </label>
                <input
                  type="text"
                  readOnly
                  value={
                    selectedArtists.length
                      ? selectedArtists.map(artist => artist.ten_artist).join(", ")
                      : "Chọn nghệ sĩ"
                  }
                  onClick={() => toggleDropdown("artist")}
                  className="w-full p-2 border border-gray-300 rounded text-black cursor-pointer"
                />
                {artistDropdownOpen && (
                  <div className="absolute z-10 bg-white border border-gray-300 w-full max-h-40 overflow-y-auto">
                    <input
                      type="text"
                      placeholder="Tìm kiếm nghệ sĩ..."
                      className="w-full p-2 border border-gray-300 rounded mb-2 text-black"
                      value={artistSearch}
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
                          className="block p-2 cursor-pointer hover:bg-gray-100"
                        >
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={selectedArtists.includes(artist)}
                            onChange={() => handleCheckboxChange("artist", artist)}
                          />
                          <span className="text-black">{artist.ten_artist}</span>
                        </label>
                      ))}
                  </div>
                )}
              </div>

              {/* High-Quality File Upload */}
              <div className="mb-4">
                <label className="block text-lg font-semibold text-gray-400 mb-2">
                  File chất lượng cao
                </label>
                <input
                  type="file"
                  required
                    onChange={handleFileMusicHighChange} 
                  className="w-full p-2 border bg-white text-black rounded"
                />
                {fileMusicHigh && (
                  <p className="text-sm text-gray-500 mt-1">
                    {fileMusicHigh.name}
                  </p>
                )}
              </div>

              {/* Low-Quality File Upload */}
              <div className="mb-4">
                <label className="block text-lg font-semibold text-gray-400 mb-2">
                  File chất lượng thấp
                </label>
                <input
                  type="file"
                  required
                  onChange={handleFileMusicLowChange}
                  className="w-full p-2 border bg-white text-black rounded"
                />
                {fileMusicLow && (
                  <p className="text-sm text-gray-500 mt-1">
                    {fileMusicLow.name}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#EB2272] text-white py-2 rounded hover:bg-[#FE61A0] transition duration-300"
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