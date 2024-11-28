import bell_icon from './bell.png'
import home_icon from './home.png'
import like_icon from './like.png'
import loop_icon from './loop.png'
import mic_icon from './mic.png'
import next_icon from './next.png'
import play_icon from './play.png'
import pause_icon from './pause.png'
import plays_icon from './plays.png'
import prev_icon from './prev.png'
import search_icon from './search.png'
import shuffle_icon from './shuffle.png'
import speaker_icon from './speaker.png'
import stack_icon from './stack.png'
import zoom_icon from './zoom.png'
import plus_icon from './plus.png'
import arrow_icon from './arrow.png'
import mini_player_icon from './mini-player.png'
import queue_icon from './queue.png'
import volume_icon from './volume.png'
import arrow_right from './right_arrow.png'
import arrow_left from './left_arrow.png'
import spotify_logo from './spotify_logo.png'
import clock_icon from './clock_icon.png'
import img1 from './img1.jpg'
import img2 from './img2.jpg'
import img3 from './img3.jpg'
import img4 from './img4.jpg'
import img5 from './img5.jpg'
import img6 from './img6.jpg'
import img7 from './img7.jpg'
import img8 from './img8.jpg'
import img9 from './img9.jpg'
import img10 from './img10.jpg'
import img11 from './img11.jpg'
import img12 from './img12.jpg'
import img13 from './img13.jpg'
import img14 from './img14.jpg'
import img15 from './img15.jpg'
import img16 from './img16.jpg'
import song1 from  './song1.mp3'
import song2 from  './song2.mp3'
import song3 from  './song3.mp3'
import likeSong from './like_song_img.png'
import mck from './mck.jpg'
import not_found from './404-not-found.png'
export const assets = {
    likeSong,
    not_found,
    mck,
    bell_icon,
    home_icon,
    like_icon,
    loop_icon,
    mic_icon,
    next_icon,
    play_icon,
    plays_icon,
    prev_icon,
    search_icon,
    shuffle_icon,
    speaker_icon,
    stack_icon,
    zoom_icon,
    plus_icon,
    arrow_icon,
    mini_player_icon,
    volume_icon,
    queue_icon,
    pause_icon,
    arrow_left,
    arrow_right,
    spotify_logo,
    clock_icon,
    img2,
}
export function removeVietnameseTones(str) {
    str = str.normalize('NFD')
             .replace(/[\u0300-\u036f]/g, '');
    return str;
  }
export function extractDayMonthYear(dateTimeString) {
    const dateObject = new Date(dateTimeString);
  
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const   
   year = dateObject.getFullYear();
  
    return `${day}/${month}/${year}`; 
  
  }
  export function extractYear(dateTimeString) {
    const dateObject = new Date(dateTimeString);
    const year = dateObject.getFullYear();
    return year; 
  
  }
  export  async function getAudioDuration(file) {
    const url = URL.createObjectURL(file);

    return new Promise((resolve) => {
      const audio = document.createElement("audio");
      audio.muted = true; // Mute the audio to avoid unexpected playback

      const source = document.createElement("source");
      source.src = url;

      audio.appendChild(source);
      audio.preload = "metadata"; // Load metadata only

      audio.onloadedmetadata = () => {
        resolve(audio.duration);
        URL.revokeObjectURL(url); // Release the URL object
      };
    });
  }
 export function getTimeHourMinute(dateTimeString) {
    const dateObj = new Date(dateTimeString);
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  
export const albumsData = [
    {   
        id:0,
        name: "Top 50 Global",
        image: img8,
        desc:"Your weekly ",
        bgColor:"#2a4365"
    },
    {   
        id:1,
        name: "Top 50 the world",
        image: img9,
        desc:"Your weekly ",
        bgColor:"#22543d"
    },
    {   
        id:2,
        name: "Trending the world",
        image: img10,
        desc:"Your weekly ",
        bgColor:"#742a2a"
    },
    {   
        id:3,
        name: "Trending Global",
        image: img16,
        desc:"Your weekly update",
        bgColor:"#44337a"
    },
    {   
        id:4,
        name: "Mega Hits",
        image: img11,
        desc:"Your weekly update",
        bgColor:"#234e52"
    },
    {   
        id:5,
        name: "Happy Favorites",
        image: img15,
        desc:"Your weekly up",
        bgColor:"#744210"
    }
]

export const artistData = [
    {   
        id:0,
        name: "Top 50 Global",
        image: img8,
        desc:"Your weekly",
        bgColor:"#2a4365"
    },
    {   
        id:1,
        name: "Top 50 the world",
        image: img9,
        desc:"Your weekly update",
        bgColor:"#22543d"
    },
    {   
        id:2,
        name: "Trending the world",
        image: img10,
        desc:"Your weekly update",
        bgColor:"#742a2a"
    },
    {   
        id:3,
        name: "Trending Global",
        image: img16,
        desc:"Your weekly update",
        bgColor:"#44337a"
    },
    {   
        id:4,
        name: "Mega Hits",
        image: img11,
        desc:"Your weekly update",
        bgColor:"#234e52"
    },
    {   
        id:5,
        name: "Happy Favorites",
        image: img15,
        desc:"Your weekly update",
        bgColor:"#744210"
    }
]

export const songsData = [
    {
        id:0,
        name: "Anh đã ổn hơn",
        image: img1,
        file:song1,
        desc:"Mck",
        duration:"3:00"
    },
    {
        id:1,
        name: "Song Two",
        image: img2,
        file:song2,
        desc:"Put a smile",
        duration:"2:20"
    },
    {
        id:2,
        name: "Song Three",
        image: img3,
        file:song3,
        desc:"Put a smile",
        duration:"2:32"
    },
    {
        id:3,
        name: "Song Four",
        image: img4,
        file:song1,
        desc:"Put a smil",
        duration:"2:50"
    },
    {
        id:4,
        name: "Song Five",
        image: img5,
        file:song2,
        desc:"Put a smile",
        duration:"3:10"
    },
    {
        id:5,
        name: "Song Six",
        image: img14    ,
        file:song3,
        desc:"Put a smile on  ",
        duration:"2:45"
    },
    {
        id:6,
        name: "Song Seven",
        image: img7,
        file:song1,
        desc:"Put a smile  ",
        duration:"2:18"
    },
    {
        id:7,
        name: "Song Eight",
        image: img12,
        file:song2,
        desc:"Put a smile  ",
        duration:"2:35"
    }
]
export const playlistsData = [
    {
        id: 0,
        name: "Playlist Yêu Thích",
        image: img8,
        desc: "Những bài hát yêu thích của tôi",
        songs: [songsData[0], songsData[1], songsData[2]],
        bgColor: "#1a1a1a"
    },
    {
        id: 1,
        name: "Nhạc Tươi Mát",
        image: img9,
        desc: "Bài hát mang lại năng lượng tích cực",
        songs: [songsData[3], songsData[4]], // Danh sách bài hát
        bgColor: "#ffeb3b"
    },
    {
        id: 2,
        name: "Bài Hát Mới Nhất",
        image: img10,
        desc: "Cập nhật những bài hát mới phát hành",
        songs: [songsData[5], songsData[6]], // Danh sách bài hát
        bgColor: "#4caf50"
    },
    {
        id: 3,
        name: "Nhạc Chill",
        image: img11,
        desc: "Những bài hát thư giãn cho buổi tối",
        songs: [songsData[7]], // Danh sách bài hát
        bgColor: "#2196f3"
    },
    {
        id: 4,
        name: "Nhạc Quốc Tế",
        image: img12,
        desc: "Những bài hát nổi tiếng quốc tế",
        songs: [songsData[0], songsData[3]], // Danh sách bài hát
        bgColor: "#e91e63"
    }
];

export const songData2 = [
    {
      "ma_bai_hat": "BH001",
      "ten_bai_hat": "Bài hát 1",
      "thoi_luong": 6,
      "trang_thai": 1,
      "luot_nghe": 3298,
      "hinh_anh": "https://cloudinary-marketing-res.cloudinary.com/image/upload/ar_0.5,c_fill,g_auto,w_433/q_auto/f_auto/hiking_dog_mountain.jpg",
      "ma_album": "AL001",
      "link_bai_hat": "https://example.com/song1.mp3",
      "ngay_phat_hanh": "2023-11-19",
      "ma_artist": "AR004",
      "ma_gia_luot_nghe": "GM002",
      "doanh_thu": 47600
    },
    {
      "ma_bai_hat": "BH002",
      "ten_bai_hat": "Bài hát 2",
      "thoi_luong": 5,
      "trang_thai": 1,
      "luot_nghe": 771,
      "hinh_anh": "https://example.com/image2.jpg",
      "ma_album": "AL002",
      "link_bai_hat": "https://example.com/song2.mp3",
      "ngay_phat_hanh": "2023-08-10",
      "ma_artist": "AR010",
      "ma_gia_luot_nghe": "GM005",
      "doanh_thu": 41062
    },
    {
      "ma_bai_hat": "BH003",
      "ten_bai_hat": "Bài hát 3",
      "thoi_luong": 3,
      "trang_thai": 0,
      "luot_nghe": 3117,
      "hinh_anh": "https://example.com/image3.jpg",
      "ma_album": "AL004",
      "link_bai_hat": "https://example.com/song3.mp3",
      "ngay_phat_hanh": "2023-08-02",
      "ma_artist": "AR006",
      "ma_gia_luot_nghe": "GM002",
      "doanh_thu": 4383
    },
    {
      "ma_bai_hat": "BH004",
      "ten_bai_hat": "Bài hát 4",
      "thoi_luong": 6,
      "trang_thai": 0,
      "luot_nghe": 7753,
      "hinh_anh": "https://example.com/image4.jpg",
      "ma_album": "AL001",
      "link_bai_hat": "https://example.com/song4.mp3",
      "ngay_phat_hanh": "2024-06-10",
      "ma_artist": "AR006",
      "ma_gia_luot_nghe": "GM003",
      "doanh_thu": 22265
    },
    {
      "ma_bai_hat": "BH005",
      "ten_bai_hat": "Bài hát 5",
      "thoi_luong": 6,
      "trang_thai": 1,
      "luot_nghe": 6656,
      "hinh_anh": "https://example.com/image5.jpg",
      "ma_album": "AL005",
      "link_bai_hat": "https://example.com/song5.mp3",
      "ngay_phat_hanh": "2023-12-18",
      "ma_artist": "AR010",
      "ma_gia_luot_nghe": "GM002",
      "doanh_thu": 15458
    },
    {
      "ma_bai_hat": "BH006",
      "ten_bai_hat": "Bài hát 6",
      "thoi_luong": 3,
      "trang_thai": 0,
      "luot_nghe": 8194,
      "hinh_anh": "https://example.com/image6.jpg",
      "ma_album": "AL002",
      "link_bai_hat": "https://example.com/song6.mp3",
      "ngay_phat_hanh": "2023-03-16",
      "ma_artist": "AR001",
      "ma_gia_luot_nghe": "GM003",
      "doanh_thu": 41797
    },
    {
      "ma_bai_hat": "BH007",
      "ten_bai_hat": "Bài hát 7",
      "thoi_luong": 3,
      "trang_thai": 0,
      "luot_nghe": 1727,
      "hinh_anh": "https://example.com/image7.jpg",
      "ma_album": "AL002",
      "link_bai_hat": "https://example.com/song7.mp3",
      "ngay_phat_hanh": "2023-09-12",
      "ma_artist": "AR010",
      "ma_gia_luot_nghe": "GM001",
      "doanh_thu": 1507
    },
    {
      "ma_bai_hat": "BH008",
      "ten_bai_hat": "Bài hát 8",
      "thoi_luong": 5,
      "trang_thai": 0,
      "luot_nghe": 1424,
      "hinh_anh": "https://example.com/image8.jpg",
      "ma_album": "AL005",
      "link_bai_hat": "https://example.com/song8.mp3",
      "ngay_phat_hanh": "2023-02-18",
      "ma_artist": "AR005",
      "ma_gia_luot_nghe": "GM001",
      "doanh_thu": 36591
    },
    {
      "ma_bai_hat": "BH009",
      "ten_bai_hat": "Bài hát 9",
      "thoi_luong": 2,
      "trang_thai": 1,
      "luot_nghe": 2179,
      "hinh_anh": "https://example.com/image9.jpg",
      "ma_album": "AL002",
      "link_bai_hat": "https://example.com/song9.mp3",
      "ngay_phat_hanh": "2024-07-17",
      "ma_artist": "AR006",
      "ma_gia_luot_nghe": "GM004",
      "doanh_thu": 35857
    },
    {
      "ma_bai_hat": "BH010",
      "ten_bai_hat": "Bài hát 10",
      "thoi_luong": 5,
      "trang_thai": 0,
      "luot_nghe": 2029,
      "hinh_anh": "https://example.com/image10.jpg",
      "ma_album": "AL005",
      "link_bai_hat": "https://example.com/song10.mp3",
      "ngay_phat_hanh": "2022-05-29",
      "ma_artist": "AR007",
      "ma_gia_luot_nghe": "GM004",
      "doanh_thu": 37243
    }
  ]
  