import React, { useState, useRef, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import { FaXmark } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { songData2 } from "../../../assets/assets";

const EditAlbumModal = ({ onClose, modalState, albumDetails }) => {
  if (modalState === false) return null;

  const ImgRef = useRef(null);
  const [albumName, setAlbumName] = useState("");
  const [selectedSongs,setSelectedSongs] = useState([]);

  const handleSelectionSongChange = (selected) => {
    setSelectedSongs(selected);
  }
  const handleSongRemoved = (songId) => {
    const selectedItems = selectedSongs;
    delete selectedItems[songId];
    setSelectedSongs({...selectedItems });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const imgData = ImgRef.current.getData();
    // Handle the form submission logic here
    console.log("submit add new album");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-xl mx-auto bg-[#1E1E1E] p-6 rounded-lg shadow-md relative ">
        <FaXmark className="absolute right-5 text-2xl cursor-pointer " onClick={onClose}/>
        <h2 className="text-2xl font-bold mb-5 text-center">
            Chỉnh sửa album
        </h2>
      {/*  submit form */}
        <form  id="albumForm" onSubmit={handleSubmit}>
          <div className="flex flex-row">
            <ImageUpload ref={ImgRef} className="w-56 flex-none" />

            <div className="w-sm">
            <div className="mb-4">
                <label className="text-lg font-semibold text-gray-400" >
                    ten album
                </label>          
                <input
                  name="ten_album"
                  type="text"
                  value={albumName}
                  onChange={(e) => setAlbumName(e.target.value)}
              
                  className="w-full p-2 border border-gray-300 text-black rounded"
                  placeholder="Nhap ten album"
                />
                {/* drop box bai hat */}
                <CheckboxSearch selectedSongs={selectedSongs} placeholderText="Chon bai hat" dataKey="" onSelect={handleSelectionSongChange}/>
              </div>
            </div>
          </div>
            <div id="song-list">
                <AlbumSongList selectedSongs={selectedSongs} removeSong={handleSongRemoved}/>
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
  );;
};
export default EditAlbumModal;


const AlbumSongList = ({selectedSongs,removeSong}) => {
  if (Object.keys(selectedSongs).length === 0) return <div className="flex my-5 text-b flex-col gap-2 h-60 overflow-y-auto "><h3 >Empty album</h3> </div> 

    const songsArray = Object.values(selectedSongs);
    return (
      <div className="flex my-5 flex-col gap-2 h-60 overflow-y-auto ">
        {songsArray.map((song, index) => (
          <div
            key={song.ma_bai_hat}
            className="flex flex-row justify-between items-center h-fit gap-4 max-w-50"
          >
            
              <h5>{index + 1}</h5>
              <img
                src={song.hinh_anh}
                alt={song.ten_bai_hat}
                className="flex-none w-10 h-10 aspect-square"
              />
           
            <p className="text-wrap max-w-80 flex-1 ">{song.ten_bai_hat}</p>
            <p className="flex-none">{song.thoi_luong}</p>
            <button type="button" className="p-2 hover:bg-slate-500" onClick={() => removeSong(song.ma_bai_hat) }>X</button>
          </div>
        ))}
      </div>
    );
  };
  
  const CheckboxSearch = ({selectedSongs, placeholderText, dataKey, onSelect }) => {
    // dataKey is the key of data when api return result ex: { songs: [....]}
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItems, setSelectedItems] = useState({});
    const [searchResults, setSearchResults] = useState([]);
    let count = 0;
    
    const toggleDropdown = () => {
      setDropdownOpen(!isDropdownOpen);
    };
  
    const songData = songData2; // results variable bellow is real
  
    const handleSearchChange = async (e) => {
      const term = e.target.value;
      setSearchTerm(term);
  
      if (term) {
        try {
          const response = await fetch(`${apiUrl}?q=${term}`);
          const results = await response.json();
          setSearchResults(results[dataKey] || []);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setSearchResults([]);
      }
    };
  
    const handleCheckboxChange = (item) => {
      const updatedSelection = { ...selectedSongs };
  
      // Toggle selection of the item
      if (updatedSelection[item.ma_bai_hat]) {
        delete updatedSelection[item.ma_bai_hat]; // Remove item if already selected
      } else {
        updatedSelection[item.ma_bai_hat] = item; // Add item with all details
      }
  
      if (onSelect) {
        onSelect(updatedSelection);
      }
    };
  
    return (
      <div className="relative flex w-auto mt-5">
        <button
          type="button"
          className="flex-1 inline-flex justify-between p-2 bg-white text-black cursor-pointer hover:bg-[#EB2272] rounded"
          onClick={toggleDropdown}
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}

        >
          <span>Them bai hat</span> <FaAngleDown className="text-2xl"/>
        </button>
  
        {isDropdownOpen && (
          <div className="absolute z-10 bg-white border text-black border-gray-300 mt-12 w-80 shadow-lg rounded ">
            <input
              type="text"
              placeholder={placeholderText}
              className="p-2 border-b border-gray-300 w-full"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="max-h-60 overflow-y-auto">
              {/*  replace songData to searchResults for real result   */}
              {songData.length > 0 ? (
                songData.map((item) => (
                  <div
                    key={item.ma_bai_hat}
                    className="flex items-center p-2 hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      checked={!!selectedSongs[item.ma_bai_hat]}
                      onChange={() => handleCheckboxChange(item)}
                      className="mr-2"
                    />
                    <div>
                      <strong>{item.ten_bai_hat}</strong>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500">No items found</div>
              )}
            </div>
            
          </div>
        )}
      </div>
    );
  };