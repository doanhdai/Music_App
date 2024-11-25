import React, { useEffect, useState } from 'react';
import BankTransferForm from './BankTransferForm';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PremiumCard = ({ title, price, duration, descriptions }) => {
  return (
    <div className="bg-gray-900 p-5 rounded-lg relative text-white mt-5 ml-5">
      <div className={`bg-[#A8C35A] text-black text-sm font-semibold rounded-br-md px-6 py-1 inline-block absolute top-0 left-0`}>
        {duration} tháng
      </div>
      <div className="mt-10 text-left">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="mt-2">
          <span className="text-lg font-bold">{price}đ</span> dùng trong <span className="text-lg font-bold">{duration} </span> tháng
        </p>
        <ul className="mt-4 space-y-1">
          {descriptions.map((desc, index) => (
            <li key={index}>+ {desc}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const PremiumPay = () => {
  const { ma_goi } = useParams();
  const [premiumData, setPremiumData] = useState(null);

  useEffect(() => {
    // Gửi yêu cầu GET đến API
    axios.get(`http://localhost:8000/api/vouchers/${ma_goi}`)
      .then((response) => {
        console.log('Dữ liệu trả về từ API:', response.data);
        setPremiumData(response.data);  // Lưu dữ liệu gói premium vào state
      })
      .catch((error) => {
        console.error('Có lỗi khi lấy dữ liệu:', error);  // Xử lý lỗi nếu có
      });
  }, [ma_goi]);

  // Kiểm tra nếu dữ liệu chưa được tải, hiển thị loading hoặc thông báo khác
  if (!premiumData) {
    return <div>Loading...</div>;  // Hiển thị khi dữ liệu chưa được tải
  }

  return (
    <div className="bg-[#141414] text-center text-white py-10">
      <div className="flex flex-col text-left justify-center pt-8" style={{ backgroundImage: 'linear-gradient(to bottom, #141414 9%, #590F33 30%, #9C0B50 48%, #521030 72%, #141414 90%)', height: "250px" }}>
        <h1 className="text-3xl ml-10 font-bold mb-3 text-white">Thanh toán</h1>
        <p className="text-lg ml-10 text-gray-300 mb-10">Bạn đang tiến hành thanh toán cho gói premium</p>
      </div>

      <div className="flex mt-8 flex-wrap">
        <PremiumCard
          title={premiumData.ten_goi}
          price={premiumData.gia_goi}
          duration={premiumData.thoi_han}
          descriptions={premiumData.mo_ta.split(",")}
        />
        <BankTransferForm 
        ma_tk={JSON.parse(localStorage.getItem('account')).ma_tk}
        ma_goi={ma_goi}
        thang={premiumData.thoi_han}
        tong_tien_thanh_toan={premiumData.gia_goi}
        />
      </div>
    </div>
  );
};

export default PremiumPay;
