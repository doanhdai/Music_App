import { createBrowserRouter } from "react-router-dom";
import React, { Component } from "react";


import config from "../config";


const Home = React.lazy(() => import("../pages/User/Home/Home"))
const HomeIndex = React.lazy(()=> import("../components/DisplayHome"))
const FullAlbum = React.lazy(()=> import("../components/FullAlbums"))
const FullArtists = React.lazy(()=>import("../components/FullArtists"))
const FullSongPopular = React.lazy(()=>import("../components/FullSongPopular"))
const AlbumSongs = React.lazy(()=>import("../components/DisplayAlbum"))
const ArtistSongs = React.lazy(()=>import("../components/DisplayArtist"))
const Song = React.lazy(()=>import("../components/DetailSong"))

const ArtistLayout = React.lazy(() => import("../pages/artist/ArtistLayout"))
const ArtistSongPage = React.lazy(() => import("../pages/artist/ArtistSongPage"))
const ArtistAlbumPage = React.lazy(() => import("../pages/artist/ArtistAlbumPage"))

const routes = createBrowserRouter([
    {
        path: config.routes.Home,
        Component : Home,
        children : [
            {
                index : true,
                Component : HomeIndex
            },
            {
                path : config.routes.Albums,
                Component : FullAlbum
            },
            {
                path : config.routes.FullSong,
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
            },
            {
                path : config.routes.Song,
                Component : Song
            }
            
        ]
    },
    {
        path: config.routes.artistSite,
        Component : ArtistLayout,
        children : [
            {   index : true,
                path:"song",
                Component: ArtistSongPage
            },
            {
                path:"album",
                Component: ArtistAlbumPage
            }
        ]
    }
   
])


export default routes;
