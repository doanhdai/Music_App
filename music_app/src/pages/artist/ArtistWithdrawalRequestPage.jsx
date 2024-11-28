import { assets } from "./assets/assets";
import { useState,useEffect } from "react";
import ArtistWithdrawalModal from "./components/ArtistWithdrawalModal";
import DateFilter from "./components/DateFilter";
import { extractDayMonthYear, getTimeHourMinute } from "../../assets/assets";

const ArtistWidthdrawalRequestPage = () => {
  const [isOpenWithdrawal, setIsOpenWithdrawal] = useState(false);
  const [withdrawalData,setWithdrawalData] = useState([]);
  const currrentArtistId ="ACC0006"
  useEffect(() =>{
    fetch('http://127.0.0.1:8000/api/artist-slip')
    .then(res => res.json())
    .then(res => res.phieuRutTien)
    .then(res => res.filter( item=> item.ma_tk_artist === currrentArtistId))
    .then(res => setWithdrawalData(res))
  },[])

  const handleOpenWithdrawal = () => {
    setIsOpenWithdrawal(true);
  };

  const handleCloseModal = () => {
    setIsOpenWithdrawal(false);
  };
  return (
    <div className="h-screen mt-8">
      <div className="ml-5 inline-flex gap-5">
        <div className="p-3 rounded-2xl bg-[#121212]">
          <h4 className="text-[#A4A298]">Số tiền đã rút:</h4>
          <span className="inline-flex text-lg mt-2">
            <img className="w-4" src={assets.goldCointStatistic} />
            <span className="ml-2 ">500,000,000 VND</span>
          </span>
        </div>
        <div className="p-3 inline-flex  gap-4 rounded-2xl bg-[#121212]">
          <div>
          <h4 className="text-[#A4A298]">Số tiền có thể rút:</h4>
          <span className="inline-flex text-lg mt-2">
            <img className="w-4" src={assets.goldCointStatistic} />
            <span className="ml-2 ">500,000,000 VND</span>
          </span>
          </div>
          <button 
          onClick={handleOpenWithdrawal}
          className="w-30 my-auto h-fit rounded-lg p-3 bg-[#EB2272]"
          >Rút tiền</button>
        </div>
        <div className="boder-white border-l-2 mx-10 my-6"></div>
        <div className="my-auto "><DateFilter /></div>
        
      </div>
      {/* xem hoa don rut */}
      <div className="mt-10">
        <div className="mt-5 bg-[#121212]">
          <div className=" py-2 mx-5 grid grid-cols-5 sm:grid-cols-[1fr_1fr_1fr_3fr_2fr_2fr] pl-2 text-center text-sm text-[#A4A298] ">
            <p>ID</p>
            <p>Ngày </p>
            <p>Thời gian</p>
            <p>Số tiền đã rút</p>
            <p>Ngân hàng</p>
            <p>Số tài khoản</p>
          </div>
          <hr className="mx-5" />
          {withdrawalData?.map( (item) =>(
            <div 
              key={item.ma_phieu}
              className="py-2 mx-5 grid grid-cols-5 sm:grid-cols-[1fr_1fr_1fr_3fr_2fr_2fr] pl-2 text-center hover:bg-[#ffffff2b]">        
              <p className="text-lg ">{item.ma_phieu}</p>
              <p className="text-lg ">{extractDayMonthYear(item.ngay_rut_tien)}</p>
              <p className="text-lg ">{getTimeHourMinute(item.ngay_rut_tien)}</p>
              <p className="text-lg ">{item.tong_tien_rut_ra}</p>
              <p className="text-lg ">{item.ten_bank}</p>
              <p className="text-lg ">102349a09</p>
            </div>
            ))}
          </div>
      </div>
      <ArtistWithdrawalModal
        isOpen={isOpenWithdrawal}
        onClose={handleCloseModal}
      />
    </div>
  );
};
export default ArtistWidthdrawalRequestPage;

