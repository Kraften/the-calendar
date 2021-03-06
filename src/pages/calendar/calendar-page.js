import React, { useEffect, useState, useContext, useCallback } from 'react';
import moment from 'moment';
import OptionsMenu from '../../components/options-component/options-menu-component';
import AddEventPanel from '../../components/add-event-panel-component/add-event-panel-component';
import Month from '../../components/month-component/month-component';
import styled from 'styled-components';
import FirebaseEventsService from '../../services/firebase/events.service';
import './calendar-page.css';
import AuthContext from '../../store/auth-context';
import useBooleanToggle from '../../hooks/useBooleanToggle';

const CalendarPage = () => {
  const authCtx = useContext(AuthContext);
  const today = moment(new Date());
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [eventsBeforeToday, setEventsBeforeToday] = useState([]);
  const [eventsTodayOrAfter, setEventsTodayOrAfter] = useState([]);
  const [isLoading, toggleLoading] = useBooleanToggle(true);
  const [showHistory, toggleHistory] = useBooleanToggle(false);

  useEffect(() => {
    const getAllEvents = async () => {
      const query = await FirebaseEventsService.getAllQuery();
      toggleLoading();
      const events = query.docs;
      const eventsWithBeforeBoolean = addIsBeforeBooleanToEvent(events);
      splitOldAndNewEvents(eventsWithBeforeBoolean);
    };
    getAllEvents();
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

  const addIsBeforeBooleanToEvent = (events) => {
    const eventsWithBeforeBoolean = events.map((e) => {
      const newEvent = {
        ...e.data(),
        isBeforeToday: !today.isSameOrBefore(e.data().date, 'day')
      };
      return newEvent;
    });
    return eventsWithBeforeBoolean;
  };

  const nothingToDoElement = (
    <Nothing>
      <span>NOTHING</span>
      <span> TO DO </span>
    </Nothing>
  );

  const splitOldAndNewEvents = (events) => {
    const eventsBefore = [];
    const eventsAfter = [];
    events.forEach((e) => {
      if (e.isBeforeToday) {
        eventsBefore.push(e);
      } else if (!e.isBeforeToday) {
        eventsAfter.push(e);
      }
    });
    setEventsBeforeToday(eventsBefore);
    setEventsTodayOrAfter(eventsAfter);
  };

  const eventsIntoMonthBuckets = (events) => {
    const monthList = moment.months();
    let eventsByMonth = [];
    const eventsListIsEmpty = events.length == 0;
    if (eventsListIsEmpty) return nothingToDoElement;
    return monthList.map((month) => {
      events.map((event) => {
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
        <ShowHistoryButton onClick={toggleHistory}>
          {showHistory ? 'Hide history' : 'Show history'}
        </ShowHistoryButton>
        <div>
          <ul>
            {showHistory ? eventsIntoMonthBuckets(eventsBeforeToday) : null}
            {eventsIntoMonthBuckets(eventsTodayOrAfter)}
          </ul>
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
            <span className="day-name bold">{today.format('DD')}</span>
            <span className="day-name"> - {today.format('dddd')}</span>
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
  animation: fadeIn 500ms linear forwards;
`;

const TopMenu = styled.div`
  animation: fadeIn 500ms linear forwards;

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
const ShowHistoryButton = styled.div`
  cursor: pointer;
  margin-top: 10px;
  background: black;
  color: lightgoldenrodyellow;
  padding: 10px;
  transition: all 2s ease-in-out;
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
