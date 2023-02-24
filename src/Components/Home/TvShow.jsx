import { useEffect, useState, useCallback, useRef, memo } from 'react'
import {Link} from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper';

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faStar, faPlayCircle } from '@fortawesome/free-solid-svg-icons'

import {GetAPI} from '../../API/ContextAPI'
import RenderList from './RenderList'
import {GetAuthContext} from '../../Auth/Context/AuthContext'

function TvShow ({handleSwitchPage}) {
    const {user} = GetAuthContext ()
    const {getListTvShow, getTrending} = GetAPI ()
    
    const [popular, setPopular] = useState ([])
    const [topRated, setTopRated] = useState ([])
    const [onTheAir, setOnTheAir] = useState ([])
    const [banner, setBanner] = useState ([])

    const sliderRef = useRef (null)
    const refArrowLeft = useRef ()
    const refArrowRight = useRef ()

    useEffect (() => {
        getListTvShow ('popular')
            .then (list => {
                list = list.results.filter (e => (e.poster_path !== null && e.poster_path != undefined))
                setPopular (list)
            })
            .catch (er => console.log(er))
        
        getListTvShow ('top_rated')
            .then (list => {
                list = list.results.filter (e => (e.poster_path !== null && e.poster_path != undefined))
                setTopRated (list)
            })
            .catch (er => console.log(er))
        
        getListTvShow ('on_the_air')
            .then (list => {
                list = list.results.filter (e => (e.poster_path !== null && e.poster_path != undefined))
                setOnTheAir (list)
            })
            .catch (er => console.log(er))

        getTrending ('tv', 'day')
            .then (list => {
                list = list.results.filter (e => (e.backdrop_path !== null && e.backdrop_path != undefined))
                setBanner (list)
            })
            .catch (er => console.log(er))
    }, [])

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
      }, [])

    const handleNext = useCallback(() => {

        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, [])

    const handleSlideChange = (index) => {
        if (index === 0) {
            refArrowLeft.current.className = refArrowLeft.current.className.replace ('cursor-pointer', 'text-gray-400 cursor-default')
        } else if (index === 1) {
            refArrowLeft.current.className = refArrowLeft.current.className.replace ('text-gray-400 cursor-default', 'cursor-pointer')
            refArrowLeft.current.className = refArrowLeft.current.className.replace ('text-gray-400', 'cursor-pointer')
        }

        if (index === sliderRef.current.swiper.slides.length - 1) {
            refArrowRight.current.className = refArrowRight.current.className.replace ('cursor-pointer', 'text-gray-400 cursor-default')
        } else if (index === sliderRef.current.swiper.slides.length - 2) {
            refArrowRight.current.className = refArrowRight.current.className.replace ('text-gray-400 cursor-default', 'cursor-pointer')
        }
    }
    const handleOverView = (str) => {
        if (str.length <= 200) return str
        else {
            let res = ''
            for (var i = 0; i < 200; i ++) {
                res += str[i]
            }
            return res + '...';
        }
    }

    return (
        <div className='w-full'>
            <div className="flex text-lg">
                <h1 className="text-white cursor-pointer">TV Show</h1>
                <h1 onClick={handleSwitchPage} className="ml-10 text-gray-400 cursor-pointer">Movie</h1>
            </div>

            <div className="text-white flex flex-row-reverse justify-between text-md lg:text-lg">
                <h1>Hi, {user.firstName + " " +user.lastName}</h1>
                <div className='h-1 w-40 bg-white my-auto'></div>
            </div>

            <div className='mt-4 relative w-full'>
                <div className='absolute top-4 left-6 z-10 flex text-lg text-white'>
                    <div ref={refArrowLeft} onClick={handlePrev} className='cursor-pointer text-gray-400' >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>

                    <div ref={refArrowRight} onClick={handleNext} className='ml-4 cursor-pointer' >
                        <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                </div>
                <Swiper
                    ref={sliderRef}
                    modules={[Pagination, Autoplay]}
                    className='rounded-xl w-full'
                    slidesPerView={1}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                        stopOnLastSlide: true
                    }}
                    
                    onSlideChange={() => handleSlideChange (sliderRef.current.swiper.realIndex)}
                >
                    {banner.map ((e, index) => (
                         <SwiperSlide key={index} className='w-full ' >
                            <Link to={`/tv/detail/${e.id}`} className='text-white w-full relative hover:brightness-75 duration-300'>
                                <div className='w-2/3 h-full bg-gradient-to-r from-black absolute top-0 opacity-60'></div>
                                <img src={`https://image.tmdb.org/t/p/original${e.backdrop_path}`} className='w-full object-center rounded-xl' alt="" />
                                <div className='absolute text-center bg-black opacity-30 h-full w-full z-10 top-0 rounded-xl'></div>
                                <div className='absolute z-10 w-2/3 top-16 left-4 sm:left-10 text-gray-400'>
                                    <h1 className='text-xl xl:text-[40px] font-bold text-blue-500'>{e.name}</h1>
                                    <h1 className='text-sm sm:text-md xl:text-lg mt-4'>First air date: {e.first_air_date}</h1>
                                    <h1 className='hidden md:block text-sm md:text-md  mt-4'> {handleOverView(e.overview)}</h1>
                                </div>

                                <div className='absolute flex h-auto bg-blue-500 px-4 py-1 z-10 rounded-full top-3 right-4'>
                                    <h1 className='text-xl'>{e.vote_average}</h1>
                                    <FontAwesomeIcon icon={faStar} className='my-auto ml-1 text-md'/>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}

                </Swiper>
            </div>

            <div className='mt-10'>
                <h1 className='text-xl font-bold'>Popular</h1>
                <RenderList list={popular} type='tv' />
            </div>

            <div className='mt-10'>
                <h1 className='text-xl font-bold'>Top Rated</h1>
                <RenderList list={topRated} type='tv' />
            </div>

            <div className='mt-10 mb-6'>
                <h1 className='text-xl font-bold'>On the Air</h1>
                <RenderList list={onTheAir} type='tv' />
            </div>
            
        </div>
    )
}

export default memo(TvShow)