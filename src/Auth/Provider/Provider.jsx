import { useEffect, useState } from "react"

import { authContext } from "../Context/AuthContext"
import {auth, db} from '../../firebase'
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import { doc, getDoc } from "firebase/firestore"

function Provider ({children}) {
    const [user, setUser] = useState ({email: undefined, firstName: 'Anonymous', lastName: '', bookmarked: {movie: [], tv: []}, history: {movie: [], tv: []}})

    const login = (email, password) => {
        return signInWithEmailAndPassword (auth, email, password)
    }

    const register = (email, password) => {
        return createUserWithEmailAndPassword (auth, email, password)
    }

    useEffect (() => {
        onAuthStateChanged (auth, (userCre) => {
            if (userCre) {
                getDoc (doc (db, 'users', userCre.email))
                    .then (res => setUser (res.data ()))
            }
        })
    }, [])

    return <authContext.Provider value={{login, register, user, setUser}}>
        {children}
    </authContext.Provider>
}

export default Provider