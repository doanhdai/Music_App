

const routes = {
    Home : '/',
    Artist : '/artist',
    Albums: '/albums',
    AlbumSongs : '/albums/:id',
    ArtistSongs : '/artist/:id',
    Song : '/song/:id',
    FullSong    :   '/songs',
    logIn: "/authentication/log-in",
    forgetPass: "/authentication/log-in/forgetPass",
    resetPass: "/authentication/log-in/resetPass",
    
    signIn: "/authentication/sign-in",
    signPass: "/authentication/sign-in/signPass",
    signInfo: "/authentication/sign-in/signInfo",
    notFound :"*",

    artistSite: "/artist-site",
    artistSongPage: "song",
    artistAlbumPage: "album",
    artistWithdrawalPage: "withdrawal",
    artistStatistcatPage: "statistic",
    
    AdminHome: "/admin",
    ManagerSong:"Manager_song",
    ManagerAlbum:"Manager_album",
    ManagerType: "Manager_type",
    ManagerPremium: "Manager_premium"




}

export default routes;
