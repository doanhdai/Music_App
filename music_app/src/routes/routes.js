import { createBrowserRouter } from "react-router-dom";
import React, { Component } from "react";


import config from "../config";

const Home = React.lazy(() => import("../pages/User/Home/Home"));
const HomeIndex = React.lazy(() => import("../components/DisplayHome"));
const FullAlbum = React.lazy(() => import("../components/FullAlbums"));
const FullArtists = React.lazy(() => import("../components/FullArtists"));
const FullSongPopular = React.lazy(() => import("../components/FullSongPopular"));
const ArtistLayout2 = React.lazy(() => import("../pages/artist/ArtistLayout2"))
const ArtistSongPage = React.lazy(() => import("../pages/artist/ArtistSongPage"))
const ArtistAlbumPage = React.lazy(() => import("../pages/artist/ArtistAlbumPage"))
const ArtistWithdrawalRequestPage = React.lazy(() => import("../pages/artist/ArtistWithdrawalRequestPage"))
const ArtistStatisticPage = React.lazy(() => import("../pages/artist/ArtistStatisticPage"));
const AdminHome = React.lazy(()=>import("../pages/Admin/Admin"))
const ManagerAccount = React.lazy(()=>import("../components/Admin/AccountManager/ManagerAccount"))
const ManagerSong = React.lazy(()=>import("../components/Admin/ManagerSong"))
const ManagerAlbum = React.lazy(()=>import("../components/Admin/ManagerAlbum"))
const ManagerType = React.lazy(()=>import("../components/Admin/ManagerType"))
const ManagerPremium = React.lazy(()=>import("../components/Admin/ManagerPremium"))
const ManagerAds = React.lazy(()=>import("../components/Admin/ManagerAds"))
const ManagerQuyen = React.lazy(()=>import("../components/Admin/ManagerQuyen"))
const ManagerStatistical = React.lazy(()=>import("../components/Admin/ManagerStatistical"))
const AccountAdmin = React.lazy(()=> import("../components/Admin/AccountAdmin"))
const search = React.lazy(()=> import("../components/Search"))
const AlbumSongs = React.lazy(() => import("../components/DisplayAlbum"));
const ArtistSongs = React.lazy(() => import("../components/DisplayArtist"));
const Song = React.lazy(() => import("../components/DetailSong"));
const Login = React.lazy(() => import("../pages/User/Authentication/Login"));
const LoginIndex = React.lazy(() => import("../components/Authentication/DisplayLogin"));
const ForgetPass = React.lazy(() => import("../components/Authentication/ForgetPassword"));
const ResetPass = React.lazy(() => import("../components/Authentication/ResetPassword"));
const Signin = React.lazy(() => import("../pages/User/Authentication/Signin"));
const SigninIndex = React.lazy(() => import("../components/Authentication/SignEmail"));
const SignPass = React.lazy(() => import("../components/Authentication/SignPassword"));
const SignInfo = React.lazy(() => import("../components/Authentication/SignInfo"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
const UserInfoLayout = React.lazy(() => import("../pages/User/UserInfo/UserInfo"));
const UserInfo = React.lazy(() => import("../components/UserInfo/ManagerUserInfo"));
const ManagerPremiumUser = React.lazy(() => import("../components/UserInfo/ManagerPremiumUser"));
const ArtistUser = React.lazy(() => import("../components/UserInfo/ArtistUser"));

const PremiumSection = React.lazy(()=>import("../components/premium/PremiumSection"))
const DisplayPlaylist = React.lazy(() => import("../components/DisplayPlaylist"))
const InforAdsPage = React.lazy(() => import("../components/Admin/InforAdsPage"))
const ContractAdsPage = React.lazy(() => import("../components/Admin/ContractAdsPage"))

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
      {
        path: config.routes.search,
        Component: search,
      },
      {
        path: config.routes.Playlist,
        Component: DisplayPlaylist
      },
      {
        path: config.routes.PremiumSection,
        Component: PremiumSection
      }
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
    Component: ArtistLayout2,
    children: [
      {
        index: true,
        Component: ArtistSongPage,
      },
      {
        path: "album",
        Component: ArtistAlbumPage,
      },
      {
        path: "widthdrawal",
        Component: ArtistWithdrawalRequestPage,
      },
      {
        path: "statistic",
        Component: ArtistStatisticPage,
      },
    ],
  },
  {
    path: config.routes.AdminHome,
    Component: AdminHome,
    children: [
      {
        index: true,
        Component: ManagerAccount,
      },
      {
        path: config.routes.ManagerSong,
        Component: ManagerSong,
      },
      {
        path: config.routes.ManagerAlbum,
        Component: ManagerAlbum,
      },
      {
        path: config.routes.ManagerType,
        Component: ManagerType,
      },
      {
        path: config.routes.ManagerPremium,
        Component: ManagerPremium,
      },
      {
        path: config.routes.ManagerAds,
        Component: ManagerAds,
        children: [
          {
            index: true,
            Component: InforAdsPage,
          },
          {
            path: config.routes.AdsContract,
            Component: ContractAdsPage,
          },
        ],
      },
      {
        path: config.routes.ManagerQuyen,
        Component: ManagerQuyen,
      },
      {
        path: config.routes.ManagerStatistical,
        Component: ManagerStatistical,
      },
      {
        path: config.routes.AccountAdmin,
        Component: AccountAdmin,
      },
    ],
  }, {
    path: config.routes.UserInfo,
    Component: UserInfoLayout,
    children: [
      {
        index: true,
        Component: UserInfo,
      
      },
      {
        path: config.routes.ManagerPremiumUser,
        Component: ManagerPremiumUser,
      },
      {
        path: config.routes.ArtistUser,
        Component: ArtistUser,
      },
    ],
  },
]);

export default routes;