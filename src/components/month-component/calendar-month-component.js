import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CalendarDayComponent from '../day-component/calendar-day-component';
import styled from 'styled-components';

/**
 *
 * @param {*} props { events: [], monthName: string }
 * @returns
 */
function CalendarMonthComponent(props) {
  const eventsInMonth = [];
  // Map events into month buckets.
  props.events.map((event) => {
    const monthName = moment(event.date).format('MMMM');
    const sameMonthNames = monthName == props.monthName ? true : false;
    if (!sameMonthNames) return;

    eventsInMonth.push(event);
    // Sort events in moth bucket on date, ascending.
    eventsInMonth.sort(
      (a, b) => moment(a.date).valueOf() - moment(b.date).valueOf()
    );
  });

  // Checks if month has events, if not we dont draw month at all.
  const monthHasEvents = eventsInMonth.length > 0 ? true : false;
  if (!monthHasEvents) return null;
  return (
    <MonthContainer className="flex-column">
      <span className="month-name">{props.monthName}</span>
      <CalendarDayComponent
        key={eventsInMonth}
        eventsInMonth={eventsInMonth}
      ></CalendarDayComponent>
    </MonthContainer>
  );
}

/*--------------------------------------
------------Styled Components-----------
--------------------------------------*/
const MonthContainer = styled.div`
  animation: fadeIn 500ms linear forwards;
  .month-name {
    font-size: 2rem;
    padding: 20px 0px;
  }
`;

CalendarMonthComponent.propTypes = {
  monthName: PropTypes.string,
  events: PropTypes.array
};

export default CalendarMonthComponent;
