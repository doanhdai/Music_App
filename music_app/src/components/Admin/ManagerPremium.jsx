import React from 'react'
import { Button } from 'antd'

import { CiCirclePlus } from "react-icons/ci";
import { IoIosMore, IoIosSearch } from 'react-icons/io'
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { albumsData, assets, songsData } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";

const CreatePremiumCard = ({ isActive, title, price, duration, descriptions, ma_goi }) => {
  const [active, setActive] = useState(isActive);

  // Giữ lại phần màu sắc cho card
  const bgColor = active ? "bg-[#A8C35A]" : "bg-[#A56161]";
  const buttonColor = active ? "bg-[#A8C35A] text-black" : "bg-[#A56161] text-white";

  const handleToggle = async () => {
    const newStatus = active ? 0 : 1;
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/vouchersUpdateStatus/${ma_goi}`, { trang_thai: newStatus });
      if (response.status === 200) {
        setActive(newStatus === 1); // Cập nhật trạng thái mới nếu thành công
      }
    } catch (error) {
      console.error('Cập nhật trạng thái thất bại:', error);
    }
  };

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

      {/* Thanh toggle */}
      <div className="flex items-center mt-5">
        <span className="text-sm mr-2">{active ? 'Bật' : 'Tắt'}</span>
        <div
          onClick={handleToggle}
          className={`relative inline-flex items-center cursor-pointer w-12 h-6 transition-colors rounded-full ${active ? 'bg-green-500' : 'bg-gray-500'}`}
        >
          {/* Nút tròn */}
          <span
            className={`w-6 h-6 bg-white rounded-full transition-all transform ${active ? 'translate-x-6' : 'translate-x-0'}`}
          ></span>
        </div>
      </div>
    </div>
  );
};

const AddPremiumModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    duration: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-20">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg text-black">
        <h2 className="text-lg font-bold mb-4">Thêm PurchasedPremiumCard</h2>

        {/* Tên gói */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-black">Tên gói</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 text-black"
            placeholder="Nhập tên gói"
          />
        </div>

        {/* Giá gói */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-black">Giá gói</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 text-black"
            placeholder="Nhập giá gói"
          />
        </div>

        {/* Thời hạn */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-black">Thời hạn</label>
          <select
            name="duration"
            value={Number(formData.duration)} // Đảm bảo giá trị là số
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 text-black"
          >
            <option value={1}>1 tháng</option>
            <option value={2}>2 tháng</option>
            <option value={3}>3 tháng</option>
            <option value={6}>6 tháng</option>
          </select>
        </div>

        {/* Nút hành động */}
        <div className="flex space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Lưu
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

const DeletePremiumModal = ({ visible, onClose, premiumData, onDelete }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    if (selectedPackage) {
      setLoading(true);
      // Gọi API xóa gói
      fetch(`http://127.0.0.1:8000/api/vouchers/${selectedPackage}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(() => {
          onDelete(selectedPackage); // Gọi hàm onDelete từ component cha để cập nhật dữ liệu
          setLoading(false);
          onClose(); // Đóng modal
        })
        .catch(error => {
          console.error("Error deleting package", error);
          setLoading(false);
        });
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-96 p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4 text-black">Xác nhận xóa</h2>
        </div>
        <div className="mb-4">
          <select
            className="w-full p-2 border border-gray-300 rounded-md text-black"
            onChange={(e) => setSelectedPackage(e.target.value)}
            value={selectedPackage}
          >
            <option value="">Chọn gói cần xóa</option>
            {premiumData.map((item) => (
              <option key={item.ma_goi} value={item.ma_goi}>
                {item.ten_goi}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-gray-400 text-black py-2 px-4 rounded-md hover:bg-gray-500"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="bg-red-500 text-black py-2 px-4 rounded-md hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Đang xóa...' : 'Xóa'}
          </button>
        </div>
      </div>
    </div>
  );
};

const ManagerPremium = () => {
  const [premiumData, setPremiumData] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/vouchers")
      .then(res => setPremiumData(res.data))
      .catch(console.error);
  }, []);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPremium = (data) => {
    console.log("Dữ liệu nhận được:", data);
    const requestData = {
      ten_goi: data.title,       // Tên gói
      thoi_han: data.duration,   // Thời hạn
      gia_goi: data.price,       // Giá gói
      mo_ta: data.descriptions,  // Mô tả (chuỗi)
    };
  
    // Gửi dữ liệu lên API
    axios.post('http://127.0.0.1:8000/api/vouchers', requestData)
      .then(response => {
        console.log("Dữ liệu đã được thêm vào:", response.data);
  
        // Gọi lại API để cập nhật danh sách mới
        return axios.get("http://127.0.0.1:8000/api/vouchers");
      })
      .then(res => {
        setPremiumData(res.data); // Cập nhật lại danh sách gói
      })
      .catch(error => {
        console.error("Lỗi khi thêm gói:", error);
      });
  };
  const handleDelete = (ma_goi) => {
    // Cập nhật dữ liệu sau khi xóa gói
    setPremiumData(premiumData.filter(item => item.ma_goi !== ma_goi));
  };
  return (
    <>
      <AddPremiumModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddPremium}
                    />
      <DeletePremiumModal
        visible={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        premiumData={premiumData}
        onDelete={handleDelete}
      />
      <div className='pt-3 mx-[38px]'>
        <div className='flex justify-between'>
            <div className='flex items-center space-x-5'>
                {/* Search Box */}
                

                <div className='flex flex-col'>
                  <label className='mb-1'>Tìm kiếm gói premium</label>

                   <div className='flex items-center p-2 w-[300px] bg-black justify-between rounded-3xl'>
                    <IoIosSearch className="text-white text-2xl cursor-pointer" />
                    <input
                    className="bg-black w-[100%] outline-none ml-3 text-white"
                    type="text"
                    placeholder="Tên gói"
                    />
                  </div>
                </div>

                {/* User Type Filter */}
               
                <div className='flex flex-col'>
                    <label className="mb-1">Trạng thái</label>
                    <select className='bg-black text-white p-2 rounded-3xl border-none w-[150px] outline-none cursor-pointer'>
                        <option>Tất cả</option>
                        <option>aaa</option>
                        <option>bbb</option>
                        <option>ccc</option>
                    </select>
                </div>
                <div className='flex flex-col'>
                  <label className='mb-1'>Thời hạn</label>

                   <div className='flex items-center p-2 w-[200px] bg-black justify-between rounded-3xl'>
                    <input
                    className="bg-black w-[100%] outline-none ml-3 text-white"
                    type="date"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <div className='flex flex-col'>
                  <label className='mb-1'>&nbsp;</label> 
                  <Button type="primary" className='rounded-3xl bg-[#E0066F] h-[35px] w-[100px] hover:!bg-[#E0066F]'>
                    Tìm kiếm
                  </Button>
                </div>
            </div>
            <div className='flex flex-col'>
              <label className='mb-1'>&nbsp;</label>
              <div className='flex space-x-5'>
                <div className='w-[36px] h-[36px] flex items-center justify-center rounded-full bg-black' onClick={() => setIsModalOpen(true)}>
                    <CiCirclePlus size={20} />
                    
                </div>
                <div className='w-[36px] h-[36px] flex items-center justify-center rounded-full bg-black' onClick={() => setIsDeleteModalOpen(true)}>
                    <MdDeleteOutline size={20}/>
                </div>
               </div>

            </div>
        </div>
        <div>
          {/* <p className='mt-7 '>Tổng có : 100 Gói .</p> */}
            <div className="grid grid-cols-4 gap-3 mt-5">
            {premiumData.map((item, index) => (
              <CreatePremiumCard
                key={index}
                ma_goi= {item.ma_goi}
                isActive={item.trang_thai === 1}
                title={item.ten_goi}
                price={`${item.gia_goi} VND`}
                duration={`${item.thoi_han} tháng`}
                descriptions={item.mo_ta.split(",")}
              />
            ))}
          </div>
      </div>
    </div>
    </>
   
  )
}

export default ManagerPremium