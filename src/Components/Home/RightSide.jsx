import {GetAPI} from '../../API/ContextAPI'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons'

import {Link, useNavigate} from 'react-router-dom'
import { memo, useEffect, useState } from 'react'

function RightSide () {

    const [trending, setTrending] = useState([])
    
    const categories = ['Drama', 'Comedy', 'Talk', 'War & Politics', 'Family', 'Kids', 'Documentary']
    const {getTrending} = GetAPI ()

    useEffect (() => {
        getTrending ('all', 'day')
            .then (list => {
                list = list.results.filter (e => (e.poster_path !== undefined))
                setTrending (list)
            })
    }, [])

    const navigate = useNavigate ()
    
    const handleSearch = (e) => {
        e.preventDefault ()

        navigate (`/search/${e.target.search.value}`)

    }

    return (
        <div className="hidden fixed right-0 lg:block w-[300px]  h-screen text-white border-l-2 border-gray-600 pt-8 px-6">
            <form onSubmit={handleSearch} className='relative z-10'>
                <input name='search' type="text" className="bg-[#333335] outline-none text-white color-gray-500 pl-12 w-full py-3 rounded-3xl" placeholder="Search..." />
                <FontAwesomeIcon icon={faSearch} className='absolute left-4 top-[15px] text-lg text-gray-500 hover:text-white duration-200 cursor-pointer' />
            </form>

            <div className='mt-8 flex flex-wrap gap-2'>
                {categories.map ((e, id) => (
                    <Link to={`/search/${e}`} key={id} className='cursor-pointer px-4 py-2 bg-[#333335] rounded-full text-gray-400 hover:brightness-75 transition duration-300'>
                        {e}
                    </Link>
                ))}
            </div>

            <div className='mt-8'>
                <h1 className='font-bold text-xl'>Trending</h1>

                <Link to='/' className='mt-6 flex w-full duration-300 h-36 hover:brightness-75'>
                    <div className='w-28'>
                        <img src={`https://image.tmdb.org/t/p/original${trending[0]?.poster_path}`} className='w-full h-full object-cover rounded-xl' alt="" />
                    </div>
                    <div className='ml-4 w-[110px]'>
                        <h1>{trending[0]?.name || trending[0]?.original_title}</h1>
                        <h1 className='mt-2 text-gray-500'>{trending[0]?.first_air_date || trending[0]?.release_date}</h1>
                        <div className='flex h-auto w-fit mt-4 border-[1px] border-blue-500 text-blue-400 px-3 py-1 rounded-full'>
                            <h1 className='text-sm'>{trending[0]?.vote_average}</h1>
                            <FontAwesomeIcon icon={faStar} className='my-auto ml-1 text-sm'/>
                        </div>
                    </div>
                </Link>

                <Link to='/' className='mt-6 flex w-full duration-300 h-36 hover:brightness-75'>
                    <div className='w-28'>
                        <img src={`https://image.tmdb.org/t/p/original${trending[1]?.poster_path}`} className='w-full h-full object-cover rounded-xl' alt="" />
                    </div>
                    <div className='ml-4 w-[110px]'>
                        <h1>{trending[1]?.name || trending[1]?.original_title}</h1>
                        <h1 className='mt-2 text-gray-500'>{trending[1]?.first_air_date || trending[1]?.release_date}</h1>
                        <div className='flex h-auto w-fit mt-4 border-[1px] border-blue-500 text-blue-500 px-3 py-1 rounded-full'>
                            <h1 className='text-sm'>{trending[1]?.vote_average}</h1>
                            <FontAwesomeIcon icon={faStar} className='my-auto ml-1 text-sm'/>
                        </div>
                    </div>
                </Link>

                <div className='mt-12 text-center'>
                    <Link to='/explore' className='bg-[#333335] text-center mt-6 hover:brightness-75 duration-200 text-gray-400 py-[10px] px-20 w-full rounded-full'>
                        See More
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default memo(RightSide)