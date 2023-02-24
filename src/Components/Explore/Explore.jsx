import { useState, useRef, useEffect, useCallback } from 'react'
import {Link, useNavigate} from 'react-router-dom'

import Navbar from '../../Layout/Navbar'
import TvShow from './TvShow'
import Movie from './Movie'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { GetAPI } from '../../API/ContextAPI'
import ErrorNoti from '../Notify.jsx/ErrorNoti'


function Explore () {
    const {getGenres} = GetAPI ()

    const [strSort, setStrSort] = useState ('Most popular')
    const [onOptionSort, setOnOptionSort] = useState (false)
    const [onSort, setOnSort] = useState (true)
    const [arrayFilter, setArrayFilter] = useState ([])
    const [onFilter, setOnFilter] = useState (true)
    const [optionFilter, setOptionFilter] = useState ([])
    //  true == tvshow, else : movie
    const [page, setPage] = useState (true)

    const optionSort = ['Most popular', 'Most rating', 'Most recent']

    const refOptionSort = useRef ()

    document.title = 'Explore | Moonlight'
    useEffect (() => {
        getGenres (page ? 'tv' : 'movie')
            .then (res => setOptionFilter (res.genres))
    }, [page])
    const handleTaggleSort = () => {
        setOnSort (pre => !pre)
    }

    const handleTaggleOptionSort = () => {
        setOnOptionSort(pre => !pre)
    }

    const handleChooseOption = (e) => {
        setStrSort (e.target.textContent)
        setTimeout(handleTaggleOptionSort, 300)
    }

    const handleTaggleFilter = () => {
        setOnFilter (pre => !pre)
    }

    const handleClickGenre = (e) => {
        optionFilter.forEach ((option) => {
            if (option.name == e.target.textContent) {
                if (arrayFilter.includes (option.id)) {
                    setArrayFilter (pre => pre.filter (id => id != option.id))
                } else {
                    setArrayFilter (pre => [...pre, option.id])
                }
            }
        })
    }

    const handleSwitchPage = useCallback (() => {
        setPage (prev => !prev)
    }, [])

    function useOutsideAlerter(ref) {
        useEffect(() => {
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
              handleTaggleOptionSort ()
            }
          }

          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
    }

    const navigate = useNavigate ()
    const handleSearch = (e) => {
        e.preventDefault ()

        navigate (`/search/${e.target.search.value}`)

    }

    useOutsideAlerter (refOptionSort)

    return (
        <div className='bg-[#1C1C1E]'>
            <Navbar page='explore'/>
            <div className='px-4 pt-6 md:ml-[260px] xl:flex'>
                <div className="mt-4 w-full xl:mr-[300px] hidden xl:block">
                    <div className='flex justify-between px-4'>
                        <h1 className='text-white text-2xl mb-8 font-bold'>FIND FILMS THAT BEST FIT YOU</h1>
                        <form onSubmit={handleSearch} className='relative z-10'>
                            <input name='search' type="text" className="bg-[#333335] outline-none text-white color-gray-500 pl-12 w-full py-3 rounded-3xl" placeholder="Search..." />
                            <FontAwesomeIcon icon={faSearch} className='absolute left-4 top-[15px] text-lg text-gray-500 hover:text-white duration-200 cursor-pointer' />
                        </form>
                    </div>
                    {page && <TvShow handleSwitchPage={handleSwitchPage} strSort={strSort} strFilter={arrayFilter.join(',')} />}
                    {!page && <Movie handleSwitchPage={handleSwitchPage} strSort={strSort} strFilter={arrayFilter.join(',')}/>}
                </div>

                <div className='xl:w-[300px] xl:absolute xl:right-4'>
                    <Link to='/' className="flex md:hidden">
                        <img src="https://mymoonlight.vercel.app/logo.png" className="h-8" alt="" />
                        <div className="flex text-2xl ml-2">
                            <h1 className="text-white">MOON</h1>
                            <h1 className="text-blue-500">LIGHT</h1>
                        </div>
                    </Link>

                    <div className='mt-10 text-center'>
                        <h1 className='xl:hidden text-white text-2xl font-bold'>FIND FILMS THAT BEST FIT YOU</h1>
                    </div>

                    <div className='bg-[#333335] px-4 py-4 mt-6 rounded-lg w-full'>
                        <div className='text-white flex justify-between'>
                            <h1 className='my-auto font-bold'>SORT</h1>
                            {onSort && <svg onClick={handleTaggleSort} className='my-auto cursor-pointer' stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"></polyline></svg>}
                            {!onSort && <svg onClick={handleTaggleSort} className='my-auto cursor-pointer' stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6"></polyline></svg>}
                        </div>

                        {onSort && <div className='mt-4 opacity-100 border-t-[1px] border-black relative duration-300'>
                            <div className=' text-gray-400'>
                                <h1 className='my-4'>Sort results by</h1>

                                <div onClick={handleTaggleOptionSort} className='bg-[#49494B] cursor-pointer rounded-md w-full p-2 flex justify-between'>
                                    <h1>{strSort}</h1>
                                    <svg className='my-auto cursor-pointer border-l-[1px] border-white text-xl w-12' stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </div>

                                {onOptionSort && <div ref={refOptionSort} className='bg-[#49494B] absolute top-[calc(27*4px)] z-10 cursor-pointer rounded-md text-gray-400 py-1 w-full'>
                                    {optionSort.map ((e, id) => (
                                        <div key={id} className={`p-2 ${e === strSort ? 'bg-gray-400 text-white' : ''}`} onClick={handleChooseOption}>
                                            {e}
                                        </div>
                                    ))}
                                </div>}
                            </div>
                        </div>}
                    </div>

                    <div className='bg-[#333335] px-4 py-4 mt-6 rounded-lg'>
                        <div className='text-white flex justify-between'>
                            <h1 className='my-auto font-bold'>FILTER</h1>
                            {onFilter && <svg onClick={handleTaggleFilter} className='my-auto cursor-pointer' stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"></polyline></svg>}
                            {!onFilter && <svg onClick={handleTaggleFilter} className='my-auto cursor-pointer' stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6"></polyline></svg>}
                        </div>

                        {onFilter && <div className='mt-4 opacity-100 border-t-[1px] border-black relative duration-300'>
                            <div className=' text-gray-400'>
                                <h1 className='my-4 text-white'>Genres</h1>
                                <div className='flex flex-wrap gap-3'>
                                    {optionFilter.map ((e, id) => (
                                        <div key={id} className={`px-2 py-1 hover:brightness-75 cursor-pointer border-[1px] duration-300 border-gray-400 w-fit rounded-full ${arrayFilter.includes(e.id) ? 'bg-blue-500 text-white' : ''}`} onClick={handleClickGenre}>
                                            {e.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>

                <div className="mt-8 w-full xl:hidden">
                    {page && <TvShow handleSwitchPage={handleSwitchPage} strSort={strSort} strFilter={arrayFilter.join(',')} />}
                    {!page && <Movie handleSwitchPage={handleSwitchPage} strSort={strSort} strFilter={arrayFilter.join(',')}/>}
                </div>
            </div>

            

            
        </div>
    )
}

export default Explore