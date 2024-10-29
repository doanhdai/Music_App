import React from "react";
import { FaInfoCircle } from "react-icons/fa";
const NonPremium = () => {
  return (
    <div className="flex bg-[#141414] w-72 p-3">
      <FaInfoCircle style={{ color: "white", fontSize: "24px" }} />
      <div className="ml-2">Bạn chưa mua gói Premium nào!</div>
    </div>
  );
};

export default NonPremium;
