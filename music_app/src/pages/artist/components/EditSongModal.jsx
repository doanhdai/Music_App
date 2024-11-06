import React, { useState, useRef } from "react";
import ImageUpload from "./ImageUpload";
import { FaXmark } from "react-icons/fa6";

const EditSongModal = ({ onClose, editSongModalState, songDetails }) => {
  if (editSongModalState === false) return null;

  const [songName, setSongName] = useState(songDetails?.ma_bai_hat || "");
  const [selectedGenres, setSelectedGenres] = useState(songDetails?.genres || []);
  const [selectedArtists, setSelectedArtists] = useState(songDetails?.artists || []);
  const [genreSearch, setGenreSearch] = useState("");
  const [artistSearch, setArtistSearch] = useState("");
  const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
  const [artistDropdownOpen, setArtistDropdownOpen] = useState(false);
  const ImgRef = useRef(null); // store img data not api link

  console.log(songDetails)
  const toggleGenreDropdown = () => {
    setGenreDropdownOpen(!genreDropdownOpen);
    setArtistDropdownOpen(false); // Close artist dropdown if open
  };

  const toggleArtistDropdown = () => {
    setArtistDropdownOpen(!artistDropdownOpen);
    setGenreDropdownOpen(false); // Close genre dropdown if open
  };

  const handleGenreChange = (genre) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genre)) {
        return prev.filter((g) => g !== genre);
      }
      return [...prev, genre];
    });
  };

  const handleArtistChange = (artist) => {
    setSelectedArtists((prev) => {
      if (prev.includes(artist)) {
        return prev.filter((a) => a !== artist);
      }
      return [...prev, artist];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const imgData = ImgRef.current.getData();
    // Handle the form submission logic here
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
      <div className="max-w-2xl mx-auto bg-[#1E1E1E] p-6 rounded-lg shadow-md relative ">
        <FaXmark className="absolute right-5 text-2xl cursor-pointer " onClick={onClose} />
        <h2 className="text-2xl font-bold mb-5 text-center">
          Sửa bài hát
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row">
            <ImageUpload ref={ImgRef} initialImage={songDetails?.hinh_anh} />

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
                      ? selectedGenres.join(", ")
                      : "Select Genre"
                  }
                  onClick={toggleGenreDropdown}
                  className="w-full p-2 border border-gray-300 rounded text-black cursor-pointer"
                />
                {genreDropdownOpen && (
                  <div className="absolute z-10 bg-white border  border-gray-300 w-full max-h-40 overflow-y-auto">
                    <input
                      type="text"
                      placeholder="Search genre..."
                      className="w-full p-2 border border-gray-300  rounded mb-2 text-black"
                      onChange={(e) => setGenreSearch(e.target.value)}
                    />
                    {genresList
                      .filter((genre) =>
                        genre.toLowerCase().includes(genreSearch.toLowerCase())
                      ).slice(0,6) // only show 6 items
                      .map((genre) => (
                        <label
                          key={genre}
                          className="inline-flex items-center p-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-black"
                            checked={selectedGenres.includes(genre)}
                            onChange={() => handleGenreChange(genre)}
                          />
                          <span className="ml-2 text-gray-400">{genre}</span>
                        </label>
                      ))}
                  </div>
                )}
              </div>


              {/* Related Artist Selection */}
              <div className="mb-4 relative">
                <label className="block text-lg font-semibold text-gray-400">
                  Nghệ sĩ liên quan
                </label>
                <input
                  type="text"
                  readOnly
                  value={
                    selectedArtists.length
                      ? selectedArtists.join(", ")
                      : "Select Artist"
                  }
                  onClick={toggleArtistDropdown}
                  className="w-full p-2 border border-gray-300 text-black rounded cursor-pointer"
                />
                {artistDropdownOpen && (
                  <div className="absolute z-10 bg-white border border-gray-300 w-full max-h-40 overflow-y-auto">
                    <input
                      type="text"
                      placeholder="Search artist..."
                      className="w-full p-2 border border-gray-300 text-black rounded mb-2"
                      onChange={(e) => setArtistSearch(e.target.value)}
                    />
                    {artistsList
                      .filter((artist) =>
                        artist
                          .toLowerCase()
                          .includes(artistSearch.toLowerCase())
                      ).slice(0,6)
                      .map((artist) => (
                        <label
                          key={artist}
                          className="inline-flex items-center p-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600"
                            checked={selectedArtists.includes(artist)}
                            onChange={() => handleArtistChange(artist)}
                          />
                          <span className="ml-2 text-gray-400">{artist}</span>
                        </label>
                      ))}
                  </div>
                )}
              </div>

              {/* Music File Upload */}
              <div className="mb-4">
                <label className="block text-lg font-semibold text-gray-400">
                  Tai nhac
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  className="w-full p-2 border  bg-white text-black rounded"
                />
              </div>

              {/* Submit Button */}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#EB2272] text-white py-2 rounded hover:bg-[#FE61A0] transition"
          >
            Xác nhận
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSongModal;