import React, { useState, useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Đảm bảo đã đăng ký các thành phần của ChartJS
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

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
  { ma_tk: 1, ma_goi: 1, ngay_dang_ky: '24/10/2023 18:00:33', ngay_het_han: '11/11/2023 18:00:33', tong_tien_thanh_toan: 20000 },
  { ma_tk: 2, ma_goi: 1, ngay_dang_ky: '20/10/2023 18:00:33', ngay_het_han: '11/11/2023 18:00:33', tong_tien_thanh_toan: 10000 },
  { ma_tk: 3, ma_goi: 1, ngay_dang_ky: '21/10/2023 18:00:33', ngay_het_han: '11/11/2023 18:00:33', tong_tien_thanh_toan: 23000 },
  { ma_tk: 4, ma_goi: 1, ngay_dang_ky: '22/10/2023 18:00:33', ngay_het_han: '11/11/2023 18:00:33', tong_tien_thanh_toan: 13000 },
  { ma_tk: 5, ma_goi: 1, ngay_dang_ky: '23/10/2023 18:00:33', ngay_het_han: '11/11/2023 18:00:33', tong_tien_thanh_toan: 23000 },
  { ma_tk: 1, ma_goi: 1, ngay_dang_ky: '24/10/2023 18:00:33', ngay_het_han: '11/11/2023 18:00:33', tong_tien_thanh_toan: 23000 },
  { ma_tk: 2, ma_goi: 1, ngay_dang_ky: '21/10/2023 18:00:33', ngay_het_han: '11/11/2023 18:00:33', tong_tien_thanh_toan: 12000 },
  { ma_tk: 4, ma_goi: 1, ngay_dang_ky: '22/10/2023 18:00:33', ngay_het_han: '11/11/2023 18:00:33', tong_tien_thanh_toan: 10000 },
  { ma_tk: 3, ma_goi: 1, ngay_dang_ky: '11/11/2024 18:00:33', ngay_het_han: '11/11/2023 18:00:33', tong_tien_thanh_toan: 24000 },
  { ma_tk: 5, ma_goi: 1, ngay_dang_ky: '11/11/2024 18:00:33', ngay_het_han: '11/11/2023 18:00:33', tong_tien_thanh_toan: 22000 },
  { ma_tk: 5, ma_goi: 1, ngay_dang_ky: '21/10/2024 18:00:33', ngay_het_han: '11/11/2023 18:00:33', tong_tien_thanh_toan: 13000 },
  { ma_tk: 6, ma_goi: 1, ngay_dang_ky: '12/11/2024 18:00:33', ngay_het_han: '11/11/2023 18:00:33', tong_tien_thanh_toan: 14000 },
  { ma_tk: 7, ma_goi: 1, ngay_dang_ky: '12/11/2024 18:00:33', ngay_het_han: '11/11/2023 18:00:33', tong_tien_thanh_toan: 21000 },
  { ma_tk: 8, ma_goi: 1, ngay_dang_ky: '12/11/2024 18:00:33', ngay_het_han: '11/11/2023 18:00:33', tong_tien_thanh_toan: 20000 },
  { ma_tk: 9, ma_goi: 1, ngay_dang_ky: '12/11/2024 18:00:33', ngay_het_han: '11/11/2023 18:00:33', tong_tien_thanh_toan: 19000 }
]

let hopdongList = [
  { ma_hop_dong: 1, ma_quang_cao: 1, luot_phat: 211, doanh_thu: 10000000, ngay_tao: '23/10/2023 18:00:33', ngay_hoan_thanh: '23/11/2023 08:00:33' },
  { ma_hop_dong: 2, ma_quang_cao: 2, luot_phat: 231, doanh_thu: 10440000, ngay_tao: '23/10/2023 18:00:33', ngay_hoan_thanh: '' },
  { ma_hop_dong: 3, ma_quang_cao: 3, luot_phat: 111, doanh_thu: 4500000, ngay_tao: '23/10/2023 18:00:33', ngay_hoan_thanh: '' },
  { ma_hop_dong: 4, ma_quang_cao: 4, luot_phat: 209, doanh_thu: 9000000, ngay_tao: '23/10/2023 18:00:33', ngay_hoan_thanh: '23/11/2023 08:00:33' },
  { ma_hop_dong: 5, ma_quang_cao: 1, luot_phat: 230, doanh_thu: 10500000, ngay_tao: '23/12/2023 18:00:33', ngay_hoan_thanh: '23/11/2023 08:00:33' },
  { ma_hop_dong: 6, ma_quang_cao: 3, luot_phat: 146, doanh_thu: 5400000, ngay_tao: '23/11/2023 18:00:33', ngay_hoan_thanh: '23/11/2023 08:00:33' },
  { ma_hop_dong: 7, ma_quang_cao: 4, luot_phat: 189, doanh_thu: 70000000, ngay_tao: '09/09/2023 18:00:33', ngay_hoan_thanh: '' },
  { ma_hop_dong: 7, ma_quang_cao: 4, luot_phat: 189, doanh_thu: 70000000, ngay_tao: '12/11/2024 18:00:33', ngay_hoan_thanh: '' },
  { ma_hop_dong: 7, ma_quang_cao: 4, luot_phat: 189, doanh_thu: 70000000, ngay_tao: '12/11/2024 18:00:33', ngay_hoan_thanh: '' },
  { ma_hop_dong: 7, ma_quang_cao: 4, luot_phat: 189, doanh_thu: 70000000, ngay_tao: '12/11/2024 18:00:33', ngay_hoan_thanh: '' },
  { ma_hop_dong: 7, ma_quang_cao: 4, luot_phat: 189, doanh_thu: 70000000, ngay_tao: '12/11/2024 18:00:33', ngay_hoan_thanh: '' },
  { ma_hop_dong: 7, ma_quang_cao: 4, luot_phat: 189, doanh_thu: 70000000, ngay_tao: '12/11/2024 18:00:33', ngay_hoan_thanh: '' },
  { ma_hop_dong: 7, ma_quang_cao: 4, luot_phat: 189, doanh_thu: 70000000, ngay_tao: '12/11/2024 18:00:33', ngay_hoan_thanh: '' },
  { ma_hop_dong: 7, ma_quang_cao: 4, luot_phat: 189, doanh_thu: 70000000, ngay_tao: '12/11/2024 18:00:33', ngay_hoan_thanh: '' },
  { ma_hop_dong: 7, ma_quang_cao: 4, luot_phat: 189, doanh_thu: 50000000, ngay_tao: '11/11/2024 18:00:33', ngay_hoan_thanh: '' },
  { ma_hop_dong: 7, ma_quang_cao: 4, luot_phat: 189, doanh_thu: 50000000, ngay_tao: '11/11/2024 18:00:33', ngay_hoan_thanh: '' },
  { ma_hop_dong: 7, ma_quang_cao: 4, luot_phat: 189, doanh_thu: 50000000, ngay_tao: '11/11/2024 18:00:33', ngay_hoan_thanh: '' },
  { ma_hop_dong: 7, ma_quang_cao: 4, luot_phat: 189, doanh_thu: 50000000, ngay_tao: '11/10/2024 18:00:33', ngay_hoan_thanh: '' },
  { ma_hop_dong: 7, ma_quang_cao: 4, luot_phat: 189, doanh_thu: 50000000, ngay_tao: '11/10/2024 18:00:33', ngay_hoan_thanh: '' },
  { ma_hop_dong: 7, ma_quang_cao: 4, luot_phat: 189, doanh_thu: 50000000, ngay_tao: '12/10/2024 18:00:33', ngay_hoan_thanh: '' },
  { ma_hop_dong: 7, ma_quang_cao: 4, luot_phat: 189, doanh_thu: 50000000, ngay_tao: '12/10/2024 18:00:33', ngay_hoan_thanh: '' },
  { ma_hop_dong: 7, ma_quang_cao: 4, luot_phat: 189, doanh_thu: 50000000, ngay_tao: '14/10/2024 18:00:33', ngay_hoan_thanh: '' }
]

let phieuruttien = [
  { ma_phieu: 1, ma_tk_artist: 1, ngay_rut_tien: '23/10/2024 18:00:33', tong_tien_rut_ra: 12500000, bank_id: '090912344452', bank_name: 'Agribank' },
  { ma_phieu: 1, ma_tk_artist: 2, ngay_rut_tien: '22/10/2024 18:00:33', tong_tien_rut_ra: 12500000, bank_id: '090912344452', bank_name: 'VCB' },
  { ma_phieu: 1, ma_tk_artist: 3, ngay_rut_tien: '21/10/2024 18:00:33', tong_tien_rut_ra: 12500000, bank_id: '090912344452', bank_name: 'MB' },
  { ma_phieu: 1, ma_tk_artist: 4, ngay_rut_tien: '20/10/2024 18:00:33', tong_tien_rut_ra: 12500000, bank_id: '090912344452', bank_name: 'Sacombank' },
  { ma_phieu: 1, ma_tk_artist: 5, ngay_rut_tien: '22/10/2024 18:00:33', tong_tien_rut_ra: 12500000, bank_id: '090912344452', bank_name: 'Agribank' },
  { ma_phieu: 1, ma_tk_artist: 2, ngay_rut_tien: '23/10/2024 18:00:33', tong_tien_rut_ra: 12500000, bank_id: '090912344452', bank_name: 'VPBank' },
  { ma_phieu: 1, ma_tk_artist: 1, ngay_rut_tien: '11/11/2024 18:00:33', tong_tien_rut_ra: 12500000, bank_id: '090912344452', bank_name: 'MB' },
  { ma_phieu: 1, ma_tk_artist: 3, ngay_rut_tien: '11/11/2024 18:00:33', tong_tien_rut_ra: 12500000, bank_id: '090912344452', bank_name: 'Sacombank' },
  { ma_phieu: 1, ma_tk_artist: 4, ngay_rut_tien: '11/11/2024 18:00:33', tong_tien_rut_ra: 12500000, bank_id: '090912344452', bank_name: 'Agribank' },
  { ma_phieu: 1, ma_tk_artist: 4, ngay_rut_tien: '12/11/2024 18:00:33', tong_tien_rut_ra: 12500000, bank_id: '090912344452', bank_name: 'Agribank' },
  { ma_phieu: 1, ma_tk_artist: 4, ngay_rut_tien: '12/11/2024 18:00:33', tong_tien_rut_ra: 12500000, bank_id: '090912344452', bank_name: 'Agribank' }
]

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
  const [indexThoiGianSelected, setIndexThoiGian] = useState(1);
  const [indexLoaiSelected, setIndexLoai] = useState(1);
  const [startDay, setStartDay] = useState(getDate(0));
  const [endDay, setEndDay] = useState(getDate(1));
  const [chartData, setChartData] = useState(data());



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
            const total = hopdongList.reduce((sum, item) => {
              return item.ngay_tao.split(' ')[0] == day ? sum + item.doanh_thu : sum;
            }, 0);
            value.push(total);
            break;
          }
          case 2: {
            let day = getDate(0);
            labels.push(day);
            const total = hopdongList.reduce((sum, item) => {
              return item.ngay_tao.split(' ')[0] == day ? sum + item.doanh_thu : sum;
            }, 0);
            value.push(total);
            break;
          }
          case 3: {
            let day = getDate(2).split("/");
            labels = getDaysOfMonth(day[1], day[2]);
            labels.forEach((d) => {
              const total = hopdongList.reduce((sum, item) => {
                return item.ngay_tao.split(' ')[0] == d ? sum + item.doanh_thu : sum;
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
                const total = hopdongList.reduce((sum, item) => {
                  return item.ngay_tao.split(' ')[0] == d ? sum + item.doanh_thu : sum;
                }, 0);
                value.push(total);
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
              return item.ngay_dang_ky.split(' ')[0] == day ? sum + item.tong_tien_thanh_toan : sum;
            }, 0);
            value.push(total);
            break;
          }
          case 2: {
            let day = getDate(0);
            labels.push(day);
            const total = dangkyPremium.reduce((sum, item) => {
              return item.ngay_dang_ky.split(' ')[0] == day ? sum + item.tong_tien_thanh_toan : sum;
            }, 0);
            value.push(total);
            break;
          }
          case 3: {
            let day = getDate(2).split("/");
            labels = getDaysOfMonth(day[1], day[2]);
            labels.forEach((d) => {
              const total = dangkyPremium.reduce((sum, item) => {
                return item.ngay_dang_ky.split(' ')[0] == d ? sum + item.tong_tien_thanh_toan : sum;
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
                  return item.ngay_dang_ky.split(' ')[0] == d ? sum + item.tong_tien_thanh_toan : sum;
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
              return item.ngay_rut_tien.split(' ')[0] == day ? sum + item.tong_tien_rut_ra : sum;
            }, 0);
            value.push(total);
            break;
          }
          case 2: {
            let day = getDate(0);
            labels.push(day);
            const total = phieuruttien.reduce((sum, item) => {
              return item.ngay_rut_tien.split(' ')[0] == day ? sum + item.tong_tien_rut_ra : sum;
            }, 0);
            value.push(total);
            break;
          }
          case 3: {
            let day = getDate(2).split("/");
            labels = getDaysOfMonth(day[1], day[2]);
            labels.forEach((d) => {
              const total = phieuruttien.reduce((sum, item) => {
                return item.ngay_rut_tien.split(' ')[0] == d ? sum + item.tong_tien_rut_ra : sum;
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
                  return item.ngay_rut_tien.split(' ')[0] == d ? sum + item.tong_tien_rut_ra : sum;
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
      datasets: [{ label: loaithongke[indexLoaiSelected - 1].ten, data: value, backgroundColor: '#C64174' }]
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
  useEffect(() => {
    let newData = data();
    setChartData(newData);
  }, [indexLoaiSelected, indexThoiGianSelected, setIndexLoai, setIndexThoiGian, startDay, endDay]);

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

              />
            </span>
          )
        }
      </div>
      <div className='w-full h-[90%] bg-[#1E1E1E]'>
        <Bar
          ref={chartRef} // Tham chiếu đến canvas
          data={chartData} />
      </div>
    </div>
  );
};

export default ManagerStatistical;
