import {Link} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { memo } from 'react'

function RenderList ({list, type}) {

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 sm:gap-8 md:gap-6 lg:gap-8 ">
            {list.map ((e, id) => (
                <Link to={`/${type}/detail/${e.id}`} key={id} className='cursor-pointer text-white hover:scale-105 duration-300 mt-4 mb-2'>
                    <div className='w-fit rounded-t-xl relative'>
                        <img src={`https://image.tmdb.org/t/p/original${e.poster_path}`} className='h-full object-center mx-auto rounded-t-xl' alt="" />
                        <div className='absolute flex h-auto bg-blue-500 px-2 rounded-xl top-3 left-4'>
                            <h1 className='text-sm'>{e.vote_average}</h1>
                            <FontAwesomeIcon icon={faStar} className='my-auto ml-1 text-[10px]'/>
                        </div>
                    </div>
                    
                    <div className='w-full h-9 overflow-hidden text-white py-2 bg-gray-800 text-center rounded-b-xl'>
                        {e.name || e.original_title}
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default memo(RenderList)