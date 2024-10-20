import ManageBar from "./components/ManageBar";
import { useEffect, useState } from "react";

import { assets } from "../../assets/assets";
import { CiSearch } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { BiSolidLock } from "react-icons/bi";
import { BiSolidLockOpen } from "react-icons/bi";
import { GoPlus } from "react-icons/go";
import { TfiPencil } from "react-icons/tfi";
import { FaTrash } from "react-icons/fa";
import { BsSendPlus } from "react-icons/bs";
import AddAlbumModal from "./components/AddAlbumModal";

const ArtistAlbumPage = () => {
  const fakeAlbumData = [
    
    {
      albumId: "ALBUM001",
      tenAlbum: "Album Title 1",
      ngayTao: new Date("2024-09-15T12:34:56Z"),
      hinhAnh:
        "https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg",
      luotYeuThich: 1000,
      trangThai: 1,
    },
    {
      albumId: "ALBUM002",
      tenAlbum: "Album Title 2",
      ngayTao: new Date("2024-10-01T15:00:00Z"),
      hinhAnh: "https://example.com/album2.jpg",
      luotYeuThich: 500,
      trangThai: 0,
    },
    {
      albumId: "ALBUM003",
      tenAlbum: "Album Title 1",
      ngayTao: new Date("2024-09-15T12:34:56Z"),
      hinhAnh:
        "https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg",
      luotYeuThich: 1000,
      trangThai: 1,
    },
  ];
  const [albums, setAlbum] = useState([]);

  useEffect(() => {
    setAlbum(fakeAlbumData);
  }, []);

  const [showAddAlbumModal, setShowAddAlbumModal] = useState(false);

  const handleShowDetails = () => {
    setShowAddAlbumModal(true);
  };
  const handleCloseAddAlbumModal = () => {
    setShowAddAlbumModal(false);
  };
  return (
    <>
      <div className="p-5">
        {/* manage bar */}
        <div className="grid grid-cols-2 justify-center ">
          <form action="">
            <div className="flex items-center p-1 w-[500px] bg-[#1E1E1E] justify-between rounded-3xl">
              <CiSearch className="text-3xl font-bold" />
              <input
                className="bg-inherit w-[100%] outline-none ml-3"
                type="text"
                placeholder="Tìm kiếm bài hát, album,..."
              />
            </div>
          </form>

          <div className="flex flex-row justify-end gap-7 pr-10 align-middle">
            <button className="h-10 w-10 rounded-full bg-[#1E1E1E] text-white">
              <BsSendPlus className="m-auto" />
            </button>
            <button
              onClick={() => handleShowDetails()}
              className="text-3xl h-10 w-10 rounded-full bg-[#1E1E1E]  text-white"
            >
              <GoPlus className="m-auto" />
            </button>

            <button className="text-xl   h-10 w-10 rounded-full bg-[#1E1E1E]  text-white">
              <TfiPencil className="m-auto" />
            </button>
            <button className=" text-xl h-10 w-10 rounded-full bg-[#1E1E1E]  text-white">
              <FaTrash className="m-auto" />
            </button>
          </div>
          <AddAlbumModal
            onClose={handleCloseAddAlbumModal}
            modalState={showAddAlbumModal}
          />
        </div>
        <h3 className="mt-3">Tong cong: {albums.length}</h3>
        <AlbumList albums={albums} />
      </div>
    </>
  );
};

const AlbumList = ({ albums }) => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const handleCardClick = (album) => {
    setSelectedAlbum(album);
  };

  const closeModal = () => {
    setSelectedAlbum(null);
  };

  return (
    <div className="min-h-screen p-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {albums.map((album) => (
        <div
          key={album.albumId}
          className="bg-[#1E1E1E]  shadow-lg  cursor-pointer h-64 flex flex-col justify-between"
          onClick={() => handleCardClick(album)}
        >
          <img
            src={album.hinhAnh}
            alt={album.tenAlbum}
            className="mb-2 h-40 aspect-square object-fit"
          />
          <div className="p-2 pt-0  flex flex-row justify-between">
            <div className="flex-1 flex flex-col">
              <h2 className="text-lg font-semibold">Hello</h2>
              <p className="text-gray-600"> 2023 </p>
              <p className="text-lg text-gray-600 inline-flex items-center gap-1">
                <FaHeart /> 123 {album.luot_yeu_thich}
              </p>
            </div>
            <div className="statusIcon flex-none text-xl ">
              {album.trang_thai === 1 ? <BiSolidLockOpen /> : <BiSolidLock />}
            </div>
          </div>
        </div>
      ))}
      {selectedAlbum && (
        <AlbumDetailModal album={selectedAlbum} onClose={closeModal} />
      )}
    </div>
  );
};

const AlbumDetailModal = ({ album, onClose }) => {

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="max-w-2xl mx-auto bg-[#1E1E1E] p-6 rounded-lg shadow-md relative ">
        <div className="flex items-center justify-center ">
          <div className="flex items-stretch gap-2">
            <img
              src={album.hinhAnh}
              alt={album.tenAlbum}
              className=" aspect-square h-40 flex-none"
            />

            <div className="album-infor flex flex-col justify-between ml-4  text-gray-400 p-2">
              <h5 className="text-sm ">
                <span>{album.status === 1 ? "Cong khai" : "An"}</span>
              </h5>
              <h5 className="text-xl text-white ">99%</h5>
              <h5 className="inline-flex items-center gap-2">
                {" "}
                2020 * 10000 <FaHeart />
              </h5>
            </div>
          </div>
        </div>
        <div className="static overflow-y-auto ">
          <AlbumSongList />
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white py-2 px-4 rounded"
        >
          {" "}
          X
        </button>
      </div>
    </div>
  );
};
const AlbumSongList = () => {
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
      id: 2,
      title: "Show Me Love asd fas  df asd fas  df asd fas  df",
      album: "99%",
      status: "Công khai",
      duration: "3:15",
    },
    {
      id: 3,
      title: "Show Me Love asd fas  df asd fas  df asd fas  df",
      album: "99%",
      status: "Công khai",
      duration: "3:15",
    },
    {
      id: 4,
      title: "Show Me Love asd fas  df  adf adsf asd fas  df asd fas  df",
      album: "99%",
      status: "Công khai",
      duration: "3:15",
    },
    {
      id: 6,
      title: "Show Me Love asd fas  df asd fas  df asd fas  df",
      album: "99%",
      status: "Công khai",
      duration: "3:15",
    },
  ];
  // useEffect(() => {
  //   fetch("datalinke").then((res) => res.json);
  // }, []);
  return (
    <div className="flex mt-8 flex-col gap-4 max-h-80 overflow-y-auto">
      {fakeSongData.map((song, index) => (
        <div
          key={song.id}
          className="flex flex-row justify-between items-center h-fit gap-4 max-w-50"
        >
          <div className="inline-flex items-center gap-4">
            <h5>{index + 1}</h5>
            <img
              src={song.imgUrl}
              alt={song.name}
              className="flex-none w-10 h-10 aspect-square"
            />
          </div>
          <p className="text-wrap max-w-80 flex-1 ">{song.title}</p>
          <p className="flex-none">{song.duration}</p>
        </div>
      ))}
    </div>
  );
};
export default ArtistAlbumPage;
