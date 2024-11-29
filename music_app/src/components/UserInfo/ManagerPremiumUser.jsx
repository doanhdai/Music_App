import React, { useEffect, useState } from "react";
import PremiumCard from "./PremiumCard";
import NonPremium from "./NonPremium";
import axios from "axios";

const ManagerPremium = () => {
  const [premiumData, setPremiumData] = useState([]);
  const account = JSON.parse(localStorage.getItem('account')) || null;

  useEffect(() => {
    const ma_tk = account.ma_tk; // Thay "your_account_id" bằng giá trị thật của mã tài khoản
    axios
      .get(`http://127.0.0.1:8000/api/accounts/${ma_tk}/voucher`)
      .then((res) => setPremiumData(res.data))
      .catch(console.error);
  }, []);
  console.log(premiumData);

  const totalVoucher = premiumData?.voucher?.length || 0;
  return (
    <div className="pt-3 mx-[38px]">
      { totalVoucher == 0 ? (
          <NonPremium />
      ) : (
        <div className="total_card">Tổng cộng: {totalVoucher}</div>
      )}

      {/* <PremiumSection /> */}
      
      
      <div className="flex flex-wrap">

      {premiumData?.voucher?.map((item, index) => (
              <PremiumCard 
                key={index}
                isActive={item.trang_thai}
                ma_goi={item.ma_goi}
                title={item.ten_goi}
                price={item.gia_goi}
                duration={item.thoi_han}
                purchase_date={item.pivot.ngay_dang_ky}
                expiry_date={item.pivot.ngay_het_han}
                descriptions={item.mo_ta.split(",")}
              />
          ))}
      </div>
      {/* <DropboxUploader /> */}
    </div>
  );
};

export default ManagerPremium;
