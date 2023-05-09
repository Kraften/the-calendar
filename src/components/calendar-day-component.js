import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import moment from 'moment';
import CalendarEventComponent from './calendar-event-component';

/**
 * @param eventList list of events.
 * @returns Bucket named by day and date and holds array of events on that day.
 *
 * example. { Friday 01: [ {…}, {…} ] }
 */
const eventsIntoDayBuckets = (eventList) => {
  var dayBucket = {};
  eventList.map((event) => {
    const today = moment(new Date());
    const eventIsToday = today.isSame(event.date, 'day');
    let dayName = `${moment(event.date).format('dddd')} ${moment(
      event.date
    ).format('DD')} ${eventIsToday}`;
    dayBucket[dayName] = dayBucket[dayName] || [];
    return dayBucket[dayName].push(event);
  });
  return dayBucket;
};

const CalendarDayComponent = ({ eventsInMonth }) => {
  var dayBucket = eventsIntoDayBuckets(eventsInMonth);
  const daysInMonth = [];

  Object.entries(dayBucket).map((dayBucket) => {
    const events = dayBucket[1];
    const day = dayBucket[0].split(' ');
    const dayName = day[0];
    const dayNumber = day[1];
    const eventIsToday = String(day[2]) == 'true';

    return daysInMonth.push(
      <Day key={dayNumber} className={eventIsToday ? 'eventIsToday' : ''}>
        <div className="flex-column">
          <span className="date-number">{dayNumber}</span>
          <span className="date-name">{dayName}</span>
        </div>
        <div className="events">
          <ul>
            {events.map((event) => {
              return (
                <div key={event.id}>
                  <CalendarEventComponent
                    eventIsToday={eventIsToday}
                    key={event.id}
                    event={event}
                  ></CalendarEventComponent>
                </div>
              );
            })}
          </ul>
        </div>
      </Day>
    );
  });

  return <div>{daysInMonth}</div>;
};

/*--------------------------------------
------------Styled Components-----------
--------------------------------------*/
const Day = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  border-top: 1px solid var(--calendar-black);
  padding-top: 15px;
  padding-bottom: 15px;

  @media only screen and (max-width: 600px) {
    grid-template-columns: auto 1fr;
    grid-gap: 15px;
  }

  &.oldDays {
    opacity: 0.1;
  }

  &.eventIsToday {
    padding-left: 10px;
    padding-right: 10px;
    background-image: linear-gradient(328deg, #3c3a3a 0%, #000000 74%);
    color: white;
  }

  .day {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-top: 1px solid var(--calendar-black);
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .hour-row {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }

  .date-number {
    font-size: 4rem;
    font-family: 'montserrat-medium';
    margin-top: 20px;
    transition: all 0.2s ease-in-out;
  }

  .date-name {
    font-family: 'montserrat-light';
  }
`;

CalendarDayComponent.propTypes = {
  eventsInMonth: PropTypes.array
};

export default CalendarDayComponent;
