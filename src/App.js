import React, { Component } from 'react';
import { Route, Routes } from 'react-router';
import CalendarPage from './pages/calendar/calendar-page';
import LandingPage from './pages/landing-page/landing-page';

export default class App extends Component {
    render() {
        return (
            <Routes>
                <Route path="" element={<LandingPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
            </Routes>
        );
    }
}
