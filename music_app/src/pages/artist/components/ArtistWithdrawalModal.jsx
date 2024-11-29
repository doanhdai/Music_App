import { FaXmark } from "react-icons/fa6";
import { useState } from "react";
import axios from "axios";

const API_BASE_URL = 'http://127.0.0.1:8000/api'

export const createWithdraw = async (withdrawData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/artist-slip`, withdrawData, {
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
    console.error('Error creating withdraw:', error);
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
};
const ArtistWithdrawalModal = ({ isOpen, onClose ,tongTienCoTheRut}) => {
  if (isOpen === false) return null;

  const [price, setPrice] = useState(0); // Default price
  const [selectedBank, setSelectedBank] = useState("Chọn ngân hàng");
  const [stkBank, setStkBank] = useState('');

  const account = JSON.parse(localStorage.getItem('account')) || {};
  const currentArtistId = account.ma_artist || "ACC0006";

  let formData = {
    'ma_tk_artist': currentArtistId,
    'tong_tien_rut_ra':price,
  }
  
   async function handleSubmit() {
    const response = await createWithdraw(formData);
    if (response.success){
      alert('Rút tiền thành công!');
      onClose();
    } else {
      alert('Lỗi rút tiền!');
    }
  }
  function getCurrentDate() {
    const currentDate = new Date();

    // Get day, month, and year
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are
    const year = currentDate.getFullYear();

    // Format the date as you need
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }
  function formatNumberWithCommas(number) {
    const numberString = number.toString();
    const reversedNumberString = numberString.split('').reverse().join('');
    const formattedNumberString = reversedNumberString.match(/\d{1,3}/g).join('.');
    return formattedNumberString.split('').reverse().join('');
  }
  return (
    <div className="w-full z-20 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 h-3/4 mx-auto bg-[#1E1E1E] p-6 rounded-lg shadow-md relative ">
      <form>
        <h2 className="text-2xl font-bold text-[#EB2272] text-center">Rút tiền</h2>
        <h3 className="text-gray-300 text-center">{getCurrentDate()}</h3>
        <h3 className="mt-10 text-gray-300">Chọn số tiền muốn rút</h3>
        {/* slider */}
        <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto my-5">
        <div className="mb-4 text-xl font-semibold ">
            {formatNumberWithCommas(price)} VND
          </div>
          <input
            type="range"
            min="0"
            max={tongTienCoTheRut}
            step="100000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full h-2 bg-[#A4A298]  cursor-pointer"
          />
           <div className="flex justify-between w-full mt-2">
            <span className="text-sm text-gray-300">0</span>
            <span className="text-sm text-gray-300">{formatNumberWithCommas(tongTienCoTheRut)} VNĐ</span>
          </div>
          

          {/* Display the selected price above the slider */}
        </div>
        <div className="inline-box my-10">
          <label htmlFor="bank-select" className="text-gray-300">Chọn ngân hàng</label>
          <select
            id="bank-select"
            className="rounded-md px-2 py-1 ml-3 text-white bg-black "
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
          > {
              nganHangList.map((bank, index) => (
                <option key={index} value={bank.ma}>
                  {bank.ten}
                </option>
              ))
            }      
          </select>
        </div>
        <div className="flex flex-col my-5 gap-2">
          <label className="text-gray-300">Nhập số tài khoản nhận tiền</label>
          <input
            type="text"
            className="w-full rounded-md px-4 py-0.5 text-white bg-black appearance-none"
            value={stkBank}
            required
            onChange={(e) => setStkBank(e.target.value)}
          />
        </div>
        <div className="flex mt-10 justify-center ">
          <button className="bg-[#EB2272] rounded p-2" onClick={handleSubmit}>Xác nhận</button>
        </div>
        </form>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white py-2 px-4 rounded"
        >
          <FaXmark />
        </button>
      </div>
    </div>
  );
};

export default ArtistWithdrawalModal;

const nganHangList = [
  { ma: '001', ten: 'Vietcombank', },
  { ma: '002', ten: 'Techcombank', },
  { ma: '003', ten: 'Agribank', }, 
  { ma: '004', ten: 'BIDV' },
  { ma: '005', ten: 'VietinBank' },
  { ma: '006', ten: 'TPBank' },
  { ma: '007', ten: 'HSBC' },
  { ma: '008', ten: 'ACB' }
];
{
  /* 
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


        */
}
