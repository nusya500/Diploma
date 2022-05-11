import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Styles from './Scene.module.css'

import { Profile } from '../../subpages/Profile/Profile'
import { PianoC } from '../Piano/Piano'
import { Welcome } from '../Welcome/Welcome'

export const Scene = () => {
    return (
        <div className={Styles.scene}>
            <Routes>
                <Route path="/panel/profile" exact element={<Profile />} />
                <Route path="/panel/piano" exact element={<PianoC />} />
                <Route path="/" exact element={<Welcome />} />
            </Routes>
        </div>
    )
}