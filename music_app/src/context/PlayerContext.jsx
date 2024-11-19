import { createContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    const scrollHomeRef = useRef();
    const bgHomeHeader = useRef();
    const url = "http://localhost:8000";

    const [loadingTrack, setLoadingTrack] = useState(false);
    // const [user, setUser] = useState(false);
    // const [usersData, setUsersData] = useState([]);
    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    // const [playlistsData, setPlaylistsData] = useState([]);
    // const [artistsData, setArtistsData] = useState([]); 
    const [genresData, setGenresData] = useState([]);
    // const [concertsData, setConcertsData] = useState([]);
    const [adsContractData, setAdsContractData] = useState([]);
    const [track, setTrack] = useState(null);
    const [playStatus, setPlayStatus] = useState(false);
    const [volume, setVolume] = useState(1);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0,
        },
        totalTime: {
            second: 0,
            minute: 0,
        },
    });


    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    };

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    };

    const playWithId = async (id) => {
        await songsData.map((item) => {
            if (id === item._id) {
                setTrack(item);
                console.log(item);
            }
        });
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayStatus(true);
    };
    const updateVolume = (newVolume) => {
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };
    const muteVolume = async () => {
        await setVolume(0)
    }

    // const currentPlaylist = songsData?.filter((song) => song.playlist === track?.playlist) || [];

    const previous = async () => {
        // if (track && currentPlaylist.length > 0) {
        //     const currentIndex = currentPlaylist.findIndex((song) => song._id === track._id);
        //     if (currentIndex > 0) {
        //         await setTrack(currentPlaylist[currentIndex - 1]);
        //         await audioRef.current.play();
        //         setPlayStatus(true);
        //     }
        // }

        if (track.id >= 1) {
            setLoadingTrack(true);
            await setTrack(songsData[track.id - 1]);
            await audioRef.current.play();
            setLoadingTrack(false);
            setPlayStatus(true);
        }
    };

    const next = async () => {
        // if (track && currentPlaylist.length > 0) {
        //     const currentIndex = currentPlaylist.findIndex((song) => song._id === track._id);
        //     if (currentIndex < currentPlaylist.length - 1) {
        //         await setTrack(currentPlaylist[currentIndex + 1]);
        //         await audioRef.current.play();
        //         setPlayStatus(true);
        //     }
        // }

        if (track.id < songsData.length - 1) {
            setLoadingTrack(true);
            await setTrack(songsData[track.id + 1]);
            await audioRef.current.play();
            setLoadingTrack(false);
            setPlayStatus(true);
        }
    };

    const seekSong = async (e) => {
        audioRef.current.currentTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
    };


    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/api/songs`);
            setSongsData(response.data.data);
            // console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getAlbumsData = async () => {
        try {
            const response = await axios.get(`${url}/api/albums`);
            setAlbumsData(response.data.albums);
            // console.log(response.data.albums);
        } catch (error) {
            console.log(error);
        }
    };
    const getGenresData = async () => {
        try {
            const response = await axios.get(`${url}/api/genres`);
            setGenresData(response.data.data);
            // console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };



    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
        const updateTime = () => {
            if (audioRef.current.readyState >= 2) {
                seekBar.current.style.width =
                    Math.floor((audioRef.current.currentTime / audioRef.current.duration) * 100) + '%';
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60),
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60),
                    },
                });
            }
        };

        if (audioRef.current) {
            audioRef.current.ontimeupdate = updateTime;
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.ontimeupdate = null;
            }
        };
    }, [audioRef, loadingTrack]);

    useEffect(() => {
        //   getUsersData();
        getSongsData();
        getAlbumsData();
        //   getPlaylistsData();
        //   getArtistData();
        getGenresData();
        //   getConcertsData();
        getAdsContract();
    }, []);
    useEffect(() => {
        if (songsData.length > 0 && track === null) {
            setTrack(songsData[0]);
        }
    }, [songsData]);


    //Phan cua oanh
    const getAdsContract = async () => {
        try {
            const response = await axios.get(`${url}/api/advertising-contracts`);
            setAdsContractData(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    //end cua oanh

    const contextValue = {
        // user,
        // setUser,
        audioRef,
        scrollHomeRef,
        bgHomeHeader,
        seekBg,
        seekBar,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
        // usersData,
        songsData,
        albumsData,
        // playlistsData,
        // artistsData,
        genresData,
        adsContractData,
        // concertsData,
        setVolume: updateVolume,
        muteVolume
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}

        </PlayerContext.Provider>
    )
};

export default PlayerContextProvider;
