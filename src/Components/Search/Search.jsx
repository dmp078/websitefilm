import { useEffect, useState} from 'react'

import {GetAPI} from '../../API/ContextAPI'

import Navbar from '../../Layout/Navbar'
import RenderList from '../Explore/RenderList' 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router'


function Search () {
    const {getSearch} = GetAPI ()
    const {query} = useParams()

    const [onFilter, setOnFilter] = useState (true)
    const [filter, setFilter] = useState ('TV Show')
    const [page, setPage] = useState (1)
    const [maxPage, setMaxPage] = useState (0)
    const [listPage, setListPage] = useState([])
    const [strSearch, setStrSearch] = useState(query ? query : '')
    const [results, setResults] = useState ({})

    const optionFilter = ['TV Show', 'Movie', 'People']

    document.title = 'Search | Moonlight'
    const handleCallApi = (type, page) => {
        getSearch (type, page, strSearch)
            .then (res => {
                setResults (res)
                setMaxPage (res.total_pages)
            })
    }

    useEffect(() => {
        if (strSearch == '') return

        switch (filter) {
            case 'TV Show':
                handleCallApi ('tv', page)
                break
            case 'Movie':
                handleCallApi ('movie', page)
                break
            case 'People':
                handleCallApi ('person', page)
                break
            default:   
                console.log('Error Search API')
                break
        }

    }, [page, strSearch, filter])

    useEffect (() => {
        let tmp = []
        for (var i = 1; i < maxPage; i ++) {
            tmp = [...tmp, i]
        }
        setListPage (tmp)
    }, [maxPage])

    const handleTaggleFilter = () => {
        setOnFilter (pre => !pre)
    }

    const handleChooseOption = (e) => {
        setFilter (e.target.textContent)
    }

    const handleSubmit = (e) => {
        e.preventDefault ()
        setStrSearch (e.target.search.value)
        e.target.search.value = ''
    }

    const handleSwitchPage = (e) => {
        setPage (+e.target.textContent)
    }

    return (
        <div className='bg-[#1C1C1E] pb-4 min-h-screen'>
            <Navbar page='search'/>

            <div className='px-4 pt-16 md:ml-[260px] xl:flex'>
                <div className='w-full xl:mr-[300px]'>
                    <h1 className='text-white font-bold text-xl text-center'>Find your favourite movies, TV shows, people and more</h1>
                    <form onSubmit={handleSubmit} className="relative mt-6 max-w-[400px] mx-auto">
                        <input name='search' type="text" className="bg-[#333335] outline-none text-white color-gray-500 pl-12 w-full py-3 rounded-3xl" placeholder="Search..." />
                        <FontAwesomeIcon icon={faSearch} className='absolute left-4 top-[15px] text-lg text-gray-500 hover:text-white duration-200 cursor-pointer' />
                    </form>
                    
                    <div className='mt-12'>
                        {results.results && 
                            <div>
                                <h1 className='text-white text-xl mb-4 ml-8'>{`Search results for "${strSearch}" (${results.total_results} results found)`}</h1>
                                <RenderList list={results.results.filter ((e) => (e.poster_path || e.profile_path))} />
                            
                                <div className='mt-8 w-full flex'>
                                    <div className='mx-auto flex gap-2'>
                                        {listPage.map ( (e, id) => (
                                            <div key={id} onClick={handleSwitchPage} className={`py-2 px-3 cursor-pointer rounded-full ${((e < page - 2) || (e > page + 2)) ? 'hidden' : ' '} ${e == page ? 'bg-blue-500 text-white' : 'bg-[#333335] text-gray-400'}`}>
                                                {e}
                                            </div>
                                        ))}
                                        <div className={`${page + 3 >= maxPage ? 'hidden' : 'block'} text-white mt-4`}>. . .</div>
                                        <div onClick={handleSwitchPage} className={`py-2 px-3 cursor-pointer rounded-full ${maxPage == page ? 'bg-blue-500 text-white' : 'bg-[#333335] text-gray-400'}`}>
                                            {maxPage}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                </div>

                <div className='xl:w-[300px] hidden xl:block xl:absolute xl:right-4'>
                    <div className='bg-[#333335] px-4 py-4 mt-6 rounded-lg w-full'>
                        <div className='text-white flex justify-between'>
                            <h1 className='my-auto font-bold'>Search results</h1>
                            {onFilter && <svg onClick={handleTaggleFilter} className='my-auto cursor-pointer' stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"></polyline></svg>}
                            {!onFilter && <svg onClick={handleTaggleFilter} className='my-auto cursor-pointer' stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6"></polyline></svg>}
                        </div>

                        {onFilter && <div className='mt-4 opacity-100 border-t-[1px] border-black relative duration-300'>
                            <div className=' text-gray-400'>
                                {onFilter && <div className='z-10 cursor-pointer rounded-md text-gray-400 py-1 w-full'>
                                    {optionFilter.map ((e, id) => (
                                        <div key={id} className={`p-2 rounded-lg ${e === filter ? 'bg-gray-400 text-white' : ''}`} onClick={handleChooseOption}>
                                            {e}
                                        </div>
                                    ))}
                                </div>}
                            </div>
                        </div>}
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default Search