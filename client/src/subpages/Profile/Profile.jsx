import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from "../../context/AuthContext"

import Styles from './Profile.module.css'

export const Profile = () => {
    const { userId } = useContext(AuthContext)
    const [profile, setProfile] = useState({})
    const { loading, request } = useHttp()

    const getProfiles = useCallback(async () => {
        try {
            const data = await request(`/api/auth/${userId}`, "GET", null)
            setProfile(data)
        } catch (e) {}
    }, [request, userId])

    useEffect(() => {
        getProfiles()
    }, [getProfiles])


    if (loading) {
        return <div className="loading"></div>
    }

    return (
        <div className={Styles.main}>
            <div className={Styles.profile}>
                <div className={Styles.card}>
                    <div className={Styles.info}>
                        <div className={Styles.avatar}>
                            <span className="material-icons">
                                account_circle
                            </span>
                        </div>
                        <div className={Styles.info}>
                            <ul>
                                <li>{ profile.fullname }</li>
                                <li>{ profile.email }</li>
                                {/* <li>Возраст: { profile.age }</li> */}
                            </ul>
                        </div>
                    </div>
                    
                    {/* <div className={Styles.guess}>
                        <p>
                            <span>{ JSON.parse(localStorage.getItem('guessed')) }</span>
                            нот угадано
                        </p>
                    </div> */}
                </div>
            </div>
        </div>
    )
}