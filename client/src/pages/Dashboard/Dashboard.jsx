import React, { useState } from 'react'
import Styles from './Dashboard.module.css'
// import Logo from './../../assets/icons/oms.png'

import { NavLink } from 'react-router-dom'
import { Topline } from '../../components/Topline/Topline'
import { Scene } from '../../components/Scene/Scene'

export const Dashboard = () => {
    const [open, setOpen] = useState(false)

    const openMenu = event => {
        event.preventDefault()

        setOpen(!open)
    }

    const links = [
        { title: 'Пианино', link: 'piano', icon: 'piano' },
    ]

    const items = links.map(({title, link, icon}, i) => {
        return (
            <li key={ i } className={Styles.item}>
                <NavLink className={Styles.link} activeclassname={Styles.active} to={`/panel/${ link }`}>
                    <i className={`material-icons ${Styles.icon}`}>{ icon }</i>
                    <span className={Styles.text}>{ title }</span>
                </NavLink>
            </li>
        )
    })

    return (
        <div className={Styles.dashboard}>
            <nav className={`${Styles.navbar} ${open ? Styles.open : ""}`}>
                <div className={Styles.flexBlock}>
                    <div className={`${Styles.title} ${open ? Styles.open : ""}`}>
                        <NavLink to={'/'} className={`${Styles.logo} ${open ? Styles.open : ""}`}>
                            Doremi
                        </NavLink>
                        <a href="/" className={Styles.ham} onClick={openMenu}>
                            <span className={`${Styles.line} ${open ? Styles.open : ""}`}></span>
                            <span className={`${Styles.line} ${open ? Styles.open : ""}`}></span>
                            <span className={`${Styles.line} ${open ? Styles.open : ""}`}></span>
                        </a>
                    </div>
                </div>
                <ul className={`${Styles.menu} ${open ? Styles.open : ''}`}>
                    { items }
                </ul>
            </nav>
            <div className={Styles.main}>
                <Topline />
                <Scene />
            </div>
        </div>
    )
}
