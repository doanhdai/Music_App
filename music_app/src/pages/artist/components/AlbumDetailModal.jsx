import { FaHeartl,FaXmark } from "react-icons"

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
          <FaXmark/>
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
export default AlbumDetailModal;

{/* Intruction how to use
  parent component

  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const handleCardClick = (album) => {
    setSelectedAlbum(album); thong tin album hien tai
  };

  const closeModal = () => {
    setSelectedAlbum(null);
  };
  
  return( ....
  <AlbumDetailModal album={selectedAlbum} onClose={closeModal} /> 
   )
  
  
   */}
  _