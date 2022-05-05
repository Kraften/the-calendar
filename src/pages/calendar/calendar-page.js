import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import OptionsMenu from '../../components/options-component/options-menu-component';
import AddEventPanel from '../../components/add-event-panel-component/add-event-panel-component';
import Month from '../../components/month-component/month-component';
import styled from 'styled-components';
import FirebaseEventsService from '../../services/firebase/events.service';
import './calendar-page.css';
import { onSnapshot } from 'firebase/firestore';
import AuthContext from '../../store/auth-context';

const CalendarPage = () => {
  const authCtx = useContext(AuthContext);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleEventsLoading = (events) => {
    setIsLoading(true);
    setCalendarEvents(events.map((e) => e.data()));
    setIsLoading(false);
  };

  useEffect(() => {
    const query = FirebaseEventsService.getAllQuery();
    onSnapshot(query, (querySnap) => {
      const events = querySnap.docs;
      const eventsListIsEmpty = events.length == 0;
      if (eventsListIsEmpty) return handleEventsLoading(events);
      handleEventsLoading(events);
    });
  }, []);

  const toggleOptionsMenuChild = () => {
    toggleOptionsMenu();
  };

  const toggleOptionsMenu = () => {
    setIsOptionsMenuOpen(!isOptionsMenuOpen);
  };

  const toggleAddEventPanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const nothingToDoElement = (
    <Nothing>
      <span>NOTHING</span>
      <span> TO DO </span>
    </Nothing>
  );

  const eventsIntoMonthBuckets = () => {
    const monthList = moment.months();
    let eventsByMonth = [];
    const eventsListIsEmpty = calendarEvents.length == 0;
    if (eventsListIsEmpty) return nothingToDoElement;

    return monthList.map((month) => {
      calendarEvents.map((event) => {
        const monthOfEvent = moment(event.date).format('MMMM');
        if (month === monthOfEvent) eventsByMonth.push(event);
      });
      return (
        <li key={month}>
          <Month monthName={month.toString()} events={eventsByMonth}></Month>
        </li>
      );
    });
  };

  const calendarElement = () => {
    if (isLoading) return <h1>Loading</h1>;
    return (
      <StyledCalendar className="App">
        <div>
          <ul>{eventsIntoMonthBuckets()}</ul>
        </div>
      </StyledCalendar>
    );
  };

  const coverElement = () => {
    if (!authCtx.isLoggedIn) return null;
    return (
      <div className="cover">
        <div
          type="button"
          onClick={toggleAddEventPanel}
          className="add-event-button"
        >
          <span
            className={`add-event-button-text  ${
              isPanelOpen ? 'clicked add-event-button-text' : ''
            }`}
          >
            +
          </span>
        </div>
        <AddEventPanel isOpen={isPanelOpen}></AddEventPanel>
      </div>
    );
  };

  const topMenu = () => {
    const today = moment(new Date());
    return (
      <TopMenu>
        <div className="first-row">
          <span className="year">{today.format('YYYY')}</span>
          <OptionsButton onClick={toggleOptionsMenu}>Options</OptionsButton>
        </div>
        <div className="second-row">
          <span className="day-name bold">Today</span>
          <div>
            <span className="day-name">{today.format('MM')} - </span>
            <span className="day-name">{today.format('DD')} </span>
            <span className="day-name">{today.format('dddd')}</span>
          </div>
        </div>
      </TopMenu>
    );
  };

  return (
    <div>
      {topMenu()}
      <OptionsMenu
        isMenuOpen={isOptionsMenuOpen}
        toggleOptionsMenuChild={toggleOptionsMenuChild}
      />
      {calendarElement()}
      {coverElement()}
    </div>
  );
};

export default CalendarPage;

/*--------------------------------------
------------Styled Components-----------
--------------------------------------*/
const StyledCalendar = styled.div`
  padding: 0 30px;
`;

const TopMenu = styled.div`
  user-select: none;
  display: flex;
  z-index: 2;
  flex-direction: column;
  position: sticky;
  background: white;
  padding: 16px 20px;
  top: 0px;
  border-bottom: 1px solid whitesmoke;

  .first-row {
    display: flex;
    justify-content: space-between;

    .year {
      font-family: 'Montserrat-semibold';
      font-size: 4em;
    }
  }

  .second-row {
    font-size: 1em;
    font-family: 'montserrat-light';
  }
`;

const OptionsButton = styled.button`
  all: unset;
  cursor: pointer;
  z-index: 2;
  font-size: 2em;
  font-weight: bold;
`;
const Nothing = styled.div`
  user-select: none;
  font-size: calc(1rem + 16vw);
  font-weight: 800;
  display: flex;
  justify-content: center;
  flex-direction: column;
  letter-spacing: -6px;
`;
