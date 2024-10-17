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
    
    AdminHome: "/admin"


}

export default routes;
