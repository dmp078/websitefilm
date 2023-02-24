import { useRef, useEffect } from 'react'
import { auth } from '../../firebase'
import Navbar from '../../Layout/Navbar'
import Main from './Main'
import RightSide from './RightSide'
import SuccessNoti from '../Notify.jsx/SuccessNoti'

import {onAuthStateChanged} from 'firebase/auth'

function Home () {
    document.title = 'Moonlight | Watching Website'

    const refNoti = useRef()

    useEffect (() => {
        onAuthStateChanged (auth, (userCre) => {
            if (userCre) {
                refNoti.current.className = refNoti.current.className.replace ('hidden', 'none')
                setTimeout (() => {
                    refNoti.current.className = refNoti.current.className.replace ('none', 'hidden')
                }, 1000)
            }
        })
    }, [])

    return (
        <div className='bg-[#1C1C1E] flex'>
            <div ref={refNoti} className="hidden">
                <SuccessNoti />
            </div>
            <Navbar page='home'/>
            <Main />
            <RightSide />
        </div>
    )
}

export default Home