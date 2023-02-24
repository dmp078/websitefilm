import { doc, getDoc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { GetAuthContext } from "../../Auth/Context/AuthContext"
import { db } from "../../firebase"
import Navbar from "../../Layout/Navbar"

function Profile () {
    document.title = 'Profile | Moonlight'
    const {user, setUser} = GetAuthContext ()

    const [change, setChange] = useState (false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [error, setError] = useState ('')
    const [name, setName] = useState ('')

    useEffect (() => {
        setName (user.firstName + " "+ user.lastName)
    }, [user])

    const viewChange = () => {
        setChange (pre => !pre)
    }

    const handleChangeFirstName = (e) => {
        setFirstName (e.target.value)
    }

    const handleChangeLastName = (e) => {
        setLastName (e.target.value)
    }

    const handleSubmit = () => {
        if (firstName && lastName) {
            setName (firstName + " "+ lastName)
            getDoc (doc (db, 'users', user.email))
                .then (res => {
                    const objUpdate = res.data()
                    objUpdate.firstName = firstName
                    objUpdate.lastName = lastName
                    updateDoc (doc (db, 'users', user.email), objUpdate)
                    setUser (objUpdate)
                })
            
            
        } else {
            setError ('You need to perform all fields')
        }
    }

    return (
        <div className='bg-[#1C1C1E] min-h-screen flex'>
            <Navbar page='profile'/>

            <div className="md:ml-[260px] px-6 w-full text-white text-center">
                <div className="mt-20 flex w-full">
                    <img className="h-44 rounded-full mx-auto" src="https://mymoonlight.vercel.app/defaultAvatar.jpg" alt="" />
                </div>

                <div className="mx-auto w-fit mt-10 text-2xl">
                    {name}
                </div>
                <div onClick={viewChange} className="mt-10 cursor-pointer bg-blue-500 rounded-full px-4 py-2 w-fit mx-auto font-bold">
                    {change ? 'Hide change name' : 'Change name'}
                </div>

                {change && <div className='mt-10 w-80 sm:w-2/3 mx-auto'>
                    <div className="flex gap-2 text-center mx-auto w-full">
                        <div className="relative flex w-full ">
                            <input required onChange={handleChangeFirstName} name="firstname" type="text" placeholder="First name" className="w-full bg-[#333335] px-5 py-4 pr-12 rounded-xl outline-none peer color-gray-400 text-white"/>
                            <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" className="text-gray-400 absolute top-1/2 -translate-y-1/2 right-4" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9ZM14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 14.0902 3.71255 16.014 4.90798 17.5417C6.55245 15.3889 9.14627 14 12.0645 14C14.9448 14 17.5092 15.3531 19.1565 17.4583C20.313 15.9443 21 14.0524 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM12 21C9.84977 21 7.87565 20.2459 6.32767 18.9878C7.59352 17.1812 9.69106 16 12.0645 16C14.4084 16 16.4833 17.1521 17.7538 18.9209C16.1939 20.2191 14.1881 21 12 21Z" fill="currentColor"></path></svg>
                        </div>

                        <div className="relative flex w-full ">
                            <input required onChange={handleChangeLastName} name="lastname" type="text" placeholder="Last name" className="w-full bg-[#333335] px-5 py-4 pr-12 rounded-xl outline-none peer color-gray-400 text-white"/>
                            <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" className="text-gray-400 absolute top-1/2 -translate-y-1/2 right-4" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9ZM14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 14.0902 3.71255 16.014 4.90798 17.5417C6.55245 15.3889 9.14627 14 12.0645 14C14.9448 14 17.5092 15.3531 19.1565 17.4583C20.313 15.9443 21 14.0524 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM12 21C9.84977 21 7.87565 20.2459 6.32767 18.9878C7.59352 17.1812 9.69106 16 12.0645 16C14.4084 16 16.4833 17.1521 17.7538 18.9209C16.1939 20.2191 14.1881 21 12 21Z" fill="currentColor"></path></svg>
                        </div>
                    </div>

                    <div className="text-red-500 font-bold mx-auto">{error}</div>
                    <div onClick={handleSubmit} className="cursor-pointer w-fit mx-auto font-bold px-6 py-3 mt-4 rounded-full bg-red-500">Comfirm</div>
                </div>}
            </div>
        </div>
    )
}

export default Profile