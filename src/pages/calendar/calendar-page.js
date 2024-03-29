import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import OptionsMenuComponent from '../../components/options-menu-component';
import AddEventPanel from '../../components/calendar-add-event-panel-component';
import styled from 'styled-components';

import FirebaseEventsService from '../../services/firebase/events.service';
import CalendarMonthComponent from '../../components/calendar-month-component';
import TopMenuComponent from '../../components/top-menu-component.react';
import AuthContext from '../../store/auth-context';
import useBooleanToggle from '../../hooks/useBooleanToggle';

const CalendarPage = () => {
  const authCtx = useContext(AuthContext);
  const today = moment(new Date());
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [eventsBeforeToday, setEventsBeforeToday] = useState([]);
  const [eventsTodayOrAfter, setEventsTodayOrAfter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showHistory, toggleHistory] = useBooleanToggle(false);

  useEffect(() => {
    const unsubscribe = FirebaseEventsService.getAllQuery((querySnapshot) => {
      const eventsList = querySnapshot.docs.map((docSnapshot) => {
        return docSnapshot.data();
      });
      setIsLoading(false);
      const b = addIsBeforeBooleanToEvent(eventsList);
      splitOldAndNewEvents(b);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleOptionsMenuChildToggle = () => {
    handleOptionsMenuToggle();
  };

  const handleOptionsMenuToggle = () => {
    setIsOptionsMenuOpen(!isOptionsMenuOpen);
  };

  const handleAddEventPanelToggle = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const addIsBeforeBooleanToEvent = (events) => {
    if (events) {
      const eventsWithBeforeBoolean = events.map((e) => {
        const newEvent = {
          ...e,
          isBeforeToday: !today.isSameOrBefore(e.date, 'day')
        };
        return newEvent;
      });
      return eventsWithBeforeBoolean;
    }
  };

  /**
   * Split elements by before today, today and beyond.
   * @param {*} events
   */
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

  const eventsIntoYearBuckets = (events) => {
    if (events) {
      const yearBucketList = events.reduce((acc, item) => {
        acc[moment(item.date).format('YYYY')] = [
          ...(acc[moment(item.date).format('YYYY')] || []),
          item
        ];
        return acc;
      }, {});
      return yearBucketList;
    }
  };

  const listElementsByYear = () => {
    const eventsInYearBuckets = eventsIntoYearBuckets(eventsTodayOrAfter);
    const litsElementsByYear = [];
    for (const [year, eventList] of Object.entries(eventsInYearBuckets)) {
      litsElementsByYear.push(
        <li key={year}>
          {today.format('YYYY') !== year ? <Year>{year}</Year> : null}
          <ul>
            {showHistory ? eventsIntoMonthBuckets(eventsBeforeToday) : null}
            {eventsIntoMonthBuckets(eventList)}
          </ul>
        </li>
      );
    }
    return litsElementsByYear;
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
          <CalendarMonthComponent
            monthName={month.toString()}
            events={eventsByMonth}
          ></CalendarMonthComponent>
        </li>
      );
    });
  };

  const calendarElement = () => {
    if (isLoading) return <h1>Loading</h1>;
    return (
      <StyledCalendar>
        <ShowHistoryButton onClick={toggleHistory}>
          {showHistory ? 'Hide history' : 'Show history'}
        </ShowHistoryButton>
        <div>
          <ul>{listElementsByYear()}</ul>
        </div>
      </StyledCalendar>
    );
  };

  const coverElement = () => {
    if (!authCtx.isLoggedIn) return null;
    return (
      <div className="cover">
        <AddEventButton onClick={handleAddEventPanelToggle}>
          <span
            className={`add-event-button-text  ${
              isPanelOpen ? 'clicked add-event-button-text' : ''
            }`}
          >
            +
          </span>
        </AddEventButton>
        <AddEventPanel isOpen={isPanelOpen}></AddEventPanel>
      </div>
    );
  };

  const nothingToDoElement = (
    <Nothing>
      <span>NOTHING</span>
      <span> TO DO </span>
    </Nothing>
  );

  return (
    <div>
      <TopMenuComponent
        toggleOptionsMenu={handleOptionsMenuToggle}
      ></TopMenuComponent>
      <OptionsMenuComponent
        isMenuOpen={isOptionsMenuOpen}
        handleOptionsMenuChildToggle={handleOptionsMenuChildToggle}
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
const Year = styled.div`
  font-family: 'Montserrat-semibold';
  font-size: 4em;
  background-color: var(--calendar-black);
  color: white;
  padding-left: 10px;
`;

const AddEventButton = styled.div`
  all: unset;
  background-color: #000;
  color: white;
  cursor: pointer;
  width: 60px;
  height: 60px;
  margin: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  font-family: 'montserrat-semibold';
  position: absolute;
  bottom: 0;
  right: 0;
  transition: all 0.3s ease-in-out;
  .add-event-button-text.clicked {
    transform: rotate(45deg);
  }
  .add-event-button:hover {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
      0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
      0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
  }
  .add-event-button-text {
    transition: all 0.3s ease-in-out;
  }
`;
const ShowHistoryButton = styled.div`
  cursor: pointer;
  margin-top: 10px;
  background: var(--calendar-black);
  color: lightgoldenrodyellow;
  padding: 10px;
  transition: all 2s ease-in-out;
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
