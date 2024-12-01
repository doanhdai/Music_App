import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
export const AdminContext = createContext();
import { notification } from "antd";

const AdminContextProvider = (props) => {
  const url = "http://localhost:8000";
  const [isBgCover, setBgCover] = useState(false);
  const [accountsData, setAccountsData] = useState([]);
  const [advertisersData, setAdvertisers] = useState([]);
  const [advertisementsData, setAdvertisements] = useState([]);
  const [contractsData, setContract] = useState([]);
  const [quyenList, setQuyenList] = useState([]);
  const [chucnangList, setChucnangList] = useState([]);
  const [premiumList, setPremiumList] = useState([]);
  const [theloaiList, setTheloaiList] = useState([]);
  const [philuotnghe, setPhiluotnghe] = useState(null);
  const [dangkyPremium, setDangkyPremium] = useState([]);
  const [isGettingAdvertisersData, setIsGettingAdvertisersData] =
    useState(true);
  const [isGettingAdvertisementsData, setIsGettingAdvertisementsData] =
    useState(true);
  const [isGettingContractsData, setIsGettingContractsData] = useState(true);

  useEffect(() => {
    getAccountsData();
    getAdvertisersData();
    getAdvertisementsData();
    getAdvertisingContractData();
    getChucnang();
    getQuyen();
    getPremiumList();
    fetchTheLoaiList();
    fetchPhiluotnghe();
    fetchDangkyPremium();
  }, []);

  const getAccountsData = async () => {
    try {
      const res = await axios.get(`${url}/api/accounts/all`);
      const filteredAccounts = res.data.filter(
        (account) => account.trang_thai !== 2
      );
      setAccountsData(filteredAccounts);
      // console.log(filteredAccounts);
    } catch (error) {
      console.log(error);
    }
  };
  const getAdvertisersData = async () => {
    try {
      const response = await axios.get(`${url}/api/advertisers`);
      setAdvertisers(response.data.advertisers);
      // console.log(response.data.advertisers);
      setIsGettingAdvertisersData(false);
    } catch (err) {
      console.error(err);
    }
  };

  const getAdvertisementsData = async () => {
    try {
      const response = await axios.get(`${url}/api/advertisements`);
      setAdvertisements(response.data.advertisements);
      // console.log(response.data.advertisements);
      setIsGettingAdvertisementsData(false);
    } catch (err) {
      console.error(err);
    }
  };

  const getAdvertisingContractData = async () => {
    try {
      const response = await axios.get(`${url}/api/advertising-contracts`);
      setContract(response.data.advertising_contracts);
      setIsGettingContractsData(false);
    } catch (err) {
      console.error(err);
    }
  };

  const getQuyen = async () => {
    try {
      const response = await axios.get(`${url}/api/decentralizations`);
      setQuyenList(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getChucnang = async () => {
    try {
      const response = await axios.get(`${url}/api/functionns`);
      setChucnangList(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const openNotification = (mess) => {
    notification["success"]({
      message: "Thảnh công",
      description: mess,
      placement: "top", // Các giá trị khác: topLeft, topRight, bottomLeft
      duration: 2,
    });
  };

  const uploadImageAPI = (formData) => {
    return axios.post("http://127.0.0.1:8000/api/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const uploadImage = async (formData) => {
    try {
      const resImage = await uploadImageAPI(formData);
      return resImage.data.path; // Trả về đường dẫn ảnh
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error; // Ném lỗi để xử lý sau
    }
  };

  const getPremiumList = async () => {
    try {
      const response = await axios.get(`${url}/api/vouchers`);
      setPremiumList(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTheLoaiList = async () => {
    try {
      const response = await axios.get(`${url}/api/genres`);
      setTheloaiList(response.data.data);
    } catch (error) {
      console.log("Lỗi khi gọi API:", error);
    }
  };

  const fetchPhiluotnghe = async () => {
    try {
      const response = await axios.get(`${url}/api/phi-luot-nghe`);
      setPhiluotnghe({
        ma_phi: response.data[0].ma_phi,
        gia_tien_luot_nghe: response.data[0].gia_tien_luot_nghe,
      });
    } catch (error) {
      console.log("Lỗi khi gọi API:", error);
    }
  };

  const fetchDangkyPremium = async () => {
    try {
      const response = await axios.get(`${url}/api/voucherRegisters`);
      setDangkyPremium(response.data);
    } catch (error) {
      console.log("Lỗi khi gọi API:", error);
    }
  };

  const contextValue = {
    openNotification,
    url,
    isBgCover,
    setBgCover,
    accountsData,
    advertisersData,
    setAdvertisers,
    advertisementsData,
    setAdvertisements,
    formatDate,
    contractsData,
    chucnangList,
    setChucnangList,
    quyenList,
    setQuyenList,
    uploadImage,
    setContract,
    isGettingAdvertisersData,
    isGettingAdvertisementsData,
    isGettingContractsData,
    premiumList,
    theloaiList,
    setTheloaiList,
    philuotnghe,
    setPhiluotnghe,
    dangkyPremium,
    setAccountsData,
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
