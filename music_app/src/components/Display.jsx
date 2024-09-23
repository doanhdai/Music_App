import React, { useEffect, useRef } from 'react'
import DisplayHome from './DisplayHome'
import { Route, Routes, useLocation } from 'react-router-dom'
import DisplayAlbum from './DisplayAlbum'
import { albumsData } from '../assets/assets'
import FullArtists from './FullArtists'
import FullAlbums from './FullAlbums'
import FullSongPopular from './FullSongPopular'

const Display = () => {
  const displayColor = useRef()
  const location = useLocation()
  // const isAlbum = location.pathname.includes("album")
  const isAlbum = /\/album(\/|$)/.test(location.pathname);
  const albumId = isAlbum ? location.pathname.slice(-1) : ""
  const bgColor = albumsData[Number(albumId)].bgColor
  console.log(albumId)

  useEffect(()=>{
    if(isAlbum)
      displayColor.current.style.background = `linear-gradient(${bgColor}, #121212)`
    else
      displayColor.current.style.background = `#121212`
  })

  return (
    <div ref={displayColor} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lh:w-[75%] lg:ml-0'>
        <Routes className=''>
          <Route path='/' element={<DisplayHome /> }></Route>
          <Route path='/album/:id' element={<DisplayAlbum /> }></Route>
          <Route path='/artist' element={<FullArtists/>}></Route>
          <Route path='/albums' element={<FullAlbums/>}></Route>
          <Route path='/songs' element={<FullSongPopular/>}></Route>



        </Routes>
    </div>
  )
}

export default Display