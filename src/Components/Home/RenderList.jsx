import { useRef, useCallback, memo } from 'react'
import {Link} from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowRight, faCircleArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons'

function RenderList ({list, type}) {

    const sliderRef = useRef (null)
    const refArrowLeft = useRef ()
    const refArrowRight = useRef ()

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
      }, [])

    const handleNext = useCallback(() => {

        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, [])

    return (
        <div className="w-full relative">
            <Swiper
                ref={sliderRef}
                className='w-full'
                breakpoints ={
                    {
                        300: {
                            slidesPerView: 2,
                            spaceBetween: 25,
                        },
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                        1536: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        }

                    }
                }
            >
                {list.map ((e, id) => (
                    <SwiperSlide key={id}>
                        <div className='cursor-pointer hover:scale-105 duration-300 mt-4 mb-2'>
                            <Link to={`/${type}/detail/${e.id}`}>
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
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div ref={refArrowLeft} onClick={handlePrev} className='absolute z-10 left-0 top-32 cursor-pointer text-xl' >
                <FontAwesomeIcon icon={faCircleArrowLeft} />
            </div>

            <div ref={refArrowRight} onClick={handleNext} className='absolute z-10 right-0 top-32 ml-4 cursor-pointer text-xl' >
                <FontAwesomeIcon icon={faCircleArrowRight} />
            </div>
        </div>
    )
}

export default memo(RenderList)