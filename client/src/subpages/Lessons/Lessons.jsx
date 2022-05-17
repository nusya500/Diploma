import React from 'react'
import Styles from './Lessons.module.css'
import Image from './../../images/auth-min.jpg'
import { NavLink } from 'react-router-dom'

export const Lessons = () => {
    const lessons = [
        { name: 'Сольфеджио #1', path: 'lesson_1' },
        { name: 'Сольфеджио #2', path: 'lesson_2' },
        { name: 'Сольфеджио #3', path: 'lesson_3' },
        { name: 'Сольфеджио #4', path: 'lesson_4' },
        { name: 'Сольфеджио #5', path: 'lesson_5' },
        { name: 'Сольфеджио #6', path: 'lesson_6' },
    ]

    return (
        <div className={Styles.lesson}>
            {
                lessons.map(({ name, path }, i) => {
                    return (
                        <div key={i} className={Styles.item}>
                            <img src={ Image } alt={ 'image' + i } />
                            <NavLink to={ path }>{ name }</NavLink>
                        </div>
                    )
                })
            }
        </div>
    )
}
