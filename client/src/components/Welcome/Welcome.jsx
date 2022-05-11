import React, { useCallback, useContext, useEffect, useState } from 'react'
import Styles from './Welcome.module.css'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { NavLink } from 'react-router-dom'

export const Welcome = () => {
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
        <div className={Styles.welcome}>
            <h2>Добро пожаловать, { profile.fullname }👋</h2>
            <p>Хотите продолжить заниматься на <NavLink to={'/panel/piano'}>Пианино</NavLink>?</p>
        </div>
    )
}
