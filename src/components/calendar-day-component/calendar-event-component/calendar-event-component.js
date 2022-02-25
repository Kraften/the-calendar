import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';

const CalendarEventComponent = (props) => {
    const dateTime = moment(props.event.date);
    return (
        <StyledEvent key={props.event.id} className="event flex-column">
            <span className="event-time">{dateTime.format('hh:mm')}</span>
            <span className="event-name">{props.event.title}</span>
            <span>{props.event.comment}</span>
        </StyledEvent>
    );
};

/*--------------------------------------
------------Styled Components-----------
--------------------------------------*/
const StyledEvent = styled.div`
    width: 300px;
    height: 150px;
    padding-left: 20px;
    margin: 7px;
    border-left: 11px solid black;
    font-family: 'montserrat-medium';
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);

    &:hover {
        border-left: 25px solid black;
    }
    span {
        padding-bottom: 15px;
    }

    .event-name {
        font-size: 1.5em;
    }
    .event-time {
        font-family: 'montserrat-semibold';
        font-size: 1.5em;
    }
`;

CalendarEventComponent.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        date: PropTypes.string,
        start: PropTypes.string,
        end: PropTypes.string,
        comment: PropTypes.string
    })
};

export default CalendarEventComponent;
