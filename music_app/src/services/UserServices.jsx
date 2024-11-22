import axios from "axios";
const loginAPI = (email, password) =>{
    return axios.post("http://127.0.0.1:8000/api/login",{email, password});
}

// const getUserAPI = async (ma_tk) => {
//     try {
//         const response = await axios.get(`http://127.0.0.1:8000/api/users/${ma_tk}`);
//         return response.data; // Trả về dữ liệu từ API
//     } catch (error) {
//         console.error("Lỗi khi gọi API:", error.message);
//         return null; // Trả về null nếu lỗi
//     }
// };
const createAccountAPI = (accountData) =>{
    return axios.post('http://127.0.0.1:8000/api/accounts', accountData);
}

const uploadImageAPI = (formData) =>{
    return axios.post('http://127.0.0.1:8000/api/upload-image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

const updateAccountAPI = (ma_tk,email,password)=>{
    const account = JSON.parse(localStorage.getItem('account'));
    return axios.put(`http://127.0.0.1:8000/api/accounts/${ma_tk}`, {
        email: email,
        mat_khau: password,
        trang_thai:1,
        ma_phan_quyen: account.ma_quyen,
    });
}

const updateUserAPI = (ma_tk,name,avatar) =>{
    return axios.put(`http://127.0.0.1:8000/api/users/${ma_tk}`, {
        ten_user: name,
        anh_dai_dien: avatar,
    });
}

const getFunctionalDetail = async (maPhanQuyen, maChucNang) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/functional-details`, {
        params: {
          ma_phan_quyen: maPhanQuyen,
          ma_chuc_nang: maChucNang,
        },
      });
      return response.data; // Dữ liệu trả về từ API
    } catch (error) {
      console.error('Lỗi khi gọi API getFunctionalDetail:', error.response?.data || error.message);
      throw error; // Ném lỗi để xử lý bên ngoài
    }
  };

export {loginAPI, createAccountAPI, uploadImageAPI,updateAccountAPI,updateUserAPI,getFunctionalDetail};