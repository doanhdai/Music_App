import React, { useState } from "react";
import axios from 'axios';
const BankTransferForm = ({ma_tk,ma_goi,thang,tong_tien_thanh_toan}) => {
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [message, setMessage] = useState('');
  const banks = ["Agribank", "Vietcombank", "Techcombank", "BIDV", "MB Bank"]; // Danh sách ngân hàng

  const handleSubmit = async (e)  => {
    e.preventDefault();
    try {
      // Gửi yêu cầu PUT để rút tiền
      const response = await axios.put(`http://localhost:8000/api/banks/${accountNumber}/withdraw`, {
          bank_name: selectedBank,
          so_tien_tru: tong_tien_thanh_toan
      });

      if (response.data.message === 'Rút tiền thành công') {
          // Nếu rút tiền thành công, tiếp tục gọi POST để đăng ký voucher
          try {
              const res = await axios.post('http://localhost:8000/api/voucherRegisters', {
                  ma_tk: ma_tk,
                  ma_goi: ma_goi,
                  thang: thang,
                  tong_tien_thanh_toan: tong_tien_thanh_toan,
                  trang_thai: 1
              });

              setMessage(res.data.message); // Hiển thị thông báo thành công từ API POST
          } catch (error) {
              setMessage('Có lỗi xảy ra khi đăng ký voucher!');
          }
      } else {
          // Nếu rút tiền không thành công
          setMessage(response.data.message);
      }
  } catch (error) {
      // Xử lý lỗi nếu PUT request thất bại
      setMessage('Có lỗi xảy ra khi rút tiền!');
  }
  };

  return (
    <div className="bg-black text-white p-6 rounded-md w-80 mx-auto">
      <h2 className="text-center text-lg font-semibold mb-4">Thông tin của bạn</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="bank" className="block mb-2 text-sm">
            Chọn ngân hàng
          </label>
          <select
            id="bank"
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            className="w-full p-2 bg-black border border-gray-500 rounded-md text-white"
          >
            <option value="" disabled>
              -- Chọn ngân hàng --
            </option>
            {banks.map((bank, index) => (
              <option key={index} value={bank}>
                {bank}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="account" className="block mb-2 text-sm">
            Nhập số tài khoản
          </label>
          <input
            type="text"
            id="account"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-full p-2 bg-black border border-gray-500 rounded-md text-white"
            placeholder="Nhập số tài khoản"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 border border-white rounded-md text-white hover:bg-white hover:text-black transition"
        >
          Chuyển
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default BankTransferForm;
