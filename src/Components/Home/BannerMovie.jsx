import {Link} from 'react-router-dom'

import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { memo } from 'react'

function BannerMovie ({e}) {
    const handleOverView = (str) => {
        if (str.length <= 200) return str
        else {
            let res = ''
            for (var i = 0; i < 160; i ++) {
                res += str[i]
            }
            return res + '...';
        }
    }
    return (
        <div>
            <Link to={`/movie/detail/${e.id}`} className='text-white w-full relative  hover:brightness-75 duration-300'>
                <div className='w-2/3 h-full bg-gradient-to-r from-black absolute top-0 opacity-60'></div>
                <img src={`https://image.tmdb.org/t/p/original${e.backdrop_path}`} className='w-full object-center rounded-xl' alt="" />
                <div className='absolute text-center bg-black opacity-30 h-full w-full z-10 top-0 rounded-xl'></div>
                <div className='absolute z-10 w-2/3 top-16 left-4 sm:left-10 text-gray-400'>
                    <h1 className='text-xl xl:text-[40px] font-bold text-blue-500'>{e.original_title}</h1>
                    <h1 className='text-sm sm:text-md xl:text-lg mt-4'>Release  date: {e.release_date}</h1>
                    <h1 className='hidden md:block text-sm md:text-md mt-4'> {handleOverView(e.overview)}</h1>
                </div>

                <div className='absolute flex h-auto bg-blue-500 px-4 py-1 z-10 rounded-full top-3 right-4'>
                    <h1 className='text-xl'>{e.vote_average}</h1>
                    <FontAwesomeIcon icon={faStar} className='my-auto ml-1 text-md'/>
                </div>
            </Link>
        </div>
    )
}

export default memo(BannerMovie)