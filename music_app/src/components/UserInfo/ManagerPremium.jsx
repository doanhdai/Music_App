import React from "react";
import PremiumCard from "./PremiumCard";
import NonPremium from "./NonPremium";

const ManagerPremium = () => {
  return (
    <div className="pt-3 mx-[38px]">
      {/* <NonPremium /> */}
      <div className="total_card">Tổng cộng: 40</div>
      <div className="flex flex-wrap">
        <PremiumCard isDate={true} />
        <PremiumCard isDate={false} />
        <PremiumCard isDate={false} />
        <PremiumCard isDate={false} />
        <PremiumCard isDate={false} />
        <PremiumCard isDate={false} />
        <PremiumCard isDate={false} />
        <PremiumCard isDate={false} />
        <PremiumCard isDate={false} />
      </div>
    </div>
  );
};

export default ManagerPremium;
