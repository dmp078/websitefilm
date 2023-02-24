import { doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import {Link} from 'react-router-dom'

import { GetAuthContext } from '../../Auth/Context/AuthContext'
import { db } from '../../firebase'

function Signup () {

    const {register, login} = GetAuthContext ()

    document.title = 'Sign Up | Moonlight'

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState (false)

    const handleSubmit = () => {
        if (firstName && lastName && email && password) {
            register (email, password)
                .then (() => {
                    setDoc (doc (db, 'users', email), {
                        email: email,
                        firstName,
                        lastName,
                        bookmarked: {movie: [], tv: []},
                        history: {movie: [], tv: []},
                    })
                    setSuccess (true)
                })
                .catch ((err) => {
                    setError (err.message)
                })
        } else {
            setError ('You need to perform all fields')
        }
    }

    const handleChangeFirstName = (e) => {
        setFirstName (e.target.value)
    }

    const handleChangeLastName = (e) => {
        setLastName (e.target.value)
    }

    const handleChangeEmail = (e) => {
        setEmail (e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword (e.target.value)
    }
    
    return <div className="h-screen w-screen bg-[#1C1C1E] pt-44">
        <div className='mx-auto w-fit'>
            <h1 className="text-xl lg:text-[30px] text-gray-400">START FOR FREE</h1>
            <h1 className="text-4xl lg:text-[40px] text-blue-500 mt-2 text-center font-bold">Create Account</h1>
        </div>
        
        <div className='flex gap-2 mx-auto mt-10 w-72 md:w-1/2'>
            <div className="relative flex w-full">
                <input required onChange={handleChangeFirstName} name="firstname" type="text" placeholder="First name" className="w-full bg-[#333335] px-5 py-4 pr-12 rounded-xl outline-none peer color-gray-400 text-white"/>
                <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" className="text-gray-400 absolute top-1/2 -translate-y-1/2 right-4" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9ZM14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 14.0902 3.71255 16.014 4.90798 17.5417C6.55245 15.3889 9.14627 14 12.0645 14C14.9448 14 17.5092 15.3531 19.1565 17.4583C20.313 15.9443 21 14.0524 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM12 21C9.84977 21 7.87565 20.2459 6.32767 18.9878C7.59352 17.1812 9.69106 16 12.0645 16C14.4084 16 16.4833 17.1521 17.7538 18.9209C16.1939 20.2191 14.1881 21 12 21Z" fill="currentColor"></path></svg>
            </div>

            <div className="relative flex w-full">
                <input required onChange={handleChangeLastName} name="lastname" type="text" placeholder="Last name" className="w-full bg-[#333335] px-5 py-4 pr-12 rounded-xl outline-none peer color-gray-400 text-white"/>
                <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" className="text-gray-400 absolute top-1/2 -translate-y-1/2 right-4" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9ZM14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 14.0902 3.71255 16.014 4.90798 17.5417C6.55245 15.3889 9.14627 14 12.0645 14C14.9448 14 17.5092 15.3531 19.1565 17.4583C20.313 15.9443 21 14.0524 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM12 21C9.84977 21 7.87565 20.2459 6.32767 18.9878C7.59352 17.1812 9.69106 16 12.0645 16C14.4084 16 16.4833 17.1521 17.7538 18.9209C16.1939 20.2191 14.1881 21 12 21Z" fill="currentColor"></path></svg>
            </div>
        </div>
        
        <div className="relative flex mx-auto mt-6 w-72 md:w-1/2">
            <input required onChange={handleChangeEmail} name="email" type="email" placeholder="Email" className="w-full bg-[#333335] px-5 py-4 pr-12 rounded-xl outline-none peer color-gray-400 text-white"/>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="text-gray-400 absolute top-1/2 -translate-y-1/2 right-4" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0 0 68.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"></path></svg>
        </div>

        <div className="relative flex mx-auto mt-6 w-72 md:w-1/2">
            <input required onChange={handleChangePassword} name="password" type="password" placeholder="Password" className="w-full bg-[#333335] px-5 py-4 pr-12 rounded-xl outline-none peer color-gray-400 text-white"/>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-gray-400 absolute top-1/2 -translate-y-1/2 right-4" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M18 8h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2V7a6 6 0 1 1 12 0v1zM5 10v10h14V10H5zm6 4h2v2h-2v-2zm-4 0h2v2H7v-2zm8 0h2v2h-2v-2zm1-6V7a4 4 0 1 0-8 0v1h8z"></path></g></svg>
        </div>

        <div className='text-red-500 text-center mt-4'>{error}</div>
        {success && <div className='text-green-500 text-center mt-4'>Successfully ! Please login to experience</div>}

        <div onClick={handleSubmit} className=" cursor-pointer text-white py-3 px-6 bg-blue-500 w-fit rounded-full mx-auto text-xl mt-4">Sign up</div>

        <div className="text-gray-400 flex mx-auto w-fit mt-6 gap-4">
            <h1>Already a member?</h1>
            <Link to='/login' className='text-blue-500 underline'>Login</Link>
        </div>
    </div>
}

export default Signup