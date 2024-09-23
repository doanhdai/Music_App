import React from 'react'
import { useNavigate } from 'react-router-dom'
import { albumsData, assets, songsData } from '../assets/assets'
import NavBar from './NavBar'
import ArtistItems from './ArtistItems'
import Footer from './Footer'

const FullArtists = () => {
    // const {id} = useParams()
    

    // const navigate= useNavigate()

    return (
        <>  
            <NavBar/>
            <div className='mb-4 pt-6'>
                <div className='flex justify-between'>
                    <h1 className='my-4 font-bold text-2xl'>Nghệ sĩ đề xuất</h1>
                    {/* <h1 className='text-slate-200 font-bold mr-3 cursor-pointer' onClick={()=>navigate(`/artist`)}> Xem tất cả</h1> */}
                </div>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
                    {songsData.map((item, index) => (
                        <ArtistItems key={index} name={item.name} desc={item.desc} id={item.id} img={item.image} />
                    ))}
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default FullArtists