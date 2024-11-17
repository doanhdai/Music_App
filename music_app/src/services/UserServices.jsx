import axios from "axios";
const loginAPI = (email, password) =>{
    return axios.post("http://127.0.0.1:8000/api/login",{email, password});
}

const getAccountAPI = (ma_tk) =>{
    return axios.get(`http://127.0.0.1:8000/api/accounts/${ma_tk}`);
}
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

export {loginAPI,getAccountAPI, createAccountAPI, uploadImageAPI};