/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useRef, useEffect,useContext,} from "react";
import ImageUpload from "./ImageUpload";
import { FaXmark } from "react-icons/fa6";
import { PlayerContext } from "../../../context/PlayerContext";
import { getAudioDuration , } from "../../../assets/assets";
const EditSongModal = ({ onClose, editSongModalState, songDetails }) => {
  if (editSongModalState === false) return null;

  const { genresData, artistsData } = useContext(PlayerContext);
  const [currentSongData, setCurrentSongData] = useState(null);
  const [songName, setSongName] = useState(currentSongData.ma_bai_hat);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [genreSearch, setGenreSearch] = useState("");
  const [artistSearch, setArtistSearch] = useState("");
  const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
  const [artistDropdownOpen, setArtistDropdownOpen] = useState(false);
  const [highQualityFile, setHighQualityFile] = useState(null);
  const [lowQualityFile, setLowQualityFile] = useState(null);


  const ImgRef = useRef(null);
  const imgData = ImgRef.current?.getData();

  useEffect(() => {
    const fetchSongData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/song/${songDetails.ma_bai_hat}`);
        const data = await response.json();
        setCurrentSongData(data.data);

        // Cập nhật songName, selectedGenres, selectedArtists khi dữ liệu đã có
        setSongName(data.data.ten_bai_hat || "");
        setSelectedGenres(data.data.the_loai || []);
        setSelectedArtists(data.data.subartists || []);
      } catch (error) {
        console.error("Error fetching song data:", error);
      }
    };
  
    fetchSongData();
  }, [songDetails.ma_bai_hat]);




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
    console.log("add",selectedGenres)
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
  console.log("current",selectedGenres)
  const formData = {
    ten_bai_hat: songName,
    ma_tk_artist: currentSongData,
    ma_album: null,
    thoi_luong: getAudioDuration(highQualityFile),
    trang_thai: 1,
    hinh_anh: imgData,
    ngay_phat_hanh: new Date(),
    doanh_thu: 0,
    the_loai: selectedGenres.map((genre) => genre.ma_the_loai),
    links: {
      cao: "",
      thap: "",
    },
    subartists: selectedArtists.map((artist) => artist.ma_artist),
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      songName,
      selectedGenres,
      selectedArtists,
      imgData,
    });
    alert("Form Submitted!");
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
            <ImageUpload ref={ImgRef} initialImage={currentSongData?.hinh_anh}/>
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
                      : "Không có "
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
                            }
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

export default EditSongModal;