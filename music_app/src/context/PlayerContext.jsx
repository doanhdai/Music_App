
import { createContext, useRef } from "react";

export const PlayerContext = createContext()

const PlayerContextProvider = (props) => {

    const audio = useRef()

     const contextValue = {
        audio
     }

     return(
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
     )
}

export default PlayerContextProvider