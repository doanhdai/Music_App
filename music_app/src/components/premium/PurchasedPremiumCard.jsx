import React from 'react';

const PurchasedPremiumCard = ({ isActive, title, price, duration, descriptions }) => {
    const bgColor = isActive ? "bg-[#A8C35A]" : "bg-[#A56161]";
    const buttonColor = isActive ? "bg-[#A8C35A] text-black" : "bg-[#A56161] text-white";
    return (
      <div className="bg-gray-900 p-5 rounded-lg relative text-white">
        <div className={`${bgColor} text-black text-sm font-semibold rounded-br-md px-6 py-1 inline-block absolute top-0 left-0`}>
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
        </div>
        {/* <button className={`${buttonColor} mt-5 w-full py-4 rounded-3xl font-semibold`}>
          MUA {title}
        </button> */}
    </div>
    );
};

export default PurchasedPremiumCard;