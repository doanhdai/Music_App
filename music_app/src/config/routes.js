
const routes = {
    Home: '/',
    Artist: '/artist',
    Albums: '/albums',
    AlbumSongs: '/albums/:id',
    ArtistSongs: '/artist/:id',
    Song: '/song/:id',
    FullSong: '/songs',
    logIn: "/authentication/log-in",
    forgetPass: "/authentication/log-in/forgetPass",
    resetPass: "/authentication/log-in/resetPass",
    search: "/search",
    signIn: "/authentication/sign-in",
    signPass: "/authentication/sign-in/signPass",
    signInfo: "/authentication/sign-in/signInfo",
    notFound: "*",

    artistSite: "/artist-site",
    artistSongPage: "song",
    artistAlbumPage: "album",
    artistWithdrawalPage: "withdrawal",
    artistStatistcatPage: "statistic",

    AdminHome: "/admin",
    ManagerSong: "Manager_song",
    ManagerAlbum: "Manager_album",
    ManagerType: "Manager_type",
    ManagerPremium: "Manager_premium",
    ManagerAds: "Manager_ads",
    ManagerQuyen: "Manager_quyen",
    ManagerStatistical: "Manager_statistical",
    AdsContract: "contract",

    AccountAdmin: "account_admin",
    UserInfo: "/UserInfo",
    ManagerPremiumUser: "/UserInfo/premium",
    ArtistUser: "/UserInfo/artist",
    Playlist: "/playlist/:id",

    PremiumSection: "buyPremium",
    PremiumPay: "/PremiumPay/:ma_goi",
    CategorySong:"/category/:id",

    SongLiked : "/song_like"
};

export default routes;
