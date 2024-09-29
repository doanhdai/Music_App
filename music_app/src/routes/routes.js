import { createBrowserRouter } from "react-router-dom";
import React from "react";
import config from "../config";
import DisplayHome from "../components/DisplayHome";



const Home = React.lazy(() => import("../pages/User/Home/Home"))
const FullAlbums =React.lazy(()=> import("../components/FullAlbums"))
const FullArtists = React.lazy(()=>import("../components/FullArtists"))
const FullSongPopular = React.lazy(()=>import("../components/FullSongPopular"))


const routes = createBrowserRouter([
    {
        path: config.routes.Home,
        Component : Home,
        children : [
            {
                index: true,
                Component : DisplayHome
            },
            {
                path : config.routes.Albums,
                Component : FullAlbums
            },
            {
                path : config.routes.Song,
                Component : FullSongPopular
            },
            {
                path : config.routes.Artist,
                Component : FullArtists
            }
        ]
    }
])


export default routes