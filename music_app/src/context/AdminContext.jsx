import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
   const url = "http://localhost:8000";
   const [isBgCover, setBgCover] = useState(false);
   const [accountsData, setAccountsData] = useState([])

   const getAccountsData = async() => {
      try {
         const res = await axios.get(`${url}/api/accounts`);
         setAccountsData(res.data);
         console.log(res.data);        
      } catch (error) {
         console.log(error)
      }
   }




   useEffect(()=>{
      getAccountsData()
   },[])


   const contextValue = {
      isBgCover,
      setBgCover,
      accountsData
   };

   return (
      <AdminContext.Provider value={contextValue}>
         {props.children}
      </AdminContext.Provider>
   );
};

export default AdminContextProvider;
