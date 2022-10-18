import React from 'react';
import { Route, Routes } from 'react-router';
import ArtPage from './pages/art-page/art-page';
import CalendarPage from './pages/calendar/calendar-page';

const App = () => {
  return (
    <Routes>
      <Route path="" element={<CalendarPage />} />
      <Route path="art" element={<ArtPage />} />
    </Routes>
  );
};

export default App;
