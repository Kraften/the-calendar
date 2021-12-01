import React, { Component } from 'react'
import { Route, Routes } from 'react-router'
import LandingPage from './pages/landing-page/landing-page'
import Calendar from './pages/calendar/calendar'

export default class App extends Component {
    render() {
        return (
            <Routes>
                <Route path="" element={<LandingPage />} />
                <Route path="/calendar" element={<Calendar />} />
            </Routes>
        )
    }
}