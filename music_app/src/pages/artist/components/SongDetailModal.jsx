import {  FaHeadphones, FaHeart, IoTimeSharp } from "react-icons"
import { songData2 } from "../../../assets/assets";

const SongDetailModal = ({ song, onClose }) => {
  if (!song) return null;
  const songData = songData2[1];
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div className="bg-[#1E1E1E]  p-10 p rounded-lg max-w-screen-sm shadow-lg  relative">
        <div className="flex items-center gap-10 justify-center ">
          <div className="flex items-stretch">
            <img
              // src={songData.hinh_anh}
              src="https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg"
              alt={songData.ten_bai_hat}
              className="mb-4 w-40 h-40 rounded"
            />

            <div className="flex flex-col justify-between ml-4 gap-5 text-white">
              <h5 className="text-sm text-gray-400">
                {songData.trang_thai === 1 ? "Cong khai" : "An"}
              </h5>
              <h3 className="text-lg text-wrap font-semibold">
                {songData.ten_bai_hat}
              </h3>
              <h5 className="text-sm text-gray-400">
                Ngay phat hanh:{" "}
                <span className="text-white">{songData.ngay_phat_hanh}</span>
              </h5>
              <h5 className="text-sm text-gray-400">
                Album:{" "}
                <span className="text-white">{songData.ma_album} ma album</span>
              </h5>
              <h5 className="text-sm text-gray-400">
                The loai:{" "}
                <span className="text-white">
                  99%{songData.theloa} the loai
                </span>
              </h5>
              <h5 className="text-sm text-gray-400">
                Nghe si:{" "}
                <span className="text-white">{songData.ma_artist}</span>
              </h5>
            </div>
          </div>
          <div className="flex flex-col  gap-3 justify-between w-[60] ml-2">
            <div className="flex flex-row items-center text-gray-400 gap-2">
              <FaHeart class />
              <span>11{song.luot_yeu_thich}</span>
            </div>
            <div className="flex flex-row items-center text-gray-400 gap-2">
              <FaHeadphones />
              <span>11{song.luot_nghe}</span>
            </div>
            <div className="flex flex-row items-center text-gray-400 gap-2">
              <IoTimeSharp />
              <span>3:2</span>
            </div>
          </div>
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

export default SongDetailModal

{/* 
  Intruction to use:
  chon bai hat de xem chi tiet khong co thi null
  const [selectedSong, setSelectedSong] = useState(null);

  const handleShowDetails = (song) => {
    setSelectedSong(song);
  };

  const handleCloseModal = () => {
    setSelectedSong(null);
  };

  dung component

  <SongDetailModal
        className="float-start"
        song={selectedSong} // truyen thong tin bai hat xem chi tiet
        onClose={handleCloseModal}
      />


        */}