import { createBrowserRouter } from "react-router-dom";
import React, { Component } from "react";


import config from "../config";

const Home = React.lazy(() => import("../pages/User/Home/Home"));
const HomeIndex = React.lazy(() => import("../components/DisplayHome"));
const FullAlbum = React.lazy(() => import("../components/FullAlbums"));
const FullArtists = React.lazy(() => import("../components/FullArtists"));
const FullSongPopular = React.lazy(() => import("../components/FullSongPopular"));
const AlbumSongs = React.lazy(() => import("../components/DisplayAlbum"));
const ArtistSongs = React.lazy(() => import("../components/DisplayArtist"));
const Song = React.lazy(() => import("../components/DetailSong"));
const Login = React.lazy(() => import("../pages/User/Authentication/Login"));
const LoginIndex = React.lazy(() => import("../components/authentication/DisplayLogin"));
const ForgetPass = React.lazy(() => import("../components/authentication/ForgetPassword"));
const ResetPass = React.lazy(() => import("../components/authentication/ResetPassword"));
const Signin = React.lazy(() => import("../pages/User/Authentication/Signin"));
const SigninIndex = React.lazy(() => import("../components/authentication/SignName"));
const SignPass = React.lazy(() => import("../components/authentication/SignPassword"));
const SignInfo = React.lazy(() => import("../components/authentication/SignInfo"));
const NotFound = React.lazy(() => import("../pages/NotFound"));


const ArtistLayout2 = React.lazy(() => import("../pages/artist/ArtistLayout2"))
const ArtistSongPage = React.lazy(() => import("../pages/artist/ArtistSongPage"))
const ArtistAlbumPage = React.lazy(() => import("../pages/artist/ArtistAlbumPage"))
const ArtistWithdrawalRequestPage = React.lazy(() => import("../pages/artist/ArtistWithdrawalRequestPage"))
const ArtistStatisticPage = React.lazy(() => import("../pages/artist/ArtistStatisticPage"))

const AdminHome = React.lazy(()=>import("../pages/Admin/Admin"))
const ManagerAccount = React.lazy(()=>import("../components/Admin/ManagerAccount"))
const ManagerSong = React.lazy(()=>import("../components/Admin/ManagerSong"))
const ManagerAlbum = React.lazy(()=>import("../components/Admin/ManagerAlbum"))
const ManagerType = React.lazy(()=>import("../components/Admin/ManagerType"))
const ManagerPemium = React.lazy(()=>import("../components/Admin/ManagerPremium"))


const routes = createBrowserRouter([
    {
      path: config.routes.Home,
      Component: Home,
      children: [
        {
          index: true,
          Component: HomeIndex,
        },
        {
          path: config.routes.Albums,
          Component: FullAlbum,
        },
        {
          path: config.routes.FullSong,
          Component: FullSongPopular,
        },
        {
          path: config.routes.Artist,
          Component: FullArtists,
        },
        {
          path: config.routes.AlbumSongs,
          Component: AlbumSongs,
        },
        {
          path: config.routes.ArtistSongs,
          Component: ArtistSongs,
        },
        {
          path: config.routes.Song,
          Component: Song,
        },
      ],
    },
    {
      path: config.routes.notFound,
      Component: NotFound,
    },
    {
      path: config.routes.logIn,
      Component: Login,
      children: [
        {
          index: true,
          Component: LoginIndex,
        },
        {
          path: config.routes.forgetPass,
          Component: ForgetPass,
        },
        {
          path: config.routes.resetPass,
          Component: ResetPass,
        },
      ],
    },
  
    {
      path: config.routes.signIn,
      Component: Signin,
      children: [
        {
          index: true,
          Component: SigninIndex,
        },
        {
          path: config.routes.signPass,
          Component: SignPass,
        },
        {
          path: config.routes.signInfo,
          Component: SignInfo,
        },
      ],
    },
    {
        path: config.routes.artistSite,
        Component : ArtistLayout2,
        children : [
            {   
              index : true,
              Component: ArtistSongPage
            },
            {
                path:"album",
                Component: ArtistAlbumPage
            },
            {
              path:"widthdrawal",
              Component: ArtistWithdrawalRequestPage
            },
            {
              path:"statistic",
              Component: ArtistStatisticPage
            }
        ]
    },
    {
    path: config.routes.signIn,
    Component: Signin,
    children: [
      {
        index: true,
        Component: SigninIndex,
      },
      {
        path: config.routes.signPass,
        Component: SignPass,
      },
      {
        path: config.routes.signInfo,
        Component: SignInfo,
      },
    ],
  },
  {
    path :config.routes.AdminHome,
    Component: AdminHome,
    children :[
      {
        index: true,
        Component: ManagerAccount
      },
      {
        path:config.routes.ManagerSong,
        Component: ManagerSong
      },
      {
        path:config.routes.ManagerAlbum,
        Component: ManagerAlbum
      },
      {
        path:config.routes.ManagerType,
        Component: ManagerType
      },
      {
        path:config.routes.ManagerPremium,
        Component: ManagerPemium
      },
    ]
  }
]);

  


export default routes;
