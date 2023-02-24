import { doc, getDoc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { GetAPI } from "../../API/ContextAPI"
import { GetAuthContext } from "../../Auth/Context/AuthContext"
import { db } from "../../firebase"
import Navbar from "../../Layout/Navbar"
import RenderList from "./RenderList"

function History () {
    document.title = 'History | Moonlight'

    const {user} = GetAuthContext ()
    const {getDetail} = GetAPI ()

    const [listMovie, setListMovie] = useState ([])
    const [listTvShow, setListTvShow] = useState ([])

    useEffect(() => {
        if (user.email) {
            getDoc (doc (db, 'users', user.email))
                .then (res => {
                    res.data().history.movie.forEach (e => {
                        getDetail ('movie', +e)
                            .then (movie => setListMovie (pre => [...pre, movie]))
                    })

                    res.data().history.tv.forEach (e => {
                        getDetail ('tv', +e)
                            .then (tv => setListTvShow (pre => [...pre, tv]))
                    })
                })
        }
    }, [user])

    const handleDeleteMovie = () => {
        getDoc (doc (db, 'users', user.email))
            .then (res => {
                const objUpdate = res.data()
                objUpdate.history.movie = []
                updateDoc (doc (db, 'users', user.email), objUpdate)
                setListMovie ([])
            })
    }

    const handleDeleteTV = () => {
        getDoc (doc (db, 'users', user.email))
            .then (res => {
                const objUpdate = res.data()
                objUpdate.history.tv = []
                updateDoc (doc (db, 'users', user.email), objUpdate)
                setListTvShow ([])
            })
    }

    return (
        <div className='bg-[#1C1C1E] min-h-screen flex'>
            <Navbar page='history'/>

            

            <div className="px-6">
                <div className="flex md:hidden mt-6">
                    <img src="https://mymoonlight.vercel.app/logo.png" className="h-8" alt="" />
                    <div className="flex text-2xl ml-2">
                        <h1 className="text-white">MOON</h1>
                        <h1 className="text-blue-500">LIGHT</h1>
                    </div>
                </div>
                <div className="mt-6 md:ml-[260px]">
                    <div className="flex justify-between">
                        <h1 className="text-xl text-white">Movie:</h1>
                        <h1 onClick={handleDeleteMovie} className="text-xl text-blue-500 font-bold cursor-pointer">CLEAR ALL</h1>
                    </div>
                    <RenderList list={listMovie} type='movie' />
                </div>

                <div className="mt-6 md:ml-[260px]">
                    <div className="flex justify-between">
                        <h1 className="text-xl text-white">TV Show:</h1>
                        <h1 onClick={handleDeleteTV} className="text-xl text-blue-500 font-bold cursor-pointer">CLEAR ALL</h1>
                    </div>
                    <RenderList list={listTvShow} type='tv' />
                </div>
            </div>
        </div>
    )
}

export default History