/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useRef, useEffect,useContext,} from "react";
import axios from 'axios';
import { FaXmark } from "react-icons/fa6";
import UploadMusic from "../../../services/UploadMusic";
import { uploadImage } from "../../../services/UserServices";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PlayerContext } from '../../../context/PlayerContext';

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
const EditSongModal = ({ onClose, editSongModalState, songDetails }) => {
  if (editSongModalState === false || songDetails === null) return null;

  const { genresData, artistsData } = useContext(PlayerContext);
  const [songName, setSongName] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [genreSearch, setGenreSearch] = useState("");
  const [artistSearch, setArtistSearch] = useState("");
  const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
  const [artistDropdownOpen, setArtistDropdownOpen] = useState(false);
  const [songDetailOriginal, setSongDetailOriginal] = useState(null)
  const [statusSong, setStatusSong] = useState('')
  const [ownerId, setOwnerId] = useState('')
  const [file, setFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [fileMusicLow, setFileMusicLow] = useState(null);
  const [fileMusicHigh, setFileMusicHigh] = useState(null);

  const fileInputRef = useRef(null);
  const ACCESS_TOKEN = 'sl.CBlFYSqqTUj6sgoe-QyANXoRjH6oXWnaAHtrA8pBH--urVct8hmFwoeClAma2b72nUtOeiRdKI-YiPGKYFwBMuqBiCd_IokudNZB9rUj4XtP6VS0N9jGpg7u0OTDhrLRj1sEB_wH27Ki3R4';
  
  const account = JSON.parse(localStorage.getItem('account')) || {};
  const currentMaQuyen = account.ma_quyen;
  const isReadOnly = currentMaQuyen === 'AUTH0002' ? true : false; //quyen nghe readonly

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
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAvatarPreview(URL.createObjectURL(selectedFile));
    }
  };
  useEffect(() => {
    setSongDetailOriginal(songDetails)
    setOwnerId(songDetails?.ma_artist)
    setStatusSong(songDetails?.trang_thai)
    setSongName(songDetails?.ten_bai_hat)
    setSelectedGenres(songDetails?.the_loai)
    setAvatarPreview(songDetails?.hinh_anh)
    //doi key object ma_subartist to ma_artist..
    const newArray = songDetails.subartists?.map(item => ({
      ma_artist: item.ma_subartist,
      ten_artist: item.ten_subartist
    }));
    setSelectedArtists(newArray)
  },[songDetails.ma_bai_hat])

  const statusList = [
    { status: 0, ten: "Ẩn"},
    { status: 1, ten: 'Công khai' },
    { status: 2, ten: 'Chờ duyệt'}
  ];
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
    console.log("edit",selectedArtists)
    if (type === "genre") {
      setSelectedGenres((prevSelectedGenres) => {
        if (prevSelectedGenres.some((g) => g.ma_the_loai === value.ma_the_loai)) {
          return prevSelectedGenres.filter(
            (g) => g.ma_the_loai !== value.ma_the_loai
          );
        } else {
          return [...prevSelectedGenres, value];
        }
      });
    } else {
      setSelectedArtists((prevSelectedArtists) => {
        if (prevSelectedArtists.some((g) => g.ma_artist === value.ma_artist)) {
          return prevSelectedArtists.filter(
            (g) => g.ma_artist !== value.ma_artist 
          );
        } else {
          return [...prevSelectedArtists, value];
        }
      });
    }
    
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
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formFileImage = new FormData();
    formFileImage.append('image', file);

    try {

        const avatar = file === null? songDetailOriginal.hinh_anh : await uploadImage(formFileImage);
        const shareLinkHigh =fileMusicHigh === null ? songDetailOriginal.link_bai_hat[1].link_bai_hat : await uploadMusicHigh();
        const shareLinkLow =fileMusicLow === null ? songDetailOriginal.link_bai_hat[0].link_bai_hat : await uploadMusicLow();
        // link chat cu chat luong cao khi khong them file
       // nếu không có file mới set thời lượng 90s
      const audioDuration =fileMusicLow === null ? 90 : await getAudioDuration(shareLinkLow );

      // Prepare form data
      const formData = {
        ten_bai_hat: songName,
        ma_tk_artist: ownerId,  //http://127.0.0.1:8000/api/song/BH0003
        ma_album: songDetailOriginal?.album, // lấy chi tiết bài hát thiếu mã album
        thoi_luong: Math.round(audioDuration),
        trang_thai: statusSong,
        hinh_anh: avatar,
        ngay_phat_hanh: getCurrentDay(),
        doanh_thu: songDetailOriginal,
        the_loai: selectedGenres.map(genre => genre.ma_the_loai),
        links: {
          cao: shareLinkHigh,
          thap: shareLinkLow ,
        },
        subartists: selectedArtists.map(artist => artist.ma_artist)
      };
    console.log(formData);
    
      // Submit song
    // const response = await createSong(formData);
    //  if (response.success ) {
    //   toast.success('Sửa bài hát thành công', {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     });
    //     onClose()
    //  } 
     
    } catch (error) {
      console.error("Song upload error:", error);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-2xl mx-auto bg-[#1E1E1E] p-6 rounded-lg shadow-md relative">
        <FaXmark
          className="absolute right-5 text-2xl cursor-pointer"
          onClick={onClose}
        />
        <h2 className="text-2xl font-bold mb-5 text-center">Sửa bài hát mới</h2>
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
                readOnly={isReadOnly}
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
            <div className="w-sm">
            <div className="mb-4 relative">
                <label className="block text-lg font-semibold text-gray-400">
                  Trạng thái
                </label>
                <select
                  className="rounded-md px-2 py-1 ml-3 text-white bg-black "
                  value={statusSong}
                  onChange={(e) => setStatusSong(e.target.value)}
                > {
                    statusList.map((item, index) => (
                      <option key={index} value={item.status}  disabled={isReadOnly && item.status === 1}>
                        {item.ten}
                      </option>
                    ))
                  }      
                </select>
            </div> 
              {/* Song Name */}
              <div className="mb-4">
                <label className="text-lg font-semibold text-gray-400">
                  Tên bài hát
                </label>
                <input
                  type="text"
                  value={songName}
                  onChange={(e) => setSongName(e.target.value)}
                  readOnly={isReadOnly}
                  className="w-full p-2 border border-gray-300 text-black rounded"
                  placeholder="Enter song name"
                />
              </div>            
                {/* Status Selection */}
              
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
                {genreDropdownOpen && isReadOnly && (
                  <div className="absolute z-10 bg-white border border-gray-300 w-full max-h-40 overflow-y-auto">
                    <input
                      type="text"
                      placeholder="Tìm kiếm thể loại..."
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
                          key={genre.ma_the_loai}
                          className="inline-flex items-center p-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-black"
                            checked={selectedGenres.some(
                              (g) => g.ma_the_loai === genre.ma_the_loai
                            )}
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
                      : "Không có "
                  }
                  onClick={() => toggleDropdown("artist")}
                  className="w-full p-2 border border-gray-300 rounded text-black cursor-pointer"
                />
                {artistDropdownOpen && isReadOnly && (
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
                            }
                          />
                          <span className="ml-2 text-gray-400">{artist.ten_artist}</span>
                        </label>
                      ))}
                  </div>
                )}
              </div>
              {/* High-Quality File Upload */}
              <div className={`mb-4 ${isReadOnly ? "hidden" : "" }`}>
                <label className="block text-lg font-semibold text-gray-400 mb-2">
                  File chất lượng cao
                </label>
                <input
                  type="file"
                  
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
              <div className={`mb-4 ${isReadOnly ? "hidden" : "" }`}>
                <label className="block text-lg font-semibold text-gray-400 mb-2">
                  File chất lượng thấp
                </label>
                <input
                  type="file"
                 
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

export default EditSongModal;