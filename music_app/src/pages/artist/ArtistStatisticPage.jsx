import { assets } from "./assets/assets";
import { useState } from "react";
import DateFilter from "./components/DateFilter";

import { RiArrowDownWideFill } from "react-icons/ri";
import { BsHeadphones } from "react-icons/bs";
import { LuClock2 } from "react-icons/lu";
const ArtistStatisticPage = () => {
  
  const dropDownSelection = [
    { id: 1, name: "Doanh thu bài hát", component: <IncomeStatisticList /> },
    { id: 2, name: "Lượt nghe", component: <CountViewStatisticList /> },
    { id: 3, name: "Lượt yêu thích", component: <LikedStatisticList /> }
  ]

  const [isOpen,setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(dropDownSelection[0]);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className="h-screen">
      <div className="inline-flex w-full justify-center my-5">
        <div className="relative my-auto mr-5 pr-5 border-r">
        <div>
        <button
          onClick={()=>setIsOpen(!isOpen)}
          className="inline-flex text-left gap-3 justify-between w-56 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-[#1E1E1E] text-sm font-medium text-white focus:outline-none"
        >
        <span className="w-50">{selectedItem.name}</span> <RiArrowDownWideFill className="my-auto text-xl"/>
        </button>   
        </div>
        
      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-[#1E1E1E] ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {dropDownSelection.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className="block w-full text-left px-4 py-2 text-sm text-white"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
        </div>
        
        <DateFilter/>
      </div>
      <div>

      </div>
      {selectedItem.component}
    </div>
  );
};

export default ArtistStatisticPage;

const IncomeStatisticList = () => {

  return (
    <div>
      <div className="ml-5 inline-flex gap-5">
        <div className="p-3 rounded-2xl bg-[#121212]">
          <h4 className="text-[#A4A298]">Tong doanh thu:</h4>
          <span className="inline-flex text-lg mt-2">
            <img className="w-4" src={assets.goldCointStatistic} />
            <span className="ml-2 ">500,000,000 VND</span>
          </span>
        </div>
        <div className="p-3 rounded-2xl bg-[#121212]">
          <h4 className="text-[#A4A298]">Doanh thu cao nhat:</h4>
          <span className="inline-flex text-lg mt-2">
            <img className="w-4" src={assets.goldCointStatistic} />
            <span className="ml-2 ">500,000,000 VND</span>
          </span>
        </div>
        <div className="p-3 rounded-2xl bg-[#121212]">
          <h4 className="text-[#A4A298]">Doanh thu thap nhat:</h4>
          <span className="inline-flex text-lg mt-2">
            <img className="w-4" src={assets.goldCointStatistic} />
            <span className="ml-2 ">500,000,000 VND</span>
          </span>
        </div>
      </div>
      <div className="mt-5 bg-[#121212]">
        <div className=" py-2 mx-5 grid grid-cols-5 sm:grid-cols-[1fr_2fr_2fr_2fr] pl-2 text-center text-sm text-[#A4A298] ">
          <p>STT</p>
          <p>Ten bai hat</p>
          <p>Doanh thu</p>
          <p>Trang thai</p>
        </div>
        <hr className="mx-5" />

        {/* {baihat.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-5 sm:grid-cols-[1fr_2fr_2fr_2fr] py-2 mx-5 pl-2 text-white items-center hover:bg-[#ffffff2b]"
        >
        
          <p className="text-lg text-center">{index + 1}1</p>
          <p className="text-lg text-center">Sara perche</p>
          <p className="text-lg text-center">10000</p>
          <p className="text-lg text-center">
            {item.trang_thai === 1 ? "Cong khai" : "An"}
          </p>
        
        </div>
      ))} */}
        <div className="py-2 mx-5 grid grid-cols-5 sm:grid-cols-[1fr_2fr_2fr_2fr] pl-2 text-center hover:bg-[#ffffff2b]">
          <p className="text-lg ">1</p>
          <p className="text-lg ">Sara perche</p>
          <p className="text-lg ">10000</p>
          <p className="text-lg ">Công khai</p>
        </div>
      </div>
    </div>
  );
};

const CountViewStatisticList = () => {
  return (
    <div>
      <div className="ml-5 inline-flex gap-5">
        <div className="p-3 rounded-2xl bg-[#121212]">
          <h4 className="text-[#A4A298]">Tổng lượt nghe:</h4>
          <span className="inline-flex text-lg mt-2">
            <img className="w-4" src={assets.goldCointStatistic} />
            <span className="ml-2 ">500,000,000 VND</span>
          </span>
        </div>
        <div className="p-3 rounded-2xl bg-[#121212]">
          <h4 className="text-[#A4A298]">Lượt nghe cao nhất:</h4>
          <span className="inline-flex text-lg mt-2">
            <img className="w-4" src={assets.goldCointStatistic} />
            <span className="ml-2 ">500,000,000 VND</span>
          </span>
        </div>
        <div className="p-3 rounded-2xl bg-[#121212]">
          <h4 className="text-[#A4A298]">Lượt nghe thấp nhất:</h4>
          <span className="inline-flex text-lg mt-2">
            <img className="w-4" src={assets.goldCointStatistic} />
            <span className="ml-2 ">500,000,000 VND</span>
          </span>
        </div>
      </div>
      <div className="mt-5 bg-[#121212]">
        <div className=" py-2 mx-5 grid grid-cols-5 sm:grid-cols-[1fr_3fr_2fr_1fr_2fr_1fr] pl-2 text-center text-sm text-[#A4A298] ">
          <p>STT</p>
          <p>Tên bài hát</p>
          <p>Album</p>
          <p className="text-xl mx-auto"><LuClock2/></p>
          <p className="text-xl mx-auto"><BsHeadphones/></p>
          <p>Trạng thái</p>
        </div>
        <hr className="mx-5" />

        {/* {baihat.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-5 sm:grid-cols-[1fr_2fr_2fr_2fr] py-2 mx-5 pl-2 text-white items-center hover:bg-[#ffffff2b]"
        >
        
          <p className="text-lg text-center">{index + 1}1</p>
          <p className="text-lg text-center">Sara perche</p>
          <p className="text-lg text-center">10000</p>
          <p className="text-lg text-center">
            {item.trang_thai === 1 ? "Cong khai" : "An"}
          </p>
        
        </div>
      ))} */}
        <div className="py-2 mx-5 grid grid-cols-5 sm:grid-cols-[1fr_3fr_2fr_1fr_2fr_1fr] pl-2 text-center hover:bg-[#ffffff2b]">
          <p className="text-lg ">1</p>
          <p className="text-lg ">Sara perche</p>
          <p className="text-lg ">Richi</p>
          <p className="text-lg ">3:34</p>
          <p className="text-lg ">10000000</p>
          <p className="text-lg ">An</p>
        </div>
      </div>
    </div>
  );
};

const LikedStatisticList = () => {
  return (
    <div>
      <div className="ml-5 inline-flex gap-5">
        <div className="p-3 rounded-2xl bg-[#121212]">
          <h4 className="text-[#A4A298]">Tổng lượt yêu thích</h4>
          <span className="inline-flex text-lg mt-2">
            <img className="w-4" src={assets.goldCointStatistic} />
            <span className="ml-2 ">500,000,000 VND</span>
          </span>
        </div>
        <div className="p-3 rounded-2xl bg-[#121212]">
          <h4 className="text-[#A4A298]">Lượt yêu thích cao nhất</h4>
          <span className="inline-flex text-lg mt-2">
            <img className="w-4" src={assets.goldCointStatistic} />
            <span className="ml-2 ">500,000,000 VND</span>
          </span>
        </div>
        <div className="p-3 rounded-2xl bg-[#121212]">
          <h4 className="text-[#A4A298]">Lượt yêu thích thấp nhất:</h4>
          <span className="inline-flex text-lg mt-2">
            <img className="w-4" src={assets.goldCointStatistic} />
            <span className="ml-2 ">500,000,000 VND</span>
          </span>
        </div>
      </div>
      <div className="mt-5 bg-[#121212]">
        <div className=" py-2 mx-5 grid grid-cols-5 sm:grid-cols-[1fr_3fr_2fr_1fr_2fr_1fr] pl-2 text-center text-sm text-[#A4A298] ">
          <p>STT</p>
          <p>Ten bai hat</p>
          <p>Album</p>
          <p>time</p>
          <p>liked</p>
          <p>Trang thai</p>
        </div>
        <hr className="mx-5" />

        {/* {baihat.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-5 sm:grid-cols-[1fr_2fr_2fr_2fr] py-2 mx-5 pl-2 text-white items-center hover:bg-[#ffffff2b]"
        >
        
          <p className="text-lg text-center">{index + 1}1</p>
          <p className="text-lg text-center">Sara perche</p>
          <p className="text-lg text-center">10000</p>
          <p className="text-lg text-center">
            {item.trang_thai === 1 ? "Cong khai" : "An"}
          </p>
        
        </div>
      ))} */}
        <div className="py-2 mx-5 grid grid-cols-5 sm:grid-cols-[1fr_2fr_2fr_2fr] pl-2 text-center hover:bg-[#ffffff2b]">
          <p className="text-lg ">1</p>
          <p className="text-lg ">Sara perche</p>
          <p className="text-lg ">10000</p>
          <p className="text-lg ">Công khai</p>
        </div>
      </div>
    </div>
  );
};

const getDate = (type) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần +1
  const day = String(today.getDate()).padStart(2, '0');
  switch (type) {
    case 0: //ngày hôm qua
      return `${day - 1}/${month}/${year}`;
    case 1: //ngày hôm nay
      return `${day}/${month}/${year}`;
    case 2: //ngày hôm nay của tháng trước
      return `${day}/${month - 1}/${year}`;
    default:
      break;
  }

};

function getDaysOfMonth(month, year) { //Lấy mảng chứa các ngày của tháng và năm truyền vào
  const daysInMonth = new Date(year, month, 0).getDate(); // Lấy số ngày trong tháng
  const days = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');
    days.push(`${formattedDay}/${formattedMonth}/${year}`);
  }

  return days;
}

function listDaysInRange(start, end) { // lấy mảng chứa các ngày từ ngày start den end
  const days = [];

  while (start <= end) {
    const day = String(start.getDate()).padStart(2, '0');
    const month = String(start.getMonth() + 1).padStart(2, '0');
    const year = start.getFullYear();
    days.push(`${day}/${month}/${year}`);

    start.setDate(start.getDate() + 1);
  }


  return days;
}
/// incomponent
const handleChangeLoaiThongKe = (event) => {
  const selectedIndex = +event.target.value;
  setIndexLoai(selectedIndex);
}
const handleChangeThoiGian = (event) => {
  const selectedIndex = +event.target.value;
  setIndexThoiGian(selectedIndex);
};

const handleGetNewDate = (event) => {
  const { name, value } = event.target;

  if (name === 'startDay') {
    const start = new Date(value.split("/").reverse().join("-"));
    const end = new Date(endDay.split("/").reverse().join("-"));

    if (start >= end) {
      alert('Khoảng ngày không hợp lệ. Ngày bắt đầu phải bé hơn ngày kết thúc!');

    } else {
      const timeDifference = end - start;

      // Chuyển sự chênh lệch từ milliseconds sang ngày
      const daysDifference = timeDifference / (1000 * 3600 * 24);

      if (daysDifference <= 32)
        setStartDay(value);
      else
        alert('Ngày bắt đầu và ngày kết thúc chênh lệch không quá 32 ngày!');
    }

  } else if (name === 'endDay') {
    const start = new Date(startDay.split("/").reverse().join("-"));
    const end = new Date(value.split("/").reverse().join("-"));

    if (start >= end) {
      alert('Khoảng ngày không hợp lệ. Ngày bắt đầu phải bé hơn ngày kết thúc!');

    } else {
      const timeDifference = end - start;

      // Chuyển sự chênh lệch từ milliseconds sang ngày
      const daysDifference = timeDifference / (1000 * 3600 * 24);

      if (daysDifference <= 32)
        setEndDay(value);
      else
        alert('Ngày bắt đầu và ngày kết thúc chênh lệch không quá 32 ngày!');
    }

  }
}

/*
<span className='flex gap-2 items-center'>
              <input
                className="inputDate p-1 w-fit mt-3 outline-none bg-[#A4A298] mb-2 text-black"
                type="date"
                name="startDay"
                value={startDay.split('/').reverse().join('-')}
                onChange={handleGetNewDate}
                onKeyDown={(event) => event.preventDefault()}
              />
              <span>đến</span>
              <input
                className="inputDate p-1 w-fit mt-3 outline-none bg-[#A4A298] mb-2 text-black"
                type="date"
                name="endDay"
                value={endDay.split('/').reverse().join('-')}
                onChange={handleGetNewDate}
                onKeyDown={(event) => event.preventDefault()}

              />
            </span>
            const IncomeStatistic = () => {
  let incomeData = [
    {"ngay_thong_ke":"2024-11-11 00:00:00","ma_bai_hat":"BH0003","doanh_thu":100000000,"luot_nghe":100000000},
{"ngay_thong_ke":"2024-11-12 00:00:00","ma_bai_hat":"BH0002","doanh_thu":10100,"luot_nghe":2000000},
{"ngay_thong_ke":"2024-11-13 00:00:00","ma_bai_hat":"BH0001","doanh_thu":10010000,"luot_nghe":1000000},
{"ngay_thong_ke":"2024-11-14 00:00:00","ma_bai_hat":"BH0003","doanh_thu":10100,"luot_nghe":100000000},
{"ngay_thong_ke":"2024-11-15 00:00:00","ma_bai_hat":"BH0002","doanh_thu":10010000,"luot_nghe":2000000},
{"ngay_thong_ke":"2024-11-16 00:00:00","ma_bai_hat":"BH0001","doanh_thu":100000000,"luot_nghe":1000000},
{"ngay_thong_ke":"2024-11-17 00:00:00","ma_bai_hat":"BH0003","doanh_thu":100100,"luot_nghe":100000000},
{"ngay_thong_ke":"2024-11-18 00:00:00","ma_bai_hat":"BH0002","doanh_thu":100000000,"luot_nghe":2000000},
{"ngay_thong_ke":"2024-11-19 00:00:00","ma_bai_hat":"BH0001","doanh_thu":100000000,"luot_nghe":1000000},
{"ngay_thong_ke":"2024-11-20 00:00:00","ma_bai_hat":"BH0003","doanh_thu":1001000,"luot_nghe":100000000},
{"ngay_thong_ke":"2024-11-21 00:00:00","ma_bai_hat":"BH0002","doanh_thu":100000000,"luot_nghe":2000000},
{"ngay_thong_ke":"2024-11-22 00:00:00","ma_bai_hat":"BH0001","doanh_thu":101,"luot_nghe":1000000},
{"ngay_thong_ke":"2024-11-23 00:00:00","ma_bai_hat":"BH0003","doanh_thu":100000000,"luot_nghe":100000000},
{"ngay_thong_ke":"2024-11-24 00:00:00","ma_bai_hat":"BH0002","doanh_thu":100000000,"luot_nghe":2000000},
{"ngay_thong_ke":"2024-11-25 00:00:00","ma_bai_hat":"BH0001","doanh_thu":10100,"luot_nghe":1000000},
{"ngay_thong_ke":"2024-11-26 00:00:00","ma_bai_hat":"BH0003","doanh_thu":102000,"luot_nghe":100000000},
{"ngay_thong_ke":"2024-11-27 00:00:00","ma_bai_hat":"BH0002","doanh_thu":104000,"luot_nghe":2000000},
{"ngay_thong_ke":"2024-11-28 00:00:00","ma_bai_hat":"BH0001","doanh_thu":10400,"luot_nghe":1000000},
{"ngay_thong_ke":"2024-11-29 00:00:00","ma_bai_hat":"BH0003","doanh_thu":10300,"luot_nghe":100000000},
{"ngay_thong_ke":"2024-11-30 00:00:00","ma_bai_hat":"BH0002","doanh_thu":102000,"luot_nghe":2000000},
  ]

  const [startDay, setStartDay] = useState(getDate(0));
  const [endDay, setEndDay] = useState(getDate(1));
return (
  <>
     <span className='flex gap-2 items-center'>
              <input
                className="inputDate p-1 w-fit mt-3 outline-none bg-[#A4A298] mb-2 text-black"
                type="date"
                name="startDay"
                value={startDay.split('/').reverse().join('-')}
                onChange={handleGetNewDate}
                onKeyDown={(event) => event.preventDefault()}
              />
              <span>đến</span>
              <input
                className="inputDate p-1 w-fit mt-3 outline-none bg-[#A4A298] mb-2 text-black"
                type="date"
                name="endDay"
                value={endDay.split('/').reverse().join('-')}
                onChange={handleGetNewDate}
                onKeyDown={(event) => event.preventDefault()}

              />
            </span>
  </>
)
}
 */