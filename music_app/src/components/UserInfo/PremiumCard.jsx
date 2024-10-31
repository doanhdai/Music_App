import React from "react";

const PremiumCard = ({isActive, title, price, duration, purchase_date, expiry_date, descriptions}) => {
  const bgColor = isActive ? "#A8C35A" : "#A56161";
  const tilte_date = isActive ? "Đang dùng" : "Hết hạn";
  // const bgColor = props.isDate ? "bg-green-500" : "bg-red-500";
  return (
    <div
      style={{ color: bgColor }}
      className="bg-gray-900 p-4 rounded-lg w-76 mr-3 relative  mt-5"
    >
      <div
        style={{ backgroundColor: bgColor }}
        className="text-black text-sm font-semibold rounded-br-md w-50 px-5 py-1 inline-block absolute top-0 left-0 z-10"
      >
        {tilte_date}
      </div>
      <h2 className="mt-12 text-xl font-semibold">{title}</h2>
      <p className="text-white mt-2">
        <strong className="text-lg">{price}</strong> dùng trong{" "}
        <strong className="text-lg">{duration}</strong>
      </p>
      <p className="text-white text-sm mt-2">
        Ngày mua: <span className="font-mono">{purchase_date}</span>
      </p>
      <p className="text-white text-sm mt-1">
        Ngày hết hạn: <span className="font-mono">{expiry_date}</span>
      </p>
      <ul className="text-white mt-4 space-y-1">
        {descriptions.map((desc, index)=>(
          <li key={index}>+ {desc}</li>
        ))}
      </ul>
    </div>
  );
};

export default PremiumCard;
