import { createBrowserRouter } from "react-router-dom";
import React, { Component } from "react";
import config from "../config";
import DisplayHome from "../components/DisplayHome";
import FullAlbums from "../components/FullAlbums";
import LoadLazy from "../components/LoadLazy";


const Home = React.lazy(() => import("../pages/User/Home/Home"))
// const FullAlbums =React.lazy(()=> import("../components/FullAlbums"))
const FullArtists = React.lazy(()=>import("../components/FullArtists"))
const FullSongPopular = React.lazy(()=>import("../components/FullSongPopular"))
const AlbumSongs = React.lazy(()=>import("../components/DisplayAlbum"))
const ArtistSongs = React.lazy(()=>import("../components/DisplayArtist"))



const routes = createBrowserRouter([
    {
        path: config.routes.Home,
        Component : Home,
        children : [
            {
                index : true,
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
            },
            {
                path : config.routes.AlbumSongs,
                Component : AlbumSongs
            },
            {
                path : config.routes.ArtistSongs,
                Component : ArtistSongs
            }
            
        ]
    },
   
])


export default routes