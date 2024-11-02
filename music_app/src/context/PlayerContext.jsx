import { createContext, useEffect, useRef, useState } from 'react';
// import axios from 'axios';
import { songsData } from '../assets/assets';
export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    const scrollHomeRef = useRef();
    const bgHomeHeader = useRef();

    const [loadingTrack, setLoadingTrack] = useState(false);
    // const [user, setUser] = useState(false);
    // const [usersData, setUsersData] = useState([]);
    // const [songsData, setSongsData] = useState([]);
    // const [albumsData, setAlbumsData] = useState([]);
    // const [playlistsData, setPlaylistsData] = useState([]);
    // const [artistsData, setArtistsData] = useState([]); 
    // const [genresData, setGenresData] = useState([]);
    // const [concertsData, setConcertsData] = useState([]);
    const [track, setTrack] = useState(songsData[0] || { file: "" });
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

    

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume; // Thiết lập âm lượng ban đầu
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
        // songsData,
        // albumsData,
        // playlistsData,
        // artistsData,
        // genresData,
        // concertsData,
        setVolume: updateVolume,
    };

    return( 
    <PlayerContext.Provider value={contextValue}>
        {props.children}
        
    </PlayerContext.Provider>
    )
};

export default PlayerContextProvider;
