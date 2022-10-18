import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import moment from 'moment';
import AuthContext from '../store/auth-context';
import FirebaseEventsService from '../services/firebase/events.service';

// Destructed prop { event } is an object containing information that this component renders.
const CalendarEventComponent = ({ event, eventIsToday }) => {
  const eventDateTime = moment(event.date);
  const authCtx = useContext(AuthContext);

  const handleEventDelete = (id) => {
    FirebaseEventsService.deleteEventById(id);
  };

  return (
    <StyledEvent
      className={
        event.isBeforeToday
          ? 'eventIsOld'
          : 'null' && eventIsToday
          ? 'event flex-column eventIsToday'
          : 'event flex-column'
      }
      key={event.id}
    >
      <div className="title-and-x-row">
        <span className="event-name">{event.title}</span>
        {authCtx.isLoggedIn ? (
          <span className="x" onClick={() => handleEventDelete(event.id)}>
            X
          </span>
        ) : (
          ''
        )}
      </div>
      <span className="event-time">{eventDateTime.format('HH:mm')}</span>

      <span>{event.comment}</span>
    </StyledEvent>
  );
};

/*--------------------------------------
------------Styled Components-----------
--------------------------------------*/
const StyledEvent = styled.li`
  padding-left: 20px;
  margin: 7px;
  border-left: 11px solid var(--calendar-black);
  font-family: 'montserrat-medium';
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);

  &.eventIsToday {
    border-left: 11px solid white;
  }

  &.eventIsOld {
    opacity: 0.1;
  }

  &:hover span.x {
    display: flex;
  }

  .x {
    display: none;
    cursor: pointer;
    font-weight: bold;
  }

  span {
    padding-bottom: 15px;
    word-wrap: break-word;
  }

  .event-name {
    font-size: 1.5em;
  }
  .event-time {
    font-family: 'montserrat-semibold';
    font-size: 1.5em;
  }
  .title-and-x-row {
    display: flex;
    justify-content: space-between;
  }
`;

CalendarEventComponent.propTypes = {
  listItemClick: PropTypes.any,
  eventIsToday: PropTypes.bool,
  event: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    comment: PropTypes.string,
    isBeforeToday: PropTypes.bool
  })
};

export default CalendarEventComponent;
