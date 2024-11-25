import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PurchasedPremiumCard = ({ title, price, duration, descriptions, ma_goi}) => {
  const navigate = useNavigate(); // Hook để điều hướng

  const handleBuyClick = () => {
    navigate(`/PremiumPay/${ma_goi}`); 
  };

  return (
    <div className="bg-gray-900 p-5 rounded-lg relative text-white mt-5 ml-5">
      <div className={`bg-[#A8C35A] text-black text-sm font-semibold rounded-br-md px-6 py-1 inline-block absolute top-0 left-0`}>
        {duration}
      </div>
      <div className="mt-10 text-left">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="mt-2">
          <span className="text-lg font-bold">{price}đ</span> dùng trong <span className="text-lg font-bold">{duration}</span>
        </p>
        <ul className="mt-4 space-y-1">
          {descriptions.map((desc, index) => (
            <li key={index}>+ {desc}</li>
          ))}
        </ul>
        {/* Thêm nút "Mua" */}
        <button
          onClick={handleBuyClick}
          className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
        >
          Mua
        </button>
      </div>
    </div>
  );
};

const PremiumSection = () => {
    const [premiumData, setPremiumData] = useState([]);
    useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/vouchers")
      .then(res => setPremiumData(res.data))
      .catch(console.error);
  }, []);
    return (
        <div className="bg-[#141414] text-center text-white py-10">
      <div className="flex flex-col text-left justify-center pt-8" style={{ backgroundImage: 'linear-gradient(to bottom, #141414 9%, #590F33 30%, #9C0B50 48%, #521030 72%, #141414 90%)', height: "250px"}}>
        <h1 className="text-3xl ml-10 font-bold mb-3 text-white">Khám phá premium</h1>
        <p className="text-lg ml-10 text-gray-300 mb-10">Tận hưởng âm nhạc không bị gián đoạn, cùng nhiều lợi ích khác!</p>
      </div>
    
      <div className="text-center mt-20 mb-32">
        <h2 className="text-2xl font-semibold">Gnine có các gói sau</h2>
        <p className="text-gray-400 text-sm">Mua và huỷ gói bất kỳ lúc nào bạn muốn</p>
      </div>

      <div className="flex mt-8 flex-wrap">
      {premiumData.map((item, index) => (
            item.trang_thai === 1 && (
              <PurchasedPremiumCard
                key={index}
                ma_goi={item.ma_goi}
                title={item.ten_goi}
                price={`${item.gia_goi}`}
                duration={`${item.thoi_han} tháng`}
                descriptions={item.mo_ta.split(",")}
              />
            )
          ))}
      </div>
    </div>
    );
};

export default PremiumSection;