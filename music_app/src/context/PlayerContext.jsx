import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Index from "../pages/NotFound";

export const PlayerContext = createContext();
let playedSongData = []; //biến này lưu mã 3 bài gần nhất theo thứ tự đã nghe, để phục vụ cho back song nút previous
const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  const scrollHomeRef = useRef();
  const bgHomeHeader = useRef();
  const url_api = "http://localhost:8000";
  const [songDataById, setSongDataById] = useState([]);

  const [loadingTrack, setLoadingTrack] = useState(false);
  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [playlistsData, setPlaylistsData] = useState([]);
  const [artistsData, setArtistsData] = useState([]);
  const [genresData, setGenresData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [realPlayTime, setRealPlayTime] = useState(0);
  const playTimer = useRef(null);
  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [volume, setVolume] = useState(1);
  const [songLiked, setSongLiked] = useState([]);
  const [thongbaoList, setThongbaoList] = useState([]);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });
  const [isCallingAPISongArtist, setIsCallingAPISongArtist] = useState(true);
  const getLastNumberFromCode = (code) => {
    // cái này sẽ sai khi mã bài hát không liên tục: có 19 bài hát nhưng có mã bài hát BH029 thì sẽ sai
    const match = code.match(/\d+$/);
    return match ? parseInt(match[0], 10) : null;
  };

  const getCurrentIndexInSongData = (ma_bai_hat, songList) => {
    return songList.findIndex((element) => element.ma_bai_hat == ma_bai_hat);
  };

  //lấy tài khoản hiện tại của người dùng khi đã đăng nhập
  // const getAccount = async () => {
  const account = JSON.parse(localStorage.getItem("account")) || "";
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
    getLikesData();
    // getSongByPlaylistData();
  }, []);

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url_api}/api/songs`);
      const filteredSongs = response.data.data.filter(
        (song) => song.chat_luong === "Thấp" && song.trang_thai === 1
      );
      setSongsData(filteredSongs);
      // console.log(filteredSongs)
    } catch (error) {
      console.error(error);
    }
  };
  const getLikesData = async () => {
    try {
      const response = await axios.get(
        `${url_api}/api/song/account-like/${currentAccount}`
      );
      const filteredSongs = response.data.data.filter(
        (song) => song.trang_thai === 1
      );

      setSongLiked(filteredSongs);
    } catch (error) {
      console.log(error);
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
      // console.error(error);
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

  const saveToPlayedSongData = (ma_bai_hat) => {
    if (playedSongData.length < 11) {
      //luuw vafo marng 10 bai da nghe de lat chay trong previous
      const song = playedSongData.find((song) => song == ma_bai_hat);
      if (song == undefined) {
        playedSongData.push(ma_bai_hat);
      }
    }
  };

  const play = () => {
    if (audioRef.current) {
      const savedState = JSON.parse(localStorage.getItem("musicPlayerState"));
      if (savedState?.currentTime) {
        audioRef.current.currentTime = savedState.currentTime;
        saveToPlayedSongData(savedState.track.ma_bai_hat);
      }

      audioRef.current
        .play()
        .then(() => {
          setPlayStatus(true);

          // Bắt đầu tăng thời gian thực đã phát
          if (!playTimer.current) {
            playTimer.current = setInterval(() => {
              setRealPlayTime((prevTime) => prevTime + 1);
            }, 1000);
          }
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
      if (playTimer.current) {
        clearInterval(playTimer.current);
        playTimer.current = null;
      }
    }
  };

  const playWithId = async (id) => {
    const song = songsData.find((item) => id === item.ma_bai_hat);
    if (song) {
      saveToPlayedSongData(id);
      setTrack(song);
      setRealPlayTime(0);
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
          if (!playTimer.current) {
            playTimer.current = setInterval(() => {
              setRealPlayTime((prevTime) => prevTime + 1);
            }, 1000);
          }
        };
      }
    }
  };

  useEffect(() => {
    return () => {
      if (playTimer.current) {
        clearInterval(playTimer.current);
        playTimer.current = null;
      }
    };
  }, []);
  const next = async () => {
    let songsList = songDataById.length === 0 ? songsData : songDataById;
    let currentIndex = getCurrentIndexInSongData(track.ma_bai_hat, songsList);
    if (currentIndex == songsList.length - 1) {
      setSongDataById([]);
      currentIndex = -1;
      songsList = songsData;
    }
    if (currentIndex < songsList.length - 1) {
      const nextTrack = songsList[currentIndex + 1];
      setLoadingTrack(true);
      setRealPlayTime(0);
      setTrack(nextTrack);
      saveToPlayedSongData(nextTrack.ma_bai_hat);

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
    if (playedSongData.length !== 0) {
      const ma_bai_hat_Current = track.ma_bai_hat;
      const index = playedSongData.findIndex(
        (song) => song === ma_bai_hat_Current
      );
      if (index !== -1) {
        let removedSong = playedSongData.splice(index, 1)[0];
      }
      const ma_bai_hat = playedSongData.pop();
      const previousTrack = songsData.find(
        (item) => item.ma_bai_hat == ma_bai_hat
      );
      setLoadingTrack(true);
      setRealPlayTime(0);
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
    // const songsList = playedSongData
    // const currentIndex = getCurrentIndexInSongData(track.ma_bai_hat, songsList);
    // if (currentIndex > 0) {
    //   const previousTrack = songsList[currentIndex - 1];

    //   setLoadingTrack(true);
    //   setRealPlayTime(0)
    //   setTrack(previousTrack);

    //   // Xóa dữ liệu bài hát cũ và set dữ liệu mới
    //   localStorage.removeItem("musicPlayerState");
    //   localStorage.setItem(
    //     "musicPlayerState",
    //     JSON.stringify({
    //       track: previousTrack,
    //       currentTime: 0,
    //     })
    //   );

    //   if (audioRef.current) {
    //     audioRef.current.pause();
    //     audioRef.current.src = previousTrack.link_bai_hat;
    //     audioRef.current.oncanplay = () => {
    //       audioRef.current.play();
    //       setPlayStatus(true);
    //     };
    //   }

    //   setLoadingTrack(false);
    // }
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
    realPlayTime,
    playlistsData,
    setPlaylistsData,
    artistsData,
    genresData,
    setVolume: updateVolume,
    muteVolume,
    thongbaoList,
    songDataById,
    setSongDataById,

    songLiked,
    setSongLiked,

    isCallingAPISongArtist,
    setIsCallingAPISongArtist,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
