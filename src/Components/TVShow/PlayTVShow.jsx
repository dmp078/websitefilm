import { useEffect, useState } from "react"
import { useParams } from "react-router"
import {Link} from 'react-router-dom'

import { GetAPI } from "../../API/ContextAPI"

import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { GetAuthContext } from "../../Auth/Context/AuthContext"
import { db } from "../../firebase"
import Episode from "./Episode"

function PlayTVShow () {
    const {id} = useParams ()
    const {getDetail, getSeasons, getVideoTVShow} = GetAPI ()
    const {user} = GetAuthContext()

    const [list, setList] = useState ([])
    const [obj, setObj] = useState ({})

    const [video, setVideo] = useState ('')
    const [ssNum, setSsNum] = useState (0)
    const [episNum, setEpisNum] = useState (1)

    useEffect (() => {
        getDetail ('tv', id)
            .then (res => {
                setObj (res)
                res.seasons.forEach (async (e) => {
                    const ans = await getSeasons (id, e.season_number)
                    setList (pre => [...pre, ans])
                })

                document.title = res.name + ' | Play' 
            })
    }, [id])

    useEffect (() => {
        setVideo (getVideoTVShow (id, ssNum, episNum))
    }, [ssNum, episNum])

    const handleTaggleSeasons = (e) => {
        list.forEach ((seasons) => {
            if (seasons.name == e.target.textContent) {
                if (seasons.season_number != ssNum) {
                    setEpisNum (1)
                }
                setSsNum (seasons.season_number)
                
            }
        })
    }

    useEffect (() => {
        if (user.email) {
            getDoc (doc (db, 'users', user.email))
                .then (res => {
                    const objUpdate = res.data()
                    objUpdate.history.tv = res.data ().history.tv.filter (e => e != id)
                    objUpdate.history.tv = [id, ...objUpdate.history.tv]
                    updateDoc (doc (db, 'users', user.email), objUpdate)
                })
        }
    }, [id, user])

    return (
        <div className="bg-[#1C1C1E] min-h-screen pt-4 pb-4">
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
                        <div className="mt-4 text-white text-3xl">{obj?.name}</div>
                        <div className="flex text-gray-400 mt-4">
                            <FontAwesomeIcon icon={faStar} className='text-blue-500 text-lg mr-2'/>
                            <h1>{obj?.vote_average}</h1>
                            <svg className="ml-6 mr-2 text-blue-500" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M712 304c0 4.4-3.6 8-8 8h-56c-4.4 0-8-3.6-8-8v-48H384v48c0 4.4-3.6 8-8 8h-56c-4.4 0-8-3.6-8-8v-48H184v136h656V256H712v48z"></path><path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zm0-448H184V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136z"></path></svg>
                            <h1>{obj?.first_air_date}</h1>
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
                            {list.map ((e, id) => (
                                <div key={id} className='bg-[#333335] px-4 py-4 mt-6 rounded-lg'>
                                    <div onClick={handleTaggleSeasons}  className='text-white flex gap-4'>
                                        <img className="h-32 rounded-lg" src={`https://image.tmdb.org/t/p/original${obj.poster_path}`} alt="" />
                                        <div className="my-auto">
                                            <h1  className={`cursor-pointer ${e.season_number == ssNum ? 'text-blue-500' : 'text-white'} font-bold text-xl`}>{e.name}</h1>
                                            <h1 className={`${e.season_number == ssNum ? 'text-white' : 'text-gray-400'}`}>Episode: {e.episodes.length}</h1>
                                        </div>
                                    </div>

                                    <div className={`${(ssNum == e.season_number) ? 'block' : 'hidden'} max-h-[400px] overflow-y-scroll mt-4 opacity-100 border-t-[1px] border-black relative duration-300`}>
                                        <div className='text-gray-400'>
                                            {e.episodes.map ((episode, ind) => (
                                                <div key={ind}>
                                                    <Episode episode={episode} episNum={episNum} setEpisNum={setEpisNum} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="w-[400px] hidden lg:block">
                    <div className="mt-6 text-white">
                        {list.map ((e, id) => (
                            <div key={id} className='bg-[#333335] px-4 py-4 mt-6 rounded-lg'>
                                <div onClick={handleTaggleSeasons}  className='text-white flex gap-4'>
                                    <img className="h-32 rounded-lg" src={`https://image.tmdb.org/t/p/original${obj.poster_path}`} alt="" />
                                    <div className="my-auto">
                                        <h1  className={`cursor-pointer ${e.season_number == ssNum ? 'text-blue-500' : 'text-white'} font-bold text-xl`}>{e.name}</h1>
                                        <h1 className={`${e.season_number == ssNum ? 'text-white' : 'text-gray-400'}`}>Episode: {e.episodes.length}</h1>
                                    </div>
                                </div>

                                <div className={`${(ssNum == e.season_number) ? 'block' : 'hidden'} max-h-[400px] overflow-y-scroll mt-4 opacity-100 border-t-[1px] border-black relative duration-300`}>
                                    <div className='text-gray-400'>
                                        {e.episodes.map ((episode, ind) => (
                                            <div key={ind}>
                                            <Episode episode={episode} episNum={episNum} setEpisNum={setEpisNum} />
                                        </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PlayTVShow