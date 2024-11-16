import React from "react";
import PremiumCard from "./PremiumCard";
import NonPremium from "./NonPremium";
import PremiumSection from "../premium/PremiumSection";
import DropboxUploader from "./DropboxUploader";

const ManagerPremium = () => {
  return (
    <div className="pt-3 mx-[38px]">
      {/* <PremiumSection /> */}
      {/* <NonPremium /> */}
      {/* <div className="total_card">Tổng cộng: 40</div>
      <div className="flex flex-wrap">
        <PremiumCard 
          isActive={true} 
          title="Ten Premium"
          price="50.000đ"
          duration="2 tháng"
          purchase_date="18:04:05 10/05/2024"
          expiry_date="18:04:05 10/07/2024"
          descriptions={["mo ta", "mo ta", "mo ta"]}
        />
        <PremiumCard 
          isActive={false} 
          title="Ten Premium"
          price="50.000đ"
          duration="2 tháng"
          purchase_date="18:04:05 10/05/2024"
          expiry_date="18:04:05 10/07/2024"
          descriptions={["mo ta", "mo ta", "mo ta"]}
        />
        
      </div> */}
      <DropboxUploader />
    </div>
  );
};

export default ManagerPremium;
