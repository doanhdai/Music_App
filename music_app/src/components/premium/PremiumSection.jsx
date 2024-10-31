import React from 'react';
import PurchasedPremiumCard from './PurchasedPremiumCard';

const PremiumSection = () => {
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

      <div className="flex justify-center space-x-14 mt-8 flex-wrap">
        <PurchasedPremiumCard
          isActive={false}
          title="Ten Premium"
          price="giá_gói"
          duration="thoi_han"
          descriptions={["mo ta", "mo ta", "mo ta"]}
        />
        <PurchasedPremiumCard
          isActive={true}
          title="Ten Premium"
          price="giá_gói"
          duration="thoi_han"
          descriptions={["mo ta", "mo ta", "mo ta"]}
        />
      </div>
    </div>
    );
};

export default PremiumSection;