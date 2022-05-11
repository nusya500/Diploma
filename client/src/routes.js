import React from "react"
import Styles from "./App.module.css"
import { Routes, Route, Navigate } from "react-router-dom"
import Auth from "./pages/Auth/Auth"
import { Dashboard } from "./pages/Dashboard/Dashboard"

export const useRoutes = (isAuthentificated) => {
    if (isAuthentificated) {
        return(
            <div className={Styles.main}>
                <div className={Styles.nav}>
                    <Dashboard />
                </div>
            </div>         
        )
    }

    return(
        <Routes>
            <Route path="/" exact element={
                <div className={Styles.auth}>
                    <Auth />
                </div>
            } />
        </Routes>
    )
}