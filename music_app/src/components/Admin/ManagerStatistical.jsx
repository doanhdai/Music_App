import React, { useState, useRef, useEffect, useContext } from 'react';
import { Button, message, Modal } from 'antd'
import { assets } from '../../assets/assets';
import { Bar, Line } from 'react-chartjs-2';
import { AdminContext } from '../../context/AdminContext';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import * as XLSX from 'xlsx';
// Đăng ký các thành phần cần thiết
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
const loaithongke = [
  { index: 1, ten: "Doanh thu từ quảng cáo" },
  { index: 2, ten: "Doanh thu từ gói Premium" },
  { index: 3, ten: "Chi phí trả cho nghệ sĩ" }
];

const loaithoigian = [
  { index: 1, ten: 'Hôm nay' },
  { index: 2, ten: 'Hôm qua' },
  { index: 3, ten: 'Tháng trước' },
  { index: 4, ten: 'Chọn thời gian khác' }
];

let dangkyPremium = [
  { ma_tk: 1, ma_goi: 'GOI0001', ngay_dang_ky: '11-11-2024 18:00:33', ngay_het_han: '11-11-2024 18:00:33', tong_tien_thanh_toan: 20000 },
  { ma_tk: 2, ma_goi: 'GOI0002', ngay_dang_ky: '11-11-2024 18:00:33', ngay_het_han: '11-11-2024 18:00:33', tong_tien_thanh_toan: 10000 },
  { ma_tk: 3, ma_goi: 'GOI0003', ngay_dang_ky: '11-11-2024 18:00:33', ngay_het_han: '11-11-2024 18:00:33', tong_tien_thanh_toan: 23000 },
  { ma_tk: 4, ma_goi: 'GOI0003', ngay_dang_ky: '11-11-2024 18:00:33', ngay_het_han: '11-11-2024 18:00:33', tong_tien_thanh_toan: 13000 },
  { ma_tk: 5, ma_goi: 'GOI0002', ngay_dang_ky: '11-11-2024 18:00:33', ngay_het_han: '11-11-2024 18:00:33', tong_tien_thanh_toan: 23000 },
  { ma_tk: 2, ma_goi: 'GOI0001', ngay_dang_ky: '11-11-2024 18:00:33', ngay_het_han: '11-11-2024 18:00:33', tong_tien_thanh_toan: 12000 },
  { ma_tk: 4, ma_goi: 'GOI0003', ngay_dang_ky: '11-11-2024 18:00:33', ngay_het_han: '11-11-2024 18:00:33', tong_tien_thanh_toan: 10000 },
  { ma_tk: 3, ma_goi: 'GOI0002', ngay_dang_ky: '11-11-2024 18:00:33', ngay_het_han: '11-11-2024 18:00:33', tong_tien_thanh_toan: 24000 },
  { ma_tk: 5, ma_goi: 'GOI0001', ngay_dang_ky: '11-11-2024 18:00:33', ngay_het_han: '11-11-2024 18:00:33', tong_tien_thanh_toan: 22000 },
  { ma_tk: 5, ma_goi: 'GOI0002', ngay_dang_ky: '11-11-2024 18:00:33', ngay_het_han: '11-11-2024 18:00:33', tong_tien_thanh_toan: 13000 },
  { ma_tk: 6, ma_goi: 'GOI0001', ngay_dang_ky: '11-11-2024 18:00:33', ngay_het_han: '11-11-2024 18:00:33', tong_tien_thanh_toan: 14000 },
  { ma_tk: 7, ma_goi: 'GOI0003', ngay_dang_ky: '10-11-2024 18:00:33', ngay_het_han: '11-11-2024 18:00:33', tong_tien_thanh_toan: 21000 },
  { ma_tk: 8, ma_goi: 'GOI0002', ngay_dang_ky: '10-11-2024 18:00:33', ngay_het_han: '11-11-2024 18:00:33', tong_tien_thanh_toan: 20000 },
  { ma_tk: 9, ma_goi: 'GOI0001', ngay_dang_ky: '10-11-2024 18:00:33', ngay_het_han: '11-11-2024 18:00:33', tong_tien_thanh_toan: 19000 }
]

let premiumList = [
  { ma_goi: 1, ten_goi: 'goi 1', thoi_han: 2, gia_goi: 15000, doanh_thu: 1500000, mo_ta: 'abc', trang_thai: 0 },
  { ma_goi: 2, ten_goi: 'goi 2', thoi_han: 2, gia_goi: 15000, doanh_thu: 1500000, mo_ta: 'abc', trang_thai: 1 },
  { ma_goi: 3, ten_goi: 'goi 3', thoi_han: 2, gia_goi: 15000, doanh_thu: 1500000, mo_ta: 'abc', trang_thai: 0 },
  { ma_goi: 4, ten_goi: 'goi 4', thoi_han: 2, gia_goi: 15000, doanh_thu: 1500000, mo_ta: 'abc', trang_thai: 0 },
  { ma_goi: 5, ten_goi: 'goi 5', thoi_han: 2, gia_goi: 15000, doanh_thu: 1500000, mo_ta: 'abc', trang_thai: 1 },
  { ma_goi: 6, ten_goi: 'goi 6', thoi_han: 2, gia_goi: 15000, doanh_thu: 1500000, mo_ta: 'abc', trang_thai: 0 }
]
let contractsData = [
  { ma_hop_dong: 1, ma_quang_cao: 1, luot_phat: 211, doanh_thu: 10000000, ngay_hieu_luc: '23/10/2023 18:00:33', ngay_hoan_thanh: '11-10-2024 18:00:33' },
  { ma_hop_dong: 2, ma_quang_cao: 2, luot_phat: 231, doanh_thu: 10440000, ngay_hieu_luc: '23/10/2023 18:00:33', ngay_hoan_thanh: '11-10-2024 18:00:33' },
  { ma_hop_dong: 3, ma_quang_cao: 3, luot_phat: 111, doanh_thu: 4500000, ngay_hieu_luc: '23/10/2023 18:00:33', ngay_hoan_thanh: '11-10-2024 18:00:33' },
  { ma_hop_dong: 4, ma_quang_cao: 4, luot_phat: 209, doanh_thu: 9000000, ngay_hieu_luc: '23/10/2023 18:00:33', ngay_hoan_thanh: '11-10-2024 18:00:33' },
  { ma_hop_dong: 5, ma_quang_cao: 1, luot_phat: 230, doanh_thu: 10500000, ngay_hieu_luc: '23/12/2023 18:00:33', ngay_hoan_thanh: '11-10-2024 18:00:33' },
  { ma_hop_dong: 6, ma_quang_cao: 3, luot_phat: 146, doanh_thu: 5400000, ngay_hieu_luc: '23/11/2023 18:00:33', ngay_hoan_thanh: '11-10-2024 18:00:33' },
  { ma_hop_dong: 7, ma_quang_cao: 4, luot_phat: 189, doanh_thu: 70000000, ngay_hieu_luc: '09/09/2023 18:00:33', ngay_hoan_thanh: '11-10-2024 18:00:33' },
  { ma_hop_dong: 7, ma_quang_cao: 1, luot_phat: 189, doanh_thu: 70000000, ngay_hieu_luc: '12/11/2024 18:00:33', ngay_hoan_thanh: '11-10-2024 18:00:33' },
  { ma_hop_dong: 7, ma_quang_cao: 2, luot_phat: 189, doanh_thu: 70000000, ngay_hieu_luc: '12/11/2024 18:00:33', ngay_hoan_thanh: '11-10-2024 18:00:33' },
  { ma_hop_dong: 7, ma_quang_cao: 3, luot_phat: 189, doanh_thu: 70000000, ngay_hieu_luc: '12/11/2024 18:00:33', ngay_hoan_thanh: '11-10-2024 18:00:33' },
  { ma_hop_dong: 7, ma_quang_cao: 4, luot_phat: 189, doanh_thu: 70000000, ngay_hieu_luc: '12/11/2024 18:00:33', ngay_hoan_thanh: '11-10-2024 18:00:33' },
  { ma_hop_dong: 7, ma_quang_cao: 2, luot_phat: 189, doanh_thu: 70000000, ngay_hieu_luc: '12/11/2024 18:00:33', ngay_hoan_thanh: '11-10-2024 18:00:33' },
  { ma_hop_dong: 7, ma_quang_cao: 2, luot_phat: 189, doanh_thu: 70000000, ngay_hieu_luc: '12/11/2024 18:00:33', ngay_hoan_thanh: '11-10-2024 18:00:33' },
  { ma_hop_dong: 7, ma_quang_cao: 1, luot_phat: 189, doanh_thu: 70000000, ngay_hieu_luc: '12/11/2024 18:00:33', ngay_hoan_thanh: '11-10-2024 18:00:33' },
  { ma_hop_dong: 7, ma_quang_cao: 4, luot_phat: 189, doanh_thu: 50000000, ngay_hieu_luc: '11/11/2024 18:00:33', ngay_hoan_thanh: '11-10-2024 18:00:33' },
  { ma_hop_dong: 7, ma_quang_cao: 3, luot_phat: 189, doanh_thu: 50000000, ngay_hieu_luc: '11/11/2024 18:00:33', ngay_hoan_thanh: '11-10-2024 18:00:33' },
  { ma_hop_dong: 7, ma_quang_cao: 3, luot_phat: 189, doanh_thu: 50000000, ngay_hieu_luc: '11/11/2024 18:00:33', ngay_hoan_thanh: '11-10-2024 18:00:33' },
  { ma_hop_dong: 7, ma_quang_cao: 2, luot_phat: 189, doanh_thu: 50000000, ngay_hieu_luc: '11/10/2024 18:00:33', ngay_hoan_thanh: '11-11-2024 18:00:33' },
  { ma_hop_dong: 7, ma_quang_cao: 1, luot_phat: 189, doanh_thu: 50000000, ngay_hieu_luc: '11/10/2024 18:00:33', ngay_hoan_thanh: '11-11-2024 18:00:33' },
  { ma_hop_dong: 7, ma_quang_cao: 2, luot_phat: 189, doanh_thu: 50000000, ngay_hieu_luc: '12/10/2024 18:00:33', ngay_hoan_thanh: '11-11-2024 18:00:33' },
  { ma_hop_dong: 7, ma_quang_cao: 3, luot_phat: 189, doanh_thu: 50000000, ngay_hieu_luc: '12/10/2024 18:00:33', ngay_hoan_thanh: '11-11-2024 18:00:33' },
  { ma_hop_dong: 7, ma_quang_cao: 4, luot_phat: 189, doanh_thu: 50000000, ngay_hieu_luc: '14/10/2024 18:00:33', ngay_hoan_thanh: '10-10-2024 18:00:33' }
]

let quangcaoList = [
  { ma_quang_cao: 1, ten_quang_cao: 'Chạy ngay đi vừa ra mắt! Nghe thử ngay!', ngay_tao: '23/10/2001', ma_nqc: 'NQC1', hinh_anh: assets.mck },
  { ma_quang_cao: 2, ten_quang_cao: 'Nghe bài hát mới của Sơn Tùng MTP', ngay_tao: '05/02/1998', ma_nqc: 'NQC1', hinh_anh: assets.mck },
  { ma_quang_cao: 3, ten_quang_cao: 'Rap Việt vừa ra mắt! Xem ngay trên trang youtube: Đông Tây Promotion', ngay_tao: '02/01/1996', ma_nqc: 'NQC2', hinh_anh: assets.mck },
  { ma_quang_cao: 4, ten_quang_cao: 'Mộng Yu cùng AMEE! Nghe Mộng Yu ngay!', ngay_tao: '22/07/1990', ma_nqc: 'NQC3', hinh_anh: assets.mck }
]

let phieuruttien = [
  { ma_phieu: 1, ma_tk_artist: 1, ngay_rut_tien: '10-11-2024 18:00:33', tong_tien_rut_ra: 12500000, bank_id: '090912344452', bank_name: 'Agribank' },
  { ma_phieu: 1, ma_tk_artist: 2, ngay_rut_tien: '10-11-2024 18:00:33', tong_tien_rut_ra: 12500000, bank_id: '090912344452', bank_name: 'VCB' },
  { ma_phieu: 1, ma_tk_artist: 3, ngay_rut_tien: '10-11-2024 18:00:33', tong_tien_rut_ra: 12500000, bank_id: '090912344452', bank_name: 'MB' },
  { ma_phieu: 1, ma_tk_artist: 4, ngay_rut_tien: '10-11-2024 18:00:33', tong_tien_rut_ra: 12500000, bank_id: '090912344452', bank_name: 'Sacombank' },
  { ma_phieu: 1, ma_tk_artist: 5, ngay_rut_tien: '10-11-2024 18:00:33', tong_tien_rut_ra: 12500000, bank_id: '090912344452', bank_name: 'Agribank' },
  { ma_phieu: 1, ma_tk_artist: 2, ngay_rut_tien: '10-11-2024 18:00:33', tong_tien_rut_ra: 12500000, bank_id: '090912344452', bank_name: 'VPBank' },
  { ma_phieu: 1, ma_tk_artist: 1, ngay_rut_tien: '10-11-2024 18:00:33', tong_tien_rut_ra: 12500000, bank_id: '090912344452', bank_name: 'MB' },
  { ma_phieu: 1, ma_tk_artist: 3, ngay_rut_tien: '10-11-2024 18:00:33', tong_tien_rut_ra: 12500000, bank_id: '090912344452', bank_name: 'Sacombank' },
  { ma_phieu: 1, ma_tk_artist: 4, ngay_rut_tien: '10-11-2024 18:00:33', tong_tien_rut_ra: 12500000, bank_id: '090912344452', bank_name: 'Agribank' },
  { ma_phieu: 1, ma_tk_artist: 4, ngay_rut_tien: '10-11-2024 18:00:33', tong_tien_rut_ra: 12500000, bank_id: '090912344452', bank_name: 'Agribank' },
  { ma_phieu: 1, ma_tk_artist: 4, ngay_rut_tien: '10-11-2024 18:00:33', tong_tien_rut_ra: 12500000, bank_id: '090912344452', bank_name: 'Agribank' }
]

let phimoiluotnghe = 500;

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



const ManagerStatistical = () => {
  const { contractsData, formatDate, premiumList } = useContext(AdminContext);
  const [indexThoiGianSelected, setIndexThoiGian] = useState(1);
  const [indexLoaiSelected, setIndexLoai] = useState(1);
  const [startDay, setStartDay] = useState(getDate(0));
  const [endDay, setEndDay] = useState(getDate(1));
  const [chartData, setChartData] = useState(data());
  const [isUpdatePhi, setIsUpdatePhi] = useState(false);
  const [valueUpdate, setValueUpdate] = useState('');
  const [dayClicked, setDayClicked] = useState('');


  const chartRef = useRef(null); // Tham chiếu đến canvas

  function data() {// hàm này lấy ra data cho component Bar - dùng để vẽ biểu đồ
    let newData;
    let labels = [];
    let value = [];
    switch (indexLoaiSelected) {
      case 1:
        switch (indexThoiGianSelected) {
          case 1: {
            let day = getDate(1);
            labels.push(day);
            const total = contractsData.reduce((sum, item) => {
              return formatDate(item.ngay_hoan_thanh) == day ? sum + item.doanh_thu : sum;
            }, 0);
            value.push(Math.trunc(total));
            break;
          }
          case 2: {
            let day = getDate(0);
            labels.push(day);
            const total = contractsData.reduce((sum, item) => {
              return formatDate(item.ngay_hoan_thanh) == day ? sum + item.doanh_thu : sum;
            }, 0);
            value.push(Math.trunc(total));
            break;
          }
          case 3: {
            let day = getDate(2).split("/");
            labels = getDaysOfMonth(day[1], day[2]);
            labels.forEach((d) => {
              const total = contractsData.reduce((sum, item) => {
                return formatDate(item.ngay_hoan_thanh) == d ? sum + item.doanh_thu : sum;
              }, 0);
              value.push(Math.trunc(total));
            })
            break;
          }
          case 4: {
            const start = new Date(startDay.split("/").reverse().join("-"));
            const end = new Date(endDay.split("/").reverse().join("-"));

            labels = listDaysInRange(start, end);
            if (labels.length != 0) {
              labels.forEach((d) => {
                const total = contractsData.reduce((sum, item) => {
                  return formatDate(item.ngay_hoan_thanh) == d ? sum + item.doanh_thu : sum;
                }, 0);
                value.push(Math.trunc(total));
              })

              break;
            }



          }

        }
        break;
      case 2:
        switch (indexThoiGianSelected) {
          case 1: {
            let day = getDate(1);
            labels.push(day);
            const total = dangkyPremium.reduce((sum, item) => {
              return formatDate(item.ngay_dang_ky) == day ? sum + item.tong_tien_thanh_toan : sum;
            }, 0);
            value.push(total);
            break;
          }
          case 2: {
            let day = getDate(0);
            labels.push(day);
            const total = dangkyPremium.reduce((sum, item) => {
              return formatDate(item.ngay_dang_ky) == day ? sum + item.tong_tien_thanh_toan : sum;
            }, 0);
            value.push(total);
            break;
          }
          case 3: {
            let day = getDate(2).split("/");
            labels = getDaysOfMonth(day[1], day[2]);
            labels.forEach((d) => {
              const total = dangkyPremium.reduce((sum, item) => {
                return formatDate(item.ngay_dang_ky) == d ? sum + item.tong_tien_thanh_toan : sum;
              }, 0);
              value.push(total);
            })
            break;
          }
          case 4: {
            const start = new Date(startDay.split("/").reverse().join("-"));
            const end = new Date(endDay.split("/").reverse().join("-"));

            labels = listDaysInRange(start, end);
            if (labels.length != 0) {
              labels.forEach((d) => {
                const total = dangkyPremium.reduce((sum, item) => {
                  return formatDate(item.ngay_dang_ky) == d ? sum + item.tong_tien_thanh_toan : sum;
                }, 0);
                value.push(total);
              })

              break;
            }



          }
        }
        break;
      case 3:
        switch (indexThoiGianSelected) {
          case 1: {
            let day = getDate(1);
            labels.push(day);
            const total = phieuruttien.reduce((sum, item) => {
              return formatDate(item.ngay_rut_tien) == day ? sum + item.tong_tien_rut_ra : sum;
            }, 0);
            value.push(total);
            break;
          }
          case 2: {
            let day = getDate(0);
            labels.push(day);
            const total = phieuruttien.reduce((sum, item) => {
              return formatDate(item.ngay_rut_tien) == day ? sum + item.tong_tien_rut_ra : sum;
            }, 0);
            value.push(total);
            break;
          }
          case 3: {
            let day = getDate(2).split("/");
            labels = getDaysOfMonth(day[1], day[2]);
            labels.forEach((d) => {
              const total = phieuruttien.reduce((sum, item) => {
                return formatDate(item.ngay_rut_tien) == d ? sum + item.tong_tien_rut_ra : sum;
              }, 0);
              value.push(total);
            })
            break;
          }
          case 4: {
            const start = new Date(startDay.split("/").reverse().join("-"));
            const end = new Date(endDay.split("/").reverse().join("-"));

            labels = listDaysInRange(start, end);
            if (labels.length != 0) {
              labels.forEach((d) => {
                const total = phieuruttien.reduce((sum, item) => {
                  return formatDate(item.ngay_rut_tien) == d ? sum + item.tong_tien_rut_ra : sum;
                }, 0);
                value.push(total);
              })

              break;
            }



          }
        }
        break;
    }
    return {
      labels: labels,
      datasets: [{ label: loaithongke[indexLoaiSelected - 1].ten, data: value, borderColor: '#FF6384', backgroundColor: '#FFB1C1', }]
    };

  }

  useEffect(() => {
    // Hủy biểu đồ cũ khi component bị unmount hoặc khi dữ liệu thay đổi
    if (chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;
      if (chartInstance) {
        chartInstance.destroy(); // Hủy biểu đồ cũ
      }
    }
  }, [chartData]); // Chạy lại khi dữ liệu biểu đồ thay đổi

  const ItemDoanhThuQuangCao = () => {
    let day = dayClicked;
    const filter = contractsData.filter(item => formatDate(item.ngay_hoan_thanh) === day); // Lọc hợp đồng theo ngày
    return (
      <>
        <div className='grid grid-cols-5 w-full border-y text-center mt-2 py-2'>
          <div className=''>Mã hợp đồng</div>
          <div className='col-span-3'>Tên quảng cáo</div>
          <div>Doanh thu</div>
        </div>
        {filter.map((item, index) => {
          const quangcao = contractsData.find(qc => qc.ma_quang_cao === item.ma_quang_cao);
          return quangcao ? (
            <div key={index} className='grid grid-cols-5 w-full text-[#A4A298] text-center' >
              <div className=''>{item.ma_hop_dong}</div>
              <div className='col-span-3'>{quangcao.ten_quang_cao}</div>
              <div>{Math.trunc(item.doanh_thu)}</div>
            </div>
          ) : null;
        })}
      </>
    );
  };

  const ItemDoanhThuPremium = () => {
    let day = dayClicked;
    // Lọc các đăng ký theo ngày được chọn
    const filter = dangkyPremium.filter(item => formatDate(item.ngay_dang_ky) === day);

    const magoi_doanhthu = []; // Mảng lưu doanh thu từng gói
    filter.forEach((item) => {
      const goi = magoi_doanhthu.find(i => i.ma_goi === item.ma_goi); // Tìm gói trong mảng
      if (goi) {
        // Nếu gói đã tồn tại, cộng thêm doanh thu
        goi.doanh_thu += item.tong_tien_thanh_toan;
      } else {
        // Nếu chưa tồn tại, thêm gói mới
        const goiPre = premiumList.find(i => i.ma_goi === item.ma_goi);
        magoi_doanhthu.push({ ma_goi: item.ma_goi, ten_goi: goiPre.ten_goi, doanh_thu: item.tong_tien_thanh_toan, trang_thai: goiPre.trang_thai });
      }
    });
    return (
      <>
        <div className='grid grid-cols-6 w-full border-y text-center mt-2 py-2'>
          <div className=''>Mã gói</div>
          <div className='col-span-3'>Tên gói Premium</div>
          <div>Doanh thu</div>
          <div>Tình trạng</div>
        </div>
        {magoi_doanhthu.map((item) => (
          <div key={item.ma_goi} className='grid grid-cols-6 w-full text-[#A4A298] text-center' >
            <div className=''>{item.ma_goi}</div>
            <div className='col-span-3'>{item.ten_goi}</div>
            <div>{item.doanh_thu}</div>
            <div>{item.trang_thai == 0 ? 'Đã xóa' : 'Dang bán'}</div>

          </div>
        ))
        }
      </>
    );
  };

  const ItemChiphiNghesi = () => {
    let day = dayClicked;
    const filter = phieuruttien.filter(item => formatDate(item.ngay_rut_tien) === day); // Lọc hợp đồng theo ngày
    return (
      <>
        <div className='grid grid-cols-7 w-full border-y text-center mt-2 py-2'>
          <div className=''>Mã phiếu rút</div>
          <div className=''>Mã tài khoản</div>
          <div className='col-span-3'>Số tiền rút</div>
          <div>Tên ngân hàng</div>
          <div>Số tài khoản</div>
        </div>
        {filter.map((item, index) => (
          <div key={index} className='grid grid-cols-7 w-full text-[#A4A298] text-center' >
            <div className=''>{item.ma_phieu}</div>
            <div className=''>{item.ma_tk_artist}</div>
            <div className='col-span-3'>{item.tong_tien_rut_ra}</div>
            <div>{item.bank_name}</div>
            <div>{item.bank_id}</div>
          </div>
        ))
        }
      </>
    );
  };

  const handleClickColBar = {
    onClick: (e) => {
      const chart = chartRef.current;
      const elements = chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);

      if (elements.length > 0) {
        const element = elements[0];
        const datasetIndex = element.datasetIndex;
        const index = element.index;
        const value = chart.data.datasets[datasetIndex].data[index];

        setDayClicked(chart.data.labels[index]);
      }
    },
  };

  const handleChangeLoaiThongKe = (event) => {
    setDayClicked('');
    const selectedIndex = +event.target.value;
    setIndexLoai(selectedIndex);
  }
  const handleChangeThoiGian = (event) => {
    setDayClicked('');
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
  useEffect(() => {
    let newData = data();
    setChartData(newData);
  }, [indexLoaiSelected, indexThoiGianSelected, setIndexLoai, setIndexThoiGian, startDay, endDay]);

  const handleUpdatePhi = () => {
    if (valueUpdate != '') {
      if (isNaN(valueUpdate)) message.error("Phí phải là số và số đó lớn hơn 0");
      else if (!isNaN(valueUpdate) && parseInt(valueUpdate) <= 0) message.error("Phí phải là số lớn hơn 0");
      else {
        Modal.confirm({
          title: 'Bạn có chắc chắn muốn thực hiện hành động này?',
          content: 'Cập nhật phí mỗi lượt nghe ',
          okText: 'Đồng ý',
          cancelText: 'Hủy',
          onOk() {
            phimoiluotnghe = valueUpdate;
            message.success('Lưu thành công');
            setIsUpdatePhi(false);
            setValueUpdate('');
          },
          onCancel() {
            setIsUpdatePhi(false);
            setValueUpdate('');
          },
        });

      }

    }

  }

  const exportToExcel = (data, fileName) => {
    const filteredData = data.map(item => ({
      "Ngày rút tiền": item.ngay_rut_tien,
      "Mã phiếu rút tiền": item.ma_phieu,
      "Số tiền rút": item.tong_tien_rut_ra,
      "Số tài khoản": item.bank_id,
      "Tên ngân hàng": item.bank_name
    }));

    // Tạo worksheet từ dữ liệu đã lọc
    const worksheet = XLSX.utils.json_to_sheet(filteredData);

    // Tạo workbook và thêm worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Xuất file Excel
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const handleXuatExcel = () => {
    let day = dayClicked;
    const filter = phieuruttien.filter(item => formatDate(item.ngay_rut_tien) === day);
    exportToExcel(filter, "danhsachruttien_" + day);
  }

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
        {
          indexThoiGianSelected === 4 && (
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
                max={new Date().toISOString().split('T')[0]}
              />
            </span>
          )
        }

      </div>
      <div className='h-[80vh] overflow-y-scroll'>
        {
          indexLoaiSelected === 3 && (
            <div className='flex items-center gap-2 my-2'>
              Hiện tại, phí mà nghệ sĩ nhận được với mỗi lượt nghe bài hát của họ là:
              {
                isUpdatePhi ? <>
                  <input type="text" value={valueUpdate} placeholder={phimoiluotnghe} className='bg-[#1E1E1E] outline-none p-1' autoFocus onChange={(event) => setValueUpdate(event.target.value)} />
                  <Button onClick={handleUpdatePhi} type="primary" className='rounded-3xl bg-[#E0066F] h-hull w-fit hover:!bg-[#E0066F]'>Lưu</Button>
                </> : <>
                  <span className='text-lg font-bold text-[#EB2272]'> {phimoiluotnghe}đ</span>
                  <Button onClick={() => setIsUpdatePhi(true)} type="primary" className='rounded-3xl bg-[#E0066F] h-hull w-fit hover:!bg-[#E0066F]'>Thay đổi</Button>
                </>

              }



            </div>
          )
        }

        <div className='w-full h-[100%] bg-[#1E1E1E]'>
          <Bar
            ref={chartRef} // Tham chiếu đến canvas
            data={chartData}
            options={handleClickColBar} />
        </div>

        {
          dayClicked != '' ? (
            <div className="w-full h-fit bg-[#1E1E1E] my-2 p-2">
              <div className='flex justify-center text-lg font-bold'>Chi tiết của ngày {dayClicked}</div>
              {

                (() => {
                  switch (indexLoaiSelected) {

                    case 1:

                      return <ItemDoanhThuQuangCao />
                    case 2:
                      return <ItemDoanhThuPremium />
                    case 3:
                      return <div className='flex flex-col items-end'>
                        <Button onClick={handleXuatExcel} type="primary" className='rounded-3xl bg-[#E0066F] h-hull w-fit hover:!bg-[#E0066F]'>Xuất excel</Button>
                        <ItemChiphiNghesi />
                      </div>
                  }
                })()
              }
            </div>
          ) : <div className="w-full h-fit bg-[#1E1E1E] my-2 p-2">Click vào cột để xem chi tiết</div>
        }
      </div>

    </div>
  );
};

export default ManagerStatistical;
