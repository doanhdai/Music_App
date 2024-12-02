import { assets } from "./assets/assets";
import { useState, useEffect } from "react";
import ArtistWithdrawalModal from "./components/ArtistWithdrawalModal";
import DateFilter from "./components/DateFilter";
import { extractDayMonthYear, getTimeHourMinute } from "../../assets/assets";

const ArtistWidthdrawalRequestPage = () => {
  const [isOpenWithdrawal, setIsOpenWithdrawal] = useState(false);
  const [withdrawalData, setWithdrawalData] = useState([]);
  const [songStatistic, setSongStatistic] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData,setFilteredData] = useState(null);
  const account = JSON.parse(localStorage.getItem("account")) || {};
  const currentArtistId = account.ma_tk ;
 

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/artist-slip")
      .then((res) => res.json())
      .then((res) => res.phieuRutTien)
      .then((res) =>
        res.filter((item) => item.ma_tk_artist === currentArtistId)
      )
      .then((res) =>{
        setWithdrawalData(res.reverse())
        setFilteredData(res)
       } );
    
    fetch(`http://127.0.0.1:8000/api/song/admin/statistic/${currentArtistId}`)
      .then((res) => res.json())
      .then((res) => setSongStatistic(res.data) );
  }, []);

  let tongTienDaRut = withdrawalData.reduce(
    (sum, item) => sum + Number(item.tong_tien_rut_ra),  0);
  // Remove leading zeros

  const tongTienCoTheRut = songStatistic.reduce((sum,item) => sum + Number(item.doanh_thu), 0) - tongTienDaRut;

  const handleOpenWithdrawal = () => {
    setIsOpenWithdrawal(true);
  };

  const handleCloseModal = () => {
    setIsOpenWithdrawal(false);
  };
  function formatNumberWithCommas(number) {
    const numberString = number.toString();
    const reversedNumberString = numberString.split("").reverse()?.join("");
    const formattedNumberString = reversedNumberString
      .match(/\d{1,3}/g)
      ?.join(".");
    return formattedNumberString?.split("").reverse()?.join("");
  }
  function filterByDateRange(data, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return data.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= start && itemDate <= end;
    });
  }
  
  function handleFilterClick() {
    console.log(startDate, endDate);
    if (startDate ==null || endDate == null) {
      setFilteredData(withdrawalData);
    } else {
      const results = filterByDateRange(withdrawalData,startDate,endDate);
      setFilteredData(results);
      setEndDate(null)
      
    }
    
}
  return (
    <div className="h-screen mt-8 overflow-y-scroll">
      <div className="ml-5 inline-flex gap-5">
        <div className="p-3 rounded-2xl bg-[#121212]">
          <h4 className="text-[#A4A298]">Số tiền đã rút:</h4>
          <span className="inline-flex text-lg mt-2">
            <img className="w-4" src={assets.goldCointStatistic} />
            <span className="ml-2 ">
              {" "}
              {formatNumberWithCommas(tongTienDaRut)} VND
            </span>
          </span>
        </div>
        <div className="p-3 inline-flex  gap-4 rounded-2xl bg-[#121212]">
          <div>
            <h4 className="text-[#A4A298]">Số tiền có thể rút:</h4>
            <span className="inline-flex text-lg mt-2">
              <img className="w-4" src={assets.goldCointStatistic} />
              <span className="ml-2 ">
                {formatNumberWithCommas(tongTienCoTheRut)} VND
              </span>
            </span>
          </div>
          <button
            onClick={handleOpenWithdrawal}
            className="w-30 my-auto h-fit rounded-lg p-3 bg-[#EB2272]"
          >
            Rút tiền
          </button>
        </div>
        <div className="boder-white border-l-2 mx-10 my-6"></div>
        <div className="my-auto ">
          <div className="inline-flex py-auto gap-x-5  mr-auto rounded-xl shadow-md text-nowrap text-center ">
            <h2 className="  my-auto text-[#A4A298] ">Tìm kiếm </h2>
            <input
              type="date"
              placeholder="dd-mm-yyyy"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="text-black px-2  w-full border border-gray-300  shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />

            <label className="text-sm  my-auto font-medium text-[#A4A298]">
              đến
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className=" w-full px-2 text-black border border-gray-300  shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
        <button
          className="w-30 my-auto h-fit rounded-lg p-3 bg-[#EB2272] "
          onClick={handleFilterClick}
        >
          Tìm kiếm
        </button>
      </div>
      {/* xem hoa don rut */}
      <div className="mt-10">
        <div className="mt-5 bg-[#121212] ">
          <div className=" py-2 mx-5 grid grid-cols-5 sm:grid-cols-[1fr_1fr_1fr_3fr_2fr_2fr] pl-2 text-center text-sm text-[#A4A298] ">
            <p>ID</p>
            <p>Ngày </p>
            <p>Thời gian</p>
            <p>Số tiền đã rút</p>
            <p>Ngân hàng</p>
            <p>Số tài khoản</p>
          </div>
          <hr className="mx-5" />
          {filteredData
            ? filteredData.map((item) => (
                <div
                  key={item.ma_phieu}
                  className="py-2 mx-5 grid grid-cols-5 sm:grid-cols-[1fr_1fr_1fr_3fr_2fr_2fr] pl-2 text-center hover:bg-[#ffffff2b]"
                >
                  <p className="text-lg ">{item.ma_phieu}</p>
                  <p className="text-lg ">
                    {extractDayMonthYear(item.ngay_rut_tien)}
                  </p>
                  <p className="text-lg ">
                    {getTimeHourMinute(item.ngay_rut_tien)}
                  </p>
                  <p className="text-lg ">
                    {formatNumberWithCommas(Number(item.tong_tien_rut_ra)) }
                  </p>
                  <p className="text-lg ">{item.bank_name}</p>
                  <p className="text-lg ">{item.bank_id}</p>
                </div>
              ))
            : ""}
        </div>
      </div>
      <ArtistWithdrawalModal
        isOpen={isOpenWithdrawal}
        onClose={handleCloseModal}
        tongTienCoTheRut={tongTienCoTheRut}
      />
    </div>
  );
};
export default ArtistWidthdrawalRequestPage;
