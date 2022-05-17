import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Styles from './Scene.module.css'

import { Profile } from '../../subpages/Profile/Profile'
import { PianoC } from '../Piano/Piano'
import { Welcome } from '../Welcome/Welcome'
import { Schedule } from '../../subpages/Schedule/Schedule'
import { Lessons } from '../../subpages/Lessons/Lessons'
import { Lesson } from '../Lesson/Lesson'

export const Scene = () => {
    const lessons = [
        <iframe width="900" height="506" src="https://www.youtube.com/embed/QJZTY7x2T-M" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>,
        <iframe width="900" height="506" src="https://www.youtube.com/embed/Cm8oNgJlJF4" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>,
        <iframe width="900" height="506" src="https://www.youtube.com/embed/mGCsmETQH0I" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>,
        <iframe width="900" height="506" src="https://www.youtube.com/embed/i2A12fbBcIA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>,
        <iframe width="900" height="506" src="https://www.youtube.com/embed/f9CKIZxoZgI" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>,
        <iframe width="900" height="506" src="https://www.youtube.com/embed/v9s2xWK4GI4" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    ]
    return (
        <div className={Styles.scene}>
            <Routes>
                <Route path="/panel/profile" exact element={<Profile />} />
                <Route path="/panel/piano" exact element={<PianoC />} />
                <Route path="/panel/schedule" exact element={<Schedule />} />
                <Route path="/panel/lessons" exact element={<Lessons />} />
                {
                    lessons.map((element, i) => {
                        return (
                            <Route key={i} path={`/panel/lessons/lesson_${i + 1}`} exact element={
                                <Lesson video={ element } />
                            } />
                        )
                    })
                }
                <Route path="/" exact element={<Welcome />} />
            </Routes>
        </div>
    )
}