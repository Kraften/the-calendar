import React from 'react';
import { Route, Routes } from 'react-router';
import CalendarPage from './pages/calendar/calendar-page';
import LandingPage from './pages/landing-page/landing-page';

const App = () => {
  return (
    <Routes>
      {/* <Route path="" element={<LandingPage />} /> */}
      <Route path="" element={<CalendarPage />} />
    </Routes>
  );
};

export default App;
