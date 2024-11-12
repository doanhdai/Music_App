import axios from "axios";
const loginAPI = (email, password) =>{
    return axios.post("http://127.0.0.1:8000/api/login",{email, password});
}

export {loginAPI};