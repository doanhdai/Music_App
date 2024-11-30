/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useRef, useEffect, useContext } from "react";
import { uploadImage } from "../../../services/UserServices";
import { FaXmark } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { PlayerContext } from "../../../context/PlayerContext";

const EditAlbumModal = ({ onClose, editAlbumModalState, selectedAlbum }) => {
  if (editAlbumModalState === false || selectedAlbum === null) return null;
  
  
  const { songsData } = useContext(PlayerContext);
  const [albumName, setAlbumName] = useState(selectedAlbum.ten_album);
  const [selectedSongs,setSelectedSongs] = useState([]);
  const [originAlbumData, setOriginAlbumData] = useState()
  
  const [file, setFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/albums${selectedAlbum.ma_album}/songs`);
        const data = await response.json();
        setSelectedSongs(data.album.songs);
        setOriginAlbumData(data.album);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };
  
    if (selectedAlbum.ma_album) {
      fetchSongs();
    }
  }
  ,[selectedAlbum.ma_album])
  console.log(originAlbumData)

  const handleSongRemoved = (songId) => {
    const selectedItems = selectedSongs;
    delete selectedItems[songId];
    setSelectedSongs({...selectedItems });
  };
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAvatarPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    
    e.preventDefault();
    const formFileImage = new FormData();
    formFileImage.append('image', file);
    
    const avatar = await uploadImage(formFileImage);
      const formData = {
        "ten_album": albumName,
        "hinh_anh": avatar,
        "songs": selectedSongs
      
      }
    // Handle the form submission logic here
    console.log(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-xl mx-auto bg-[#1E1E1E] p-6 rounded-lg shadow-md relative ">
        <FaXmark className="absolute right-5 text-2xl cursor-pointer " onClick={onClose}/>
        <h2 className="text-2xl font-bold mb-5 text-center">
            Tạo album mới
        </h2>
      {/*  submit form */}
        <form  id="albumForm" onSubmit={handleSubmit}>
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

            <div className="w-sm">
            <div className="mb-4">
                <label className="text-lg font-semibold text-gray-400" >
                    Tên album
                </label>          
                <input
                  name="ten_album"
                  type="text"
                  value={albumName}
                  onChange={(e) => setAlbumName(e.target.value)}
              
                  className="w-full p-2 border border-gray-300 text-black rounded"
                  placeholder="Nhập tên album"
                />
                {/* drop box bai hat */}
                <CheckboxSearch songsData={songsData} selectedSongs={selectedSongs} placeholderText="Chọn bài hát" dataKey="" setSelectedSongs={setSelectedSongs}/>
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
  if (Object.keys(selectedSongs).length === 0) return <div className="flex my-5 text-b flex-col gap-2 h-60 overflow-y-auto "><h3 >Album rỗng</h3> </div> 

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
  
  const CheckboxSearch = ({songsData,selectedSongs, placeholderText, dataKey, setSelectedSongs }) => {
    // dataKey is the key of data when api return result ex: { songs: [....]}
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    let count = 0;
    
    const toggleDropdown = () => {
      setDropdownOpen(!isDropdownOpen);
    };
  
    
    
    const filteredSongs = songsData?.filter((item) => { 
      return (
        item.ten_bai_hat.toLowerCase().includes(searchQuery.toLowerCase())
       
      )
    });

    const handleCheckboxChange = (item) => {
      const updatedSelection = [...selectedSongs]; // Create a copy of the array
    
      // Find the index of the item in the array
      const index = updatedSelection.findIndex(song => song.ma_bai_hat === item.ma_bai_hat);
    
      if (index !== -1) {
        // Remove the item if it's already in the array
        updatedSelection.splice(index, 1);
      } else {
        // Add the item to the array
        updatedSelection.push(item);
      }
    
      setSelectedSongs(updatedSelection);
      console.log(updatedSelection);
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
          <span>Thêm bài hát</span> <FaAngleDown className="text-2xl"/>
        </button>
  
        {isDropdownOpen && (
          <div className="absolute z-10 bg-white border text-black border-gray-300 mt-12 w-80 shadow-lg rounded ">
            <input
              type="text"
              placeholder={placeholderText}
              className="p-2 border-b border-gray-300 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="max-h-60 overflow-y-auto">
              {/*  replace songData to searchResults for real result   */}
              {filteredSongs != null ? (
                filteredSongs.map((item) => (
                  <div
                    key={item.ma_bai_hat}
                    className="flex items-center p-2 hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSongs?.some(song => song.ma_bai_hat === item.ma_bai_hat)}
                      onChange={() => handleCheckboxChange(item)}
                      className="mr-2"
                    />
                    <div>
                      <strong>{item.ten_bai_hat}</strong>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500">Không tìm thấy bài hát</div>
              )}
            </div>
            
          </div>
        )}
      </div>
    );
  };