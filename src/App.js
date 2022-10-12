import React from 'react';
import { Route, Routes } from 'react-router';
import CalendarPage from './pages/calendar/calendar-page';

const App = () => {
  return (
    <Routes>
      <Route path="" element={<CalendarPage />} />
    </Routes>
  );
};

export default App;
