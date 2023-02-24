import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import {Link} from 'react-router-dom'

import { GetAPI } from "../../API/ContextAPI"

import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { GetAuthContext } from "../../Auth/Context/AuthContext"
import { db } from "../../firebase"


function PlayMovie () {
    const {id} = useParams ()
    const {getDetail, getVideoMovie, getRecommendations} = GetAPI ()
    const {user} = GetAuthContext()

    const [recommendations, setRecommendations] = useState ([])
    const [video, setVideo] = useState('')
    const [obj, setObj] = useState({})

    useEffect (() => {
        getDetail ('movie', id)
            .then (res => setObj(res))
        
        getRecommendations (id)
            .then (res => setRecommendations (res.results))

        setVideo(getVideoMovie (id))
    }, [id])

    useEffect (() => {
        if (user.email) {
            getDoc (doc (db, 'users', user.email))
                .then (res => {
                    const objUpdate = res.data()
                    objUpdate.history.movie = res.data ().history.movie.filter (e => e != id)
                    objUpdate.history.movie = [id, ...objUpdate.history.movie]
                    updateDoc (doc (db, 'users', user.email), objUpdate)
                })
        }
    }, [id, user])

    return (
        <div className="bg-[#1C1C1E] min-h-screen py-4">
            <Link to='/' className="flex px-6">
                <img src="https://mymoonlight.vercel.app/logo.png" className="h-8" alt="" />
                <div className="flex text-2xl ml-2">
                    <h1 className="text-white">MOON</h1>
                    <h1 className="text-blue-500">LIGHT</h1>
                </div>
            </Link>

            <div className="lg:flex lg:gap-4 lg:justify-between lg:px-10">
                <div className="lg:w-2/3 pt-4">
                    <div className="relative h-0 pb-[56.25%]">
                        <iframe allowFullScreen={true} scrolling='no' seamless="seamless" className="absolute w-full h-full top-0 left-0 px-2" src={video} frameBorder="0"></iframe>
                    </div>
                    <div className="px-6">
                        <div className="mt-4 text-white text-3xl">{obj?.original_title}</div>
                        <div className="flex text-gray-400 mt-4">
                            <FontAwesomeIcon icon={faStar} className='text-blue-500 text-lg mr-2'/>
                            <h1>{obj?.vote_average}</h1>
                            <svg className="ml-6 mr-2 text-blue-500" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M712 304c0 4.4-3.6 8-8 8h-56c-4.4 0-8-3.6-8-8v-48H384v48c0 4.4-3.6 8-8 8h-56c-4.4 0-8-3.6-8-8v-48H184v136h656V256H712v48z"></path><path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zm0-448H184V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136z"></path></svg>
                            <h1>{obj?.release_date}</h1>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-4">
                            {obj?.genres?.map ((e, id) => (
                                <div key={id} className='text-gray-400 text-sm bg-[#333335] py-2 px-4 rounded-full'>
                                    {e.name}
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 text-gray-400">
                            <h1 className="text-white text-xl">Overview:</h1>
                            <h1 className="mt-4">{obj?.overview}</h1>
                        </div>

                        <div className="lg:hidden mt-8 text-white">
                            <h1 className="text-xl">Recommendations</h1>
                            <div className="mt-6 max-h-[400px] overflow-y-scroll">
                                {recommendations.map ((e, id) => (
                                    <Link to={`/movie/play/${e.id}`} key={id} className='flex gap-6 hover:brightness-75 my-6 duration-300'>
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


                <div className="w-[400px] hidden lg:block">
                    <div className="mt-6 text-white">
                        <h1 className="text-2xl">Recommendations</h1>
                        <div className="mt-4 max-h-[600px] overflow-y-scroll">
                            {recommendations.map ((e, id) => (
                                <Link to={`/movie/play/${e.id}`} key={id} className='flex gap-6 hover:brightness-75 my-6 duration-300'>
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


        </div>

    )
}

export default PlayMovie