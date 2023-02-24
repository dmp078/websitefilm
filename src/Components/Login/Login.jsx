import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

import { GetAuthContext } from '../../Auth/Context/AuthContext'

import { doc, getDoc } from "firebase/firestore"
import {db} from '../../firebase'

function Login () {
    document.title = 'Login | Moonlight'
    
    const {login, setUser, user} = GetAuthContext ()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleChangeEmail = (e) => {
        setEmail (e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword (e.target.value)
    }
    
    const navigate = useNavigate ()
    const handleSubmit = (e) => {
        e.preventDefault ()

        login (email, password)
            .then (users => {
                console.log(users);
                localStorage.setItem ('token', users._tokenResponse.idToken)
                getDoc (doc (db, 'users', email))
                    .then (res => setUser (res.data ()))
                
                navigate ('/')
            })
            .catch (er => {
                setError (er.message)
            })
    }

    return <div className="h-screen w-screen bg-[#1C1C1E] pt-44">
        <h1 className="text-4xl lg:text-[50px] text-blue-500 text-center font-bold">Sign In To Moonlight</h1>
        
        <div className="relative flex mx-auto mt-6 w-72 md:w-1/2">
            <input onChange={handleChangeEmail} name="email" type="email" placeholder="Email" className="w-full bg-[#333335] px-5 py-4 pr-12 rounded-xl outline-none peer color-gray-400 text-white"/>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="text-gray-400 absolute top-1/2 -translate-y-1/2 right-4" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0 0 68.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"></path></svg>
        </div>

        <div className="relative flex mx-auto mt-6 w-72 md:w-1/2">
            <input onChange={handleChangePassword} name="password" type="password" placeholder="Password" className="w-full bg-[#333335] px-5 py-4 pr-12 rounded-xl outline-none peer color-gray-400 text-white"/>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-gray-400 absolute top-1/2 -translate-y-1/2 right-4" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M18 8h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2V7a6 6 0 1 1 12 0v1zM5 10v10h14V10H5zm6 4h2v2h-2v-2zm-4 0h2v2H7v-2zm8 0h2v2h-2v-2zm1-6V7a4 4 0 1 0-8 0v1h8z"></path></g></svg>
        </div>

        <div className='text-red-500 text-center mt-4'>{error}</div>

        <div onClick={handleSubmit} className="cursor-pointer text-white py-3 px-6 bg-blue-500 w-fit rounded-full mx-auto text-md md:text-xl mt-4">Login</div>

        <div className="text-gray-400 flex mx-auto w-fit mt-6 gap-4">
            <h1>Not a member?</h1>
            <Link to='/signup' className='text-blue-500 underline'>Sign Up</Link>
        </div>
    </div>
}

export default Login