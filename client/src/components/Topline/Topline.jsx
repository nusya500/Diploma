import React, { useState, useContext, useEffect, useCallback } from "react"

import Styles from "./Topline.module.css"
import Overlay from "./../../App.module.css"

import { NavLink, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

export const Topline = () => {
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        navigate("/")
    }

    const showModal = event => {
        event.preventDefault()
        setShow(true)
    }

    const logoutCancel = useCallback(() => {
        setShow(false)
    }, [setShow])

    const escHandler = useCallback((event) => {
        if(event.keyCode === 27) {
            logoutCancel()
        }
    }, [logoutCancel])

    useEffect(() => {
        document.addEventListener("keydown", escHandler, false)
        return () => {
            document.removeEventListener("keydown", escHandler, false)
        }
    }, [escHandler])

    return(
        <div className={Styles.topline}>
            <div className={Styles.item}>
                <NavLink to="/panel/profile" className={Styles.profile}>
                    <i className={`material-icons ${Styles.account}`}>account_circle</i>
                    Личный кабинет
                </NavLink>
            </div>
            <div className={Styles.item}>
                <a href="/" className={Styles.link} onClick={showModal}>
                    <i className={`material-icons ${Styles.icon}`}>exit_to_app</i>
                </a>
            </div>
            <div className={`${Overlay.overlay} ${show ? Styles.active : !show}`} onClick={logoutCancel}></div>
            <div className={`${Styles.message} ${show ? Styles.active : !show}`}>
                <p className={Styles.text}>Вы уверены, что хотите выйти?</p>
                <a href="/" className={Styles.submit} onClick={logoutHandler}>Да</a>
                <a href="/" className={Styles.submit} onClick={e => {e.preventDefault(); logoutCancel()}}>Нет</a>
            </div>
        </div>
    )
}