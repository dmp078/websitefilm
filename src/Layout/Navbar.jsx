import { useEffect, useRef, memo } from "react"
import {Link, useNavigate} from 'react-router-dom'

import { GetAuthContext } from "../Auth/Context/AuthContext"
import { auth } from "../firebase"
import { signOut } from "firebase/auth";

import SubNavbar from "./SubNavbar"
import ErrorNoti from "../Components/Notify.jsx/ErrorNoti";

function Navbar ({page}) {

    const {user, setUser} = GetAuthContext ()

    const objRef = {
        home: useRef(),
        explore: useRef(),
        search: useRef(),
        bookmarked: useRef (),
        profile: useRef (),
        history: useRef (),
        notiError: useRef (),
        notiSuccess: useRef ()
    }
    
    useEffect (() => {
        if (objRef[page].current) {
            objRef[page].current.className = objRef[page].current.className.replace('text-gray-400', 'text-blue-500 border-r-4 border-blue-500')
            objRef[page].current.className = objRef[page].current.className.replace('hover:text-white', '')
        }
    }, [])

    const handleLogout = () => {
        signOut (auth)
            .then (() => {
                setUser ({email: undefined, firstName: 'Anonymous', lastName: '', bookmarked: {movie: [], tv: []}, history: {movie: [], tv: []}})
            })
    }

    const navigate = useNavigate ()
    const handleRedirectBookmarked = (e) => {
        e.preventDefault ()
        if (!user.email) {
            objRef.notiError.current.className = objRef.notiError.current.className.replace ('hidden', 'none')
            setTimeout (() => {
                objRef.notiError.current.className = objRef.notiError.current.className.replace ('none', 'hidden')
            }, 1000)
        } else {
            navigate ('/bookmarked')
        }
    }

    const handleRedirectHistory = (e) => {
        e.preventDefault ()
        if (!user.email) {
            objRef.notiError.current.className = objRef.notiError.current.className.replace ('hidden', 'none')
            setTimeout (() => {
                objRef.notiError.current.className = objRef.notiError.current.className.replace ('none', 'hidden')
            }, 1000)
        } else {
            navigate ('/history')
        }
    }

    const handleRedirectProfile = (e) => {
        e.preventDefault ()
        if (!user.email) {
            objRef.notiError.current.className = objRef.notiError.current.className.replace ('hidden', 'none')
            setTimeout (() => {
                objRef.notiError.current.className = objRef.notiError.current.className.replace ('none', 'hidden')
            }, 1000)
        } else {
            navigate ('/profile')
        }
    }

    return  <div className="">
            <div ref={objRef.notiError} className="hidden">
                <ErrorNoti />
            </div>
            
            <div className="hidden md:block border-r-2 border-gray-600 fixed h-screen w-[260px] pl-8 pt-4 bg-[#1C1C1E]">
                <Link to='/' className="flex mt-4">
                    <img src="https://mymoonlight.vercel.app/logo.png" className="h-8" alt="" />
                    <div className="flex text-2xl font-bold ml-2">
                        <h1 className="text-white">MOON</h1>
                        <h1 className="text-blue-500">LIGHT</h1>
                    </div>
                </Link>

                <h1 className="text-white text-xl mt-10">MENU</h1>
                
                <div className="flex flex-col mt-6">
                    <a ref={objRef.home} href='/' className="my-3 hover:text-white duration-300 text-center text-gray-400 flex text-md">
                        <svg className="mx-4" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path></svg>
                        <h1>Home</h1>
                    </a>

                    <a ref={objRef.explore} href='/explore' className="my-3 hover:text-white duration-300 text-center text-gray-400 flex text-md">
                        <svg className="mx-4" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"></path></svg>
                        <h1>Explore</h1>
                    </a>

                    <a ref={objRef.search} href='/search' className="my-3 hover:text-white duration-300 text-center text-gray-400 flex text-md">
                        <svg className="mx-4" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path></svg>
                        <h1>Search</h1>
                    </a>
                </div>

                <div>
                    <h1 className="text-white text-xl mt-4">PERSONAL</h1>
                    <div className="flex flex-col mt-6">
                        <a onClick={handleRedirectBookmarked} ref={objRef.bookmarked} href='/bookmarked' className="my-3 hover:text-white duration-300 text-center text-gray-400 flex text-md">
                            <svg className="mx-4" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"></path><path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"></path></svg>
                            <h1>Bookmarked</h1>
                        </a>
    
                        <a onClick={handleRedirectHistory} ref={objRef.history} href='/history' className="my-3 hover:text-white duration-300 text-center text-gray-400 flex text-md">
                            <svg className="mx-4" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M536.1 273H488c-4.4 0-8 3.6-8 8v275.3c0 2.6 1.2 5 3.3 6.5l165.3 120.7c3.6 2.6 8.6 1.9 11.2-1.7l28.6-39c2.7-3.7 1.9-8.7-1.7-11.2L544.1 528.5V281c0-4.4-3.6-8-8-8zm219.8 75.2l156.8 38.3c5 1.2 9.9-2.6 9.9-7.7l.8-161.5c0-6.7-7.7-10.5-12.9-6.3L752.9 334.1a8 8 0 0 0 3 14.1zm167.7 301.1l-56.7-19.5a8 8 0 0 0-10.1 4.8c-1.9 5.1-3.9 10.1-6 15.1-17.8 42.1-43.3 80-75.9 112.5a353 353 0 0 1-112.5 75.9 352.18 352.18 0 0 1-137.7 27.8c-47.8 0-94.1-9.3-137.7-27.8a353 353 0 0 1-112.5-75.9c-32.5-32.5-58-70.4-75.9-112.5A353.44 353.44 0 0 1 171 512c0-47.8 9.3-94.2 27.8-137.8 17.8-42.1 43.3-80 75.9-112.5a353 353 0 0 1 112.5-75.9C430.6 167.3 477 158 524.8 158s94.1 9.3 137.7 27.8A353 353 0 0 1 775 261.7c10.2 10.3 19.8 21 28.6 32.3l59.8-46.8C784.7 146.6 662.2 81.9 524.6 82 285 82.1 92.6 276.7 95 516.4 97.4 751.9 288.9 942 524.8 942c185.5 0 343.5-117.6 403.7-282.3 1.5-4.2-.7-8.9-4.9-10.4z"></path></svg>
                            <h1>History</h1>
                        </a>
                    </div>
                </div>

                <div>
                    <h1 className="text-white text-xl mt-4">GENERAL</h1>
                    <div className="flex flex-col mt-6">
                        <a onClick={handleRedirectProfile} ref={objRef.profile} href='/profile' className="my-3 hover:text-white duration-300 text-center text-gray-400 flex text-md">
                            <svg className="mx-4" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M12 2A10.13 10.13 0 0 0 2 12a10 10 0 0 0 4 7.92V20h.1a9.7 9.7 0 0 0 11.8 0h.1v-.08A10 10 0 0 0 22 12 10.13 10.13 0 0 0 12 2zM8.07 18.93A3 3 0 0 1 11 16.57h2a3 3 0 0 1 2.93 2.36 7.75 7.75 0 0 1-7.86 0zm9.54-1.29A5 5 0 0 0 13 14.57h-2a5 5 0 0 0-4.61 3.07A8 8 0 0 1 4 12a8.1 8.1 0 0 1 8-8 8.1 8.1 0 0 1 8 8 8 8 0 0 1-2.39 5.64z"></path><path d="M12 6a3.91 3.91 0 0 0-4 4 3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4zm0 6a1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2 1.91 1.91 0 0 1-2 2z"></path></svg>
                            <h1>Profile</h1>
                        </a>
    
                        {!user.email && <Link to='/login' className="cursor-pointer my-3 text-center text-gray-400 flex text-md">
                            <svg className="mx-4 " stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" height="30" width="30" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                            <h1>Login</h1>
                        </Link>}

                        {user.email && <div onClick={handleLogout} className="cursor-pointer my-3 text-center text-gray-400 flex text-md">
                            <svg className="mx-4 " stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" height="30" width="30" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                            <h1>Log out</h1>
                        </div>}
                    </div>
                </div>
            </div>
            <SubNavbar page={page}/>
    </div>
    
}

export default memo(Navbar)
