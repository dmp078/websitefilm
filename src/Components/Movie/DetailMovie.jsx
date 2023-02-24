import { useEffect, useState, useRef, memo } from "react"
import { useParams } from "react-router"
import {Link} from 'react-router-dom'
import { GetAPI } from "../../API/ContextAPI"
import ErrorNoti from "../Notify.jsx/ErrorNoti"

import { faPlay, faStar, faSearch, faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { GetAuthContext } from "../../Auth/Context/AuthContext"
import Comment from "./Comment"

function DetailMovie () {
    const {id} = useParams ()
    const {getDetail, getCast, getSimilar} = GetAPI ()
    const {user} = GetAuthContext ()

    const [obj, setObj] = useState (null)
    const [similar, setSimilar] = useState ([])
    const [tab, setTab] = useState ('Overall')
    const [cast, setCast] = useState ([])
    const [heart, setHeart] = useState (false)
    const [listComment, setListComment] = useState ([])

    const listTab = ['Overall', 'Cast']
    const refHeart = useRef ()

    useEffect (() => {
        getSimilar ('movie', id)
            .then (res => setSimilar (res.results))

        getDetail ('movie', id)
            .then (res => setObj (res))
        
        getCast ('movie', id)
            .then (res => setCast (res.cast))
    }, [id])

    const handleChangeTab = (e) => {
        setTab (e.target.textContent)
    }

    useEffect (() => {
        if (user.email) {
            getDoc (doc (db, 'users', user.email))
                .then (res => {
                    if (res.data().bookmarked.movie.includes (id)) {
                        setHeart (true)
                    } else {
                        setHeart (false)
                    }
                })
        }
    }, [id, heart])

    const handleClickHeart = () => {
        if (!user.email) {
            refHeart.current.className = refHeart.current.className.replace ('hidden', 'none')
            setTimeout (() => {
                refHeart.current.className = refHeart.current.className.replace ('none', 'hidden')
            }, 1000)
        } else {
            getDoc (doc (db, 'users', user.email))
                .then (res => {
                    const objUpdate = res.data()
                    if (res.data().bookmarked.movie.includes (id)) {
                        setHeart (false)
                        objUpdate.bookmarked.movie = res.data().bookmarked.movie.filter (e => e != id)
                    } else {
                        setHeart (true)
                        objUpdate.bookmarked.movie = [...res.data().bookmarked.movie, id]
                    }
                    updateDoc (doc (db, 'users', user.email), objUpdate)
                })
        }
    }

    const handleComment = (e) => {
        e.preventDefault ()
        getDoc (doc (db, 'comments', 'movie'))
            .then (res => {
                if (res.data()[id]) {
                    const objUpdate = res.data()
                    objUpdate[id] = [{name : user.firstName + " " + user.lastName, comment: e.target.comment.value}, ...objUpdate[id]]
                    updateDoc (doc (db, 'comments', 'movie'), objUpdate)
                } else {
                    const objUpdate = res.data()
                    objUpdate[id] = [{name : user.firstName + " " + user.lastName, comment: e.target.comment.value}]
                    updateDoc (doc (db, 'comments', 'movie'), objUpdate)
                }

                getDoc (doc (db, 'comments', 'movie'))
                    .then (res2 => {
                        if (res2.data()[id]) {
                            setListComment (res2.data()[id])
                        }
                    })

                e.target.comment.value = ''
                e.target.comment.focus ()
            })
    }

    useEffect (() => {
        getDoc (doc (db, 'comments', 'movie'))
            .then (res => {
                if (res.data()[id]) {
                    setListComment (res.data()[id])
                }
            })
    }, [user, id])

    return (
        <div className="bg-[#1C1C1E] min-h-screen pt-4">
            <div ref={refHeart} className="hidden">
                <ErrorNoti />
            </div>

            <Link to='/' className="flex px-6">
                <img src="https://mymoonlight.vercel.app/logo.png" className="h-8" alt="" />
                <div className="flex text-2xl ml-2">
                    <h1 className="text-white">MOON</h1>
                    <h1 className="text-blue-500">LIGHT</h1>
                </div>
            </Link>

            {obj && <div className="mt-4 relative text-lg lg:text-xl pb-8">
                    <div className="lg:flex lg:gap-4 lg:justify-between lg:px-10">
                        <div className="lg:w-2/3">
                            <div className="relative w-full z-1">
                                <img className="lg:mr-[300px]" src={`https://image.tmdb.org/t/p/original${obj?.backdrop_path}`} alt="" />
                                <div className="bg-gradient-to-r from-black w-full absolute top-0 right-0 h-full"></div>
                                <div className="flex gap-6 absolute -bottom-20 left-6 z-1">
                                    <img className="rounded-md h-56 md:h-64 lg:h-72 w-fit" src={`https://image.tmdb.org/t/p/original${obj?.poster_path}`} alt="" />
                                    <div className="hidden md:block text-white my-auto text-3xl">
                                        <h1 className="">{obj.name}</h1>
                                        <div className="flex flex-wrap gap-4 mt-4">
                                            {obj.genres.map ((e, id) => (
                                                <div key={id} className=' text-sm border-[1px] border-gray-400 py-2 px-4 rounded-full'>
                                                    {e.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="relative w-fit ">
                                        <div onClick={handleClickHeart} className={`cursor-pointer px-4 py-1 z-10 rounded-full ${heart ? 'text-red-500' : 'text-white'} text-4xl`}>
                                            <FontAwesomeIcon icon={faHeart} className='my-auto'/>
                                        </div>

                                        <Link to={`/movie/play/${id}`} className="flex gap-6 h-fit mt-4 my-auto bg-blue-500 py-4 px-6 text-white rounded-full">
                                            <FontAwesomeIcon className="my-auto" icon={faPlay} />
                                            <h1>WATCH</h1>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="px-6">
                                <div className="mt-28 md:hidden text-white my-auto text-3xl">
                                        <h1 className="">{obj.name}</h1>
                                        <div className="flex flex-wrap gap-4 mt-4">
                                            {obj.genres.map ((e, id) => (
                                                <div key={id} className=' text-sm border-[1px] border-gray-400 py-2 px-4 rounded-full'>
                                                    {e.name}
                                                </div>
                                            ))}
                                        </div>
                                </div>
        
                                <div className="flex w-fit mx-auto mt-10 lg:mt-24 relative z-1 text-gray-400 gap-8">
                                    {listTab.map ((e, id) => (
                                        <div onClick={handleChangeTab} key={id} className={`cursor-pointer hover:text-white duration-300 ${e == tab ? ' text-white pb-2 border-b-2 border-blue-500' : 'mt-2'}`}>
                                            {e}
                                        </div>
                                    ))}
                                </div>
                                
                                <div className={`${tab == 'Overall' ? 'block' : 'hidden'} mt-12 text-gray-400`}>
                                    <h1 className="text-white">STORY</h1>
                                    <h1 className="mt-4">{obj.overview}</h1>
                                    <h1 className="mt-8 text-white">DETAILS</h1>
                                    <div className="mt-4">
                                        <h1>Status: {obj.status}</h1>
                                        <h1>Release date: {obj.release_date}</h1>
                                    </div >
                                </div>
        
                                <div className={`${tab == 'Cast' ? 'flex': 'hidden'} mt-12 w-fit max-h-[300px] overflow-y-scroll mx-auto flex-wrap gap-8`}>
                                    {cast.map ((e, id) => (
                                        <div key={id} className='flex gap-4'>
                                            <img className="h-20 w-20 object-cover rounded-full" src={`https://image.tmdb.org/t/p/original${e?.profile_path}`} alt="" />
                                            <h1 className="text-blue-500 my-auto">{e?.name}</h1>
                                        </div>
                                    ))}
                                </div>  
        
                                <div className="mt-12 text-white">
                                    <h1>MEDIA</h1>
                                    <div className="mt-10 text-center text-2xl">
                                        <h1>RATING</h1>
                                        <h1 className="text-gray-400 mt-4">{obj.vote_average}</h1>
                                    </div>
                                </div>

                                {!user.email && <div className="flex gap-4 mx-auto w-fit mt-8">
                                        <h1 className="text-white">You need</h1>
                                        <Link to='/login' className="text-blue-500 underline">login</Link>
                                        <h1 className="text-white">to comment</h1>
                                </div>}

                                {user.email && 
                                    <form className="mt-4" onSubmit={handleComment}>
                                        <input name='comment' type="text" className="bg-[#333335] text-white w-full outline-none rounded-xl border-[1px] border-black pb-10 pt-3 px-4" placeholder="Type here to comment" />
                                        <button  className=" font-bold bg-blue-500 text-white py-3 px-6 w-fit rounded-full mt-3">Comment</button>
                                    </form>    
                                }

                                <div className="mt-10 max-h-[400px] overflow-y-scroll">
                                    {listComment?.map ((e, id) => (
                                        <div key={id}>
                                            <Comment e={e} index={id} />
                                        </div>
                                    ))}
                                </div>
        
                                <div className="lg:hidden mt-12 text-white">
                                    <h1>Similar</h1>
                                    <div className="mt-6 max-h-[1000px] overflow-y-scroll">
                                        {similar.map ((e, id) => (
                                            <Link to={`/movie/detail/${e.id}`} key={id} className='flex gap-6 hover:brightness-75 my-6 duration-300'>
                                                <img className="h-40 rounded-lg" src={`https://image.tmdb.org/t/p/original${e.poster_path}`} alt="" />
                                                <div className="my-auto">
                                                    <h1>{e.name}</h1>
                                                    <h1 className="text-gray-400">{e.first_air_date}</h1>
                                                    <div className='flex h-auto w-fit mt-4 border-[1px] border-blue-500 text-blue-400 px-3 py-1 rounded-full'>
                                                        <h1 className='text-sm'>{e.vote_average}</h1>
                                                        <FontAwesomeIcon icon={faStar} className='my-auto ml-1 text-sm'/>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className="w-[300px] hidden lg:block">
                            <div className="relative">
                                <input type="text" className="bg-[#333335] outline-none text-white color-gray-500 pl-12 w-full py-3 rounded-3xl" placeholder="Search..." />
                                <FontAwesomeIcon icon={faSearch} className='absolute left-4 top-[15px] text-lg text-gray-500 hover:text-white duration-200 cursor-pointer' />
                            </div>

                            <div className="mt-6 text-white">
                                <h1 className="text-2xl">Similar</h1>
                                <div className="mt-4 max-h-[1000px] overflow-y-scroll">
                                    {similar.map ((e, id) => (
                                        <Link to={`/movie/detail/${e.id}`} key={id} className='flex gap-6 hover:brightness-75 my-6 duration-300'>
                                            <img className="h-40 rounded-lg" src={`https://image.tmdb.org/t/p/original${e.poster_path}`} alt="" />
                                            <div className="my-auto">
                                                <h1>{e.name}</h1>
                                                <h1 className="text-gray-400">{e.release_date}</h1>
                                                <div className='flex h-auto w-fit mt-4 border-[1px] border-blue-500 text-blue-400 px-3 py-1 rounded-full'>
                                                    <h1 className='text-sm'>{e.vote_average}</h1>
                                                    <FontAwesomeIcon icon={faStar} className='my-auto ml-1 text-sm'/>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
            </div>}
        </div>
    )
}

export default memo(DetailMovie)