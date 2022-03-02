import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './day-component.css';
import CalendarEventComponent from './calendar-event-component/calendar-event-component';

/**
 * @param eventList list of events.
 * @returns Bucket named by day and date and holds array of events on that day.
 *
 * exp. { Friday 01: [ {…}, {…} ] }
 */
const eventsIntoDayBuckets = function (eventList) {
    var dayBucket = {};
    //
    eventList.map((event) => {
        let dayName = `${moment(event.date).format('dddd')} ${moment(
            event.date
        ).format('DD')}`;
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

        return daysInMonth.push(
            <div className="day" key={dayNumber}>
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
                                        key={event.id}
                                        event={event}
                                    ></CalendarEventComponent>
                                </div>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    });
    return <div>{daysInMonth}</div>;
};

CalendarDayComponent.propTypes = {
    eventsInMonth: PropTypes.array
};

export default CalendarDayComponent;
