import { useEffect, useState, useCallback, useRef, memo } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons'

import {GetAPI} from '../../API/ContextAPI'
import {GetAuthContext} from '../../Auth/Context/AuthContext'
import RenderList from './RenderList'
import BannerMovie from './BannerMovie';

function Movie ({handleSwitchPage}) {
    const {user} = GetAuthContext ()
    const {getListMovies, getTrending, getDetail} = GetAPI ()
  
    const [popular, setPopular] = useState ([])
    const [topRated, setTopRated] = useState ([])
    const [upcoming, setUpcoming] = useState ([])
    const [banner, setBanner] = useState ([])

    const sliderRef = useRef (null)
    const refArrowLeft = useRef ()
    const refArrowRight = useRef ()

    useEffect (() => {
        getListMovies ('popular')
            .then (list => {
                list = list.results.filter (e => (e.poster_path !== null && e.poster_path != undefined))
                setPopular (list)
            })
            .catch (er => console.log(er))
        
        getListMovies ('top_rated')
            .then (list => {
                list = list.results.filter (e => (e.poster_path !== null && e.poster_path != undefined))
                setTopRated (list)
            })
            .catch (er => console.log(er))
        
        getListMovies ('upcoming')
            .then (list => {
                list = list.results.filter (e => (e.poster_path !== null && e.poster_path != undefined))
                setUpcoming (list)
            })
            .catch (er => console.log(er))

        getTrending ('movie', 'day')
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

    
    return (
        <div className='w-full'>
            <div className="flex text-lg">
                <h1 onClick={handleSwitchPage} className="text-gray-400 cursor-pointer">TV Show</h1>
                <h1 className="text-white ml-10 cursor-pointer">Movie</h1>
            </div>

            <div className="text-white flex flex-row-reverse justify-between text-md lg:text-lg">
                <h1>Hi, {user.firstName + " " + user.lastName}</h1>
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
                         <SwiperSlide key={index} className='w-full'  >
                            <BannerMovie e = {e} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className='mt-10'>
                <h1 className='text-xl font-bold'>Up Coming</h1>
                <RenderList list={upcoming} type='movie' />
            </div>

            <div className='mt-10'>
                <h1 className='text-xl font-bold'>Popular</h1>
                <RenderList list={popular} type='movie' />
            </div>

            <div className='mt-10 mb-6'>
                <h1 className='text-xl font-bold'>Top Rated</h1>
                <RenderList list={topRated} type='movie' />
            </div>
        </div>
    )
}

export default memo(Movie)