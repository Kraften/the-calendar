import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import FirebaseEventsService from '../../../services/firebase/events.service';
import AuthContext from '../../../store/auth-context';

// Destructed prop { event } is an object containing information that this component renders.
const CalendarEventComponent = ({ event, eventIsToday }) => {
  const dateTime = moment(event.date);
  const authCtx = useContext(AuthContext);
  const listItemClick = (id) => {
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
          <span className="x" onClick={() => listItemClick(event.id)}>
            X
          </span>
        ) : (
          ''
        )}
      </div>
      <span className="event-time">{dateTime.format('HH:mm')}</span>

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
  border-left: 11px solid black;
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
