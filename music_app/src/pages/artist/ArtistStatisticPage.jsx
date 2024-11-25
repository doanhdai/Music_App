import DateFilter from "./components/DateFilter";

import { RiArrowDownWideFill } from "react-icons/ri";
import { BsHeadphones } from "react-icons/bs";
import { LuClock2 } from "react-icons/lu";


import React, { useState, useRef, useEffect, useContext } from 'react';
import { Button, message, Modal } from 'antd'
import { assets } from '../../assets/assets';
import { Bar, Line } from 'react-chartjs-2';
import { AdminContext } from '../../context/AdminContext';

//import * as XLSX from 'xlsx';
// Đăng ký các thành phần cần thiết
import { Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const loaithongke = [
  { index: 1, ten: "Doanh thu bài hát" },
  { index: 2, ten: "Số lượt nghe" },
  { index: 3, ten: "Tất cả" },
];

const loaithoigian = [
  { index: 1, ten: 'Tháng này' },
  { index: 2, ten: '6 tháng trước' },
  { index: 3, ten: '1 năm trước' },
  { index: 4, ten: 'Tất cả' }
];

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
  {"ngay_thong_ke":"2022-11-27 00:00:00","ma_bai_hat":"BH0002","doanh_thu":104000,"luot_nghe":2000000},
  {"ngay_thong_ke":"2022-11-28 00:00:00","ma_bai_hat":"BH0001","doanh_thu":10400,"luot_nghe":1000000},
  {"ngay_thong_ke":"2023-11-29 00:00:00","ma_bai_hat":"BH0003","doanh_thu":10300,"luot_nghe":100000000},
  {"ngay_thong_ke":"2023-11-30 00:00:00","ma_bai_hat":"BH0002","doanh_thu":102000,"luot_nghe":2000000},
    ]

let phimoiluotnghe = 500;


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



const ArtistStatistic = () => {
  const [timeFrame, setTimeFrame] = useState(1);
  const [showRevenue, setShowRevenue] = useState(true);
  const [showViews, setShowViews] = useState(true);
  
  const chartRef = useRef(null); 
  
  
  // Function to filter and prepare data based on selected time frame
  const prepareData = () => {
    const now = new Date();
    const revenueByDate = {};
    const viewsByDate = {};

    // Filter data based on the selected time frame
    incomeData.forEach((item) => {
      const date = new Date(item.ngay_thong_ke.split(" ")[0]);
      let includeData = false;

      switch (timeFrame) {
        case 1:
          if (
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
          ) {
            includeData = true;
          }
          break;
        case 2:
          if (date >= new Date(now.setMonth(now.getMonth() - 6))) {
            includeData = true;
          }
          break;
        case 3:
          if (date.getFullYear() === now.getFullYear()) {
            includeData = true;
          }
          break;
        case 4:
          includeData = true; // Include all data for the all-time option
          break;
        default:
          break;
      }

      if (includeData) {
        const dateString = date.toISOString().split("T")[0]; // Format date
        revenueByDate[dateString] =
          (revenueByDate[dateString] || 0) + item.doanh_thu;
        viewsByDate[dateString] =
          (viewsByDate[dateString] || 0) + item.luot_nghe;
      }
    });

    // Extract labels and corresponding values
    const labels = [];
    const revenues = [];
    const views = [];

    switch (timeFrame) {
      case 1:
        { const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        for (
          let day = 1;
          day <= new Date(currentYear, currentMonth + 1, 0).getDate();
          day++
        ) {
          const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(
            2,
            "0"
          )}-${String(day).padStart(2, "0")}`;
          labels.push(day);
          revenues.push(revenueByDate[dateKey] || 0);
          views.push(viewsByDate[dateKey] || 0);
        }
        break; }
      case 2:
        for (let i = 5; i >= 0; i--) {
          const monthDate = new Date(now.setMonth(now.getMonth() - i));
          const monthLabel = monthDate.toLocaleString("default", {
            month: "long",
          });
          labels.push(monthLabel);
          revenues.push(
            Object.keys(revenueByDate).reduce((acc, dateKey) => {
              const date = new Date(dateKey);
              if (
                date.getMonth() === monthDate.getMonth() &&
                date.getFullYear() === monthDate.getFullYear()
              ) {
                return acc + revenueByDate[dateKey];
              }
              return acc;
            }, 0)
          );
          views.push(
            Object.keys(viewsByDate).reduce((acc, dateKey) => {
              const date = new Date(dateKey);
              if (
                date.getMonth() === monthDate.getMonth() &&
                date.getFullYear() === monthDate.getFullYear()
              ) {
                return acc + viewsByDate[dateKey];
              }
              return acc;
            }, 0)
          );
        }
        break;
      case 3:
        for (let month = 0; month < 12; month++) {
          const monthDate = new Date(now.getFullYear(), month, 1);
          const monthLabel = monthDate.toLocaleString("default", {
            month: "long",
          });
          labels.push(monthLabel);
          revenues.push(
            Object.keys(revenueByDate).reduce((acc, dateKey) => {
              const date = new Date(dateKey);
              if (
                date.getFullYear() === now.getFullYear() &&
                date.getMonth() === month
              ) {
                return acc + revenueByDate[dateKey];
              }
              return acc;
            }, 0)
          );
          views.push(
            Object.keys(viewsByDate).reduce((acc, dateKey) => {
              const date = new Date(dateKey);
              if (
                date.getFullYear() === now.getFullYear() &&
                date.getMonth() === month
              ) {
                return acc + viewsByDate[dateKey];
              }
              return acc;
            }, 0)
          );
        }
        break;
      case 4:
        { const yearCounts = {};
        Object.keys(revenueByDate).forEach((dateKey) => {
          const date = new Date(dateKey);
          const year = date.getFullYear();
          yearCounts[year] = yearCounts[year] || { revenue: 0, views: 0 };
          yearCounts[year].revenue += revenueByDate[dateKey];
          yearCounts[year].views += viewsByDate[dateKey];
        });
        Object.keys(yearCounts).forEach((year) => {
          labels.push(year);
          revenues.push(yearCounts[year].revenue);
          views.push(yearCounts[year].views);
        });
        break; }
      default:
        break;
    }

    return { labels, revenues, views };
  };

  const { labels, revenues, views } = prepareData();

  // Chart configuration
  const chartData = {
    labels,
    datasets: [],
  };

  useEffect(() => {
    // Hủy biểu đồ cũ khi component bị unmount hoặc khi dữ liệu thay đổi
    if (chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;
      if (chartInstance) {
        chartInstance.destroy(); // Hủy biểu đồ cũ
      }
    }
  }, [chartData]);
  if (showRevenue) {
    chartData.datasets.push({
      label: "Doanh thu",
      data: revenues,
      borderColor: "rgba(75, 192, 192, 1)",
      fill: true,
    });
  }

  if (showViews) {
    chartData.datasets.push({
      label: "Lượt nghe",
      data: views,
      borderColor: "rgba(153, 102, 255, 1)",
      fill: true,
    });
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Thống kê Doanh thu và Lượt nghe - ${timeFrame}`,
      },
    },
  };
  const handleChangeLoaiThongKe = (event) => {
    const selectedIndex = +event.target.value;
    switch (selectedIndex) {
     case 1 : 
      setShowRevenue(true)
      setShowViews(false)
      break;
     case 2 : 
      setShowRevenue(false);
      setShowViews(true); 
      break;
     case 3:
      setShowRevenue(true);
      setShowViews(true); 
      break;
     default:
      break;
    }
  }
  const handleChangeThoiGian = (event) => {
    const selectedIndex = +event.target.value;
    setTimeFrame(selectedIndex);
  };
  return (
    <div className='w-full h-full bg-black p-2'>
      <div className='flex gap-4 h-[40px] mb-2'>
        <select className='bg-[#1E1E1E] pl-2 text-white rounded-3xl border-none w-fit outline-none cursor-pointer'
          onChange={handleChangeLoaiThongKe}>
          {
            loaithongke.map((item) => <option key={item.index} value={item.index}>{item.ten}</option>)
          }
        </select>
        <select className='bg-[#1E1E1E] pl-2 text-white rounded-3xl border-none w-fit outline-none cursor-pointer'
          onChange={handleChangeThoiGian}>
          {
            loaithoigian.map((item) => <option key={item.index} value={item.index}>{item.ten}</option>)
          }
        </select>
        
      </div>
      <div className='h-[80vh] overflow-y-scroll'>
        <Line data={chartData} options={options} />
      </div>

    </div>
  );
};

export default ArtistStatistic;

// const ArtistStatistic = () => {
//   let incomeData = [
// {"ngay_thong_ke":"2024-11-11 00:00:00","ma_bai_hat":"BH0003","doanh_thu":100000000,"luot_nghe":100000000},
// {"ngay_thong_ke":"2024-11-12 00:00:00","ma_bai_hat":"BH0002","doanh_thu":10100,"luot_nghe":2000000},
// {"ngay_thong_ke":"2024-11-13 00:00:00","ma_bai_hat":"BH0001","doanh_thu":10010000,"luot_nghe":1000000},
// {"ngay_thong_ke":"2024-11-14 00:00:00","ma_bai_hat":"BH0003","doanh_thu":10100,"luot_nghe":100000000},
// {"ngay_thong_ke":"2024-11-15 00:00:00","ma_bai_hat":"BH0002","doanh_thu":10010000,"luot_nghe":2000000},
// {"ngay_thong_ke":"2024-11-16 00:00:00","ma_bai_hat":"BH0001","doanh_thu":100000000,"luot_nghe":1000000},
// {"ngay_thong_ke":"2024-11-17 00:00:00","ma_bai_hat":"BH0003","doanh_thu":100100,"luot_nghe":100000000},
// {"ngay_thong_ke":"2024-11-18 00:00:00","ma_bai_hat":"BH0002","doanh_thu":100000000,"luot_nghe":2000000},
// {"ngay_thong_ke":"2024-11-19 00:00:00","ma_bai_hat":"BH0001","doanh_thu":100000000,"luot_nghe":1000000},
// {"ngay_thong_ke":"2024-11-20 00:00:00","ma_bai_hat":"BH0003","doanh_thu":1001000,"luot_nghe":100000000},
// {"ngay_thong_ke":"2024-11-21 00:00:00","ma_bai_hat":"BH0002","doanh_thu":100000000,"luot_nghe":2000000},
// {"ngay_thong_ke":"2024-11-22 00:00:00","ma_bai_hat":"BH0001","doanh_thu":101,"luot_nghe":1000000},
// {"ngay_thong_ke":"2024-11-23 00:00:00","ma_bai_hat":"BH0003","doanh_thu":100000000,"luot_nghe":100000000},
// {"ngay_thong_ke":"2024-11-24 00:00:00","ma_bai_hat":"BH0002","doanh_thu":100000000,"luot_nghe":2000000},
// {"ngay_thong_ke":"2024-11-25 00:00:00","ma_bai_hat":"BH0001","doanh_thu":10100,"luot_nghe":1000000},
// {"ngay_thong_ke":"2024-11-26 00:00:00","ma_bai_hat":"BH0003","doanh_thu":102000,"luot_nghe":100000000},
// {"ngay_thong_ke":"2024-11-27 00:00:00","ma_bai_hat":"BH0002","doanh_thu":104000,"luot_nghe":2000000},
// {"ngay_thong_ke":"2024-11-28 00:00:00","ma_bai_hat":"BH0001","doanh_thu":10400,"luot_nghe":1000000},
// {"ngay_thong_ke":"2024-11-29 00:00:00","ma_bai_hat":"BH0003","doanh_thu":10300,"luot_nghe":100000000},
// {"ngay_thong_ke":"2024-11-30 00:00:00","ma_bai_hat":"BH0002","doanh_thu":102000,"luot_nghe":2000000},
//   ]

//   const [startDay, setStartDay] = useState(getDate(0));
//   const [endDay, setEndDay] = useState(getDate(1));
// return (
//   <>
//      <span className='flex gap-2 items-center'>
//               <input
//                 className="inputDate p-1 w-fit mt-3 outline-none bg-[#A4A298] mb-2 text-black"
//                 type="date"
//                 name="startDay"
//                 value={startDay.split('/').reverse().join('-')}
//                 onChange={handleGetNewDate}
//                 onKeyDown={(event) => event.preventDefault()}
//               />
//               <span>đến</span>
//               <input
//                 className="inputDate p-1 w-fit mt-3 outline-none bg-[#A4A298] mb-2 text-black"
//                 type="date"
//                 name="endDay"
//                 value={endDay.split('/').reverse().join('-')}
//                 onChange={handleGetNewDate}
//                 onKeyDown={(event) => event.preventDefault()}

//               />
//             </span>
//   </>
// )
// }
 