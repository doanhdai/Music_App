import ManageBar from "./components/ManageBar";
import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { FaHeart } from "react-icons/fa";
import { BiSolidLock } from "react-icons/bi";
import { BiSolidLockOpen } from "react-icons/bi";

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
      albumId: "ALBUM001",
      tenAlbum: "Album Title 1",
      ngayTao: new Date("2024-09-15T12:34:56Z"),
      hinhAnh:
        "https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg",
      luotYeuThich: 1000,
      trangThai: 1,
    },
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
      albumId: "ALBUM001",
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
  return (
    <>
      <div className="p-5">
        <ManageBar></ManageBar>
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
    <div className="p-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {albums.map((album) => (
        <div
          key={album.ma_album}
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
              <h2 className="text-lg font-semibold">Hello{album.ten_album}</h2>
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
        id: 1,
        title: "Show Me Love asd fas  df asd fas  df asd fas  df",
        album: "99%",
        status: "Công khai",
        duration: "3:15",
      },
      {
        id: 1,
        title: "Show Me Love asd fas  df asd fas  df asd fas  df",
        album: "99%",
        status: "Công khai",
        duration: "3:15",
      },
      {
        id: 1,
        title: "Show Me Love asd fas  df  adf adsf asd fas  df asd fas  df",
        album: "99%",
        status: "Công khai",
        duration: "3:15",
      },
      {
        id: 1,
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
              <h5>{index}</h5>
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

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div className="bg-[#1E1E1E] aspect-[2/3]  p-5 p rounded-lg w-200 relative">
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
                2020 * 10000 <FaHeart class />
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

export default ArtistAlbumPage;
