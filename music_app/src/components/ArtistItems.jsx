import React from 'react'
import {useNavigate} from 'react-router-dom'

const ArtistItems = ({id, img, artist}) => {

    const navigate= useNavigate()

  return (
    <div
      onClick={() => navigate(`/artist/${id}`)}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#fffff26]"
    >
      <img className="h-44 w-44 rounded-full" src={img}></img>
      <p className="font-bold mt-2 mb-1">{artist}</p>
    </div>
  );
}

export default ArtistItems

