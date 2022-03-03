import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import CalendarEventComponent from './calendar-event-component/calendar-event-component';
import SwipableList from '../swipable-list-component/swipeable-list-component';
import SwipeableListItem from '../swipable-list-component/swipeable-lits-item-component';

/**
 * @param eventList list of events.
 * @returns Bucket named by day and date and holds array of events on that day.
 *
 * exp. { Friday 01: [ {…}, {…} ] }
 */
const eventsIntoDayBuckets = (eventList) => {
    var dayBucket = {};
    eventList.map((event) => {
        let dayName = `${moment(event.date).format('dddd')} ${moment(
            event.date
        ).format('DD')}`;
        dayBucket[dayName] = dayBucket[dayName] || [];
        return dayBucket[dayName].push(event);
    });
    return dayBucket;
};

const DayComponent = ({ eventsInMonth }) => {
    var dayBucket = eventsIntoDayBuckets(eventsInMonth);
    const daysInMonth = [];
    Object.entries(dayBucket).map((dayBucket) => {
        const events = dayBucket[1];
        const day = dayBucket[0].split(' ');
        const dayName = day[0];
        const dayNumber = day[1];

        const today = moment(new Date());
        const eventTOday = moment(new Date()).set('date', day[1]);
        const eventIsToday = today.isSame(eventTOday, 'day');

        return daysInMonth.push(
            <Day key={dayNumber} className={eventIsToday ? 'eventIsToday' : ''}>
                <div className="flex-column">
                    <span className="date-number">{dayNumber}</span>
                    <span className="date-name">{dayName}</span>
                </div>
                <div className="events">
                    <SwipableList>
                        {events.map((event) => {
                            const a = (
                                <CalendarEventComponent
                                    eventIsToday={eventIsToday}
                                    key={event.id}
                                    event={event}
                                ></CalendarEventComponent>
                            );
                            return (
                                <SwipeableListItem key={event.id}>
                                    {a}
                                </SwipeableListItem>

                                // <div key={event.id}>
                                //     <CalendarEventComponent
                                //         eventIsToday={eventIsToday}
                                //         key={event.id}
                                //         event={event}
                                //     ></CalendarEventComponent>
                                // </div>
                            );
                        })}
                    </SwipableList>
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
    grid-template-columns: 1fr 1fr;
    border-top: 1px solid black;
    padding-top: 15px;
    padding-bottom: 15px;

    &.eventIsToday {
        padding-left: 10px;
        padding-right: 10px;
        background-image: linear-gradient(328deg, #3c3a3a 0%, #000000 74%);
        color: white;
    }

    .day {
        display: grid;
        grid-template-columns: 1fr 1fr;
        border-top: 1px solid black;
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
        margin-bottom: 20px;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }

    .date-name {
        font-family: 'montserrat-light';
    }
`;

DayComponent.propTypes = {
    eventsInMonth: PropTypes.array
};

export default DayComponent;
