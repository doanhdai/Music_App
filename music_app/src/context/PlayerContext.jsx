import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  const scrollHomeRef = useRef();
  const bgHomeHeader = useRef();
  const url_api = "http://localhost:8000";

  const [loadingTrack, setLoadingTrack] = useState(false);
  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [playlistsData, setPlaylistsData] = useState([]);
  const [artistsData, setArtistsData] = useState([]);
  const [genresData, setGenresData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  // const [currentAccount, setCurrentAccount] = useState('');
  // const [detailPlaylist, setDetailPlaylist] = useState([]);
  // const [songsPlaylist, setSongsPlaylist] = useState([]);
  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [volume, setVolume] = useState(1);
  const [thongbaoList, setThongbaoList] = useState([]);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const getLastNumberFromCode = (code) => {
    const match = code.match(/\d+$/);
    return match ? parseInt(match[0], 10) : null;
  };

  //lấy tài khoản hiện tại của người dùng khi đã đăng nhập
  // const getAccount = async () => {
  const account = JSON.parse(localStorage.getItem("account")) || "ccc";
  const currentAccount = account.ma_tk;
  // setCurrentAccount(currentAcc.ma_tk);
  // };

  useEffect(() => {
    getSongsData();
    getAlbumsData();
    getPlaylistsData();
    getArtistsData();
    getGenresData();
    getAllUsersData();

    // getSongByPlaylistData();
  }, []);

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url_api}/api/songs`);
      const filteredSongs = response.data.data.filter(
        (song) => song.chat_luong === "Thấp"
      );
      setSongsData(filteredSongs);
      // console.log(filteredSongs)
    } catch (error) {
      console.error(error);
    }
  };

  const getArtistsData = async () => {
    try {
      const response = await axios.get(`${url_api}/api/songs/artists`);
      setArtistsData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url_api}/api/albums/list-albums`);
      setAlbumsData(response.data.albums);
    } catch (error) {
      console.error(error);
    }
  };

  const getGenresData = async () => {
    try {
      const response = await axios.get(`${url_api}/api/genres`);
      setGenresData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getPlaylistsData = async () => {
    try {
      const response = await axios.get(
        `${url_api}/api/playlist/${currentAccount}`
      );
      setPlaylistsData(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.error(error);
      // console.log(currentAccount);
    }
  };
  const getAllUsersData = async () => {
    try {
      const response = await axios.get(`${url_api}/api/users`);
      setUsersData(response.data);
      // console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  const play = () => {
    if (audioRef.current) {
      const savedState = JSON.parse(localStorage.getItem("musicPlayerState"));
      if (savedState?.currentTime) {
        audioRef.current.currentTime = savedState.currentTime;
      }

      audioRef.current
        .play()
        .then(() => {
          setPlayStatus(true);
        })
        .catch((error) => {
          console.error("Lỗi khi phát nhạc:", error);
        });
    }
  };

  const pause = () => {
    if (audioRef.current && playStatus) {
      audioRef.current.pause();
      setPlayStatus(false);

      localStorage.setItem(
        "musicPlayerState",
        JSON.stringify({ track, currentTime: audioRef.current.currentTime })
      );
    }
  };

  const playWithId = async (id) => {
    const song = songsData.find((item) => id === item.ma_bai_hat);

    if (song) {
      setTrack(song);
      localStorage.removeItem("musicPlayerState");
      localStorage.setItem(
        "musicPlayerState",
        JSON.stringify({
          track: song,
          currentTime: 0,
        })
      );

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = song.link_bai_hat;
        audioRef.current.oncanplay = () => {
          audioRef.current.play();
          setPlayStatus(true);
        };
      }
    }
  };

  const next = async () => {
    const currentIndex = getLastNumberFromCode(track.ma_bai_hat);
    if (currentIndex < songsData.length - 1) {
      const nextTrack = songsData[currentIndex];

      setLoadingTrack(true);
      setTrack(nextTrack);

      // Xóa dữ liệu bài hát cũ và set dữ liệu mới
      localStorage.removeItem("musicPlayerState");
      localStorage.setItem(
        "musicPlayerState",
        JSON.stringify({
          track: nextTrack,
          currentTime: 0,
        })
      );

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = nextTrack.link_bai_hat;

        // Lắng nghe sự kiện oncanplay để phát nhạc
        audioRef.current.oncanplay = () => {
          audioRef.current.play();
          setPlayStatus(true);
        };
      }

      setLoadingTrack(false);
    }
  };

  const previous = async () => {
    const currentIndex = getLastNumberFromCode(track.ma_bai_hat);
    if (currentIndex > 1) {
      const previousTrack = songsData[currentIndex - 2];

      setLoadingTrack(true);
      setTrack(previousTrack);

      // Xóa dữ liệu bài hát cũ và set dữ liệu mới
      localStorage.removeItem("musicPlayerState");
      localStorage.setItem(
        "musicPlayerState",
        JSON.stringify({
          track: previousTrack,
          currentTime: 0,
        })
      );

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = previousTrack.link_bai_hat;
        audioRef.current.oncanplay = () => {
          audioRef.current.play();
          setPlayStatus(true);
        };
      }

      setLoadingTrack(false);
    }
  };

  const seekSong = (e) => {
    if (audioRef.current) {
      const newCurrentTime =
        (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
        audioRef.current.duration;

      audioRef.current.currentTime = newCurrentTime;

      // Cập nhật localStorage với thời gian mới
      const currentState =
        JSON.parse(localStorage.getItem("musicPlayerState")) || {};
      currentState.currentTime = newCurrentTime;
      if (seekBar.current) {
        currentState.seekBarWidth =
          Math.floor((newCurrentTime / audioRef.current.duration) * 100) + "%";
      }
      localStorage.setItem("musicPlayerState", JSON.stringify(currentState));
    }
  };

  const updateVolume = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const muteVolume = () => {
    setVolume(0);
    if (audioRef.current) {
      audioRef.current.volume = 0;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    const updateTime = () => {
      if (audioRef.current.readyState >= 2) {
        seekBar.current.style.width =
          Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          ) + "%";
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
    const savedState = localStorage.getItem("musicPlayerState");

    if (savedState) {
      const {
        track: savedTrack,
        currentTime,
        seekBarWidth,
      } = JSON.parse(savedState);

      // Thiết lập bài hát và thời gian hiện tại
      setTrack(savedTrack);

      if (audioRef.current) {
        audioRef.current.src = savedTrack.link_bai_hat;
        audioRef.current.currentTime = currentTime || 0;

        // Nếu có thông tin seekBar, thiết lập lại
        if (seekBar.current && seekBarWidth) {
          seekBar.current.style.width = seekBarWidth;
        }
      }
    }
  }, []);

  useEffect(() => {
    if (songsData.length > 0) {
      const savedState = JSON.parse(localStorage.getItem("musicPlayerState"));

      if (savedState && savedState.track) {
        setTrack(savedState.track);
        if (audioRef.current) {
          audioRef.current.src = savedState.track.link_bai_hat;
          audioRef.current.currentTime = savedState.currentTime || 0;
        }
      } else {
        setTrack(songsData[0]);
        if (audioRef.current) {
          audioRef.current.src = songsData[0].link_bai_hat;
          audioRef.current.currentTime = 0;
        }
      }
    }
  }, [songsData]);

  useEffect(() => {
    if (track) {
      const currentState = {
        track,
        currentTime: audioRef.current?.currentTime || 0,
      };
      if (seekBar.current) {
        currentState.seekBarWidth = seekBar.current.style.width;
      }

      localStorage.setItem("musicPlayerState", JSON.stringify(currentState));
    }
  }, [track, playStatus, time]);

  const getThongbaoList = async () => {
    try {
      const response = await axios.get(`${url_api}/api/notifications`);
      setThongbaoList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const contextValue = {
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
    songsData,
    albumsData,
    currentAccount,
    usersData,
    // songsPlaylist,
    // detailPlaylist,
    playlistsData,
    setPlaylistsData,
    artistsData,
    genresData,
    setVolume: updateVolume,
    muteVolume,
    thongbaoList
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
