
import { createContext, useRef, useState } from "react";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [isBgCover, setBgCover] = useState(false); 

     const contextValue = {
        isBgCover,
        setBgCover
     }

     return(
        <AdminContext.Provider value={contextValue}>
            {props.children}
        </AdminContext.Provider>
     )
}

export default AdminContextProvider