import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './calendar-day-component.css';
import CalendarEventComponent from './calendar-event-component/calendar-event-component';

/**
 *
 * @param {Object} eventList list of events in month
 * @returns Bucket named by day and date if events are present.
 */
const eventsIntoDayBuckets = function (eventList) {
    var period = {};
    eventList.map((event) => {
        let dayName = `${moment(event.date).format('dddd')} ${moment(
            event.date
        ).format('DD')}`;
        period[dayName] = period[dayName] || [];
        return period[dayName].push(event);
    });
    return period;
};

const CalendarDayComponent = (props) => {
    var objPeriodDay = eventsIntoDayBuckets(props.eventsOfMonth);
    const daysInMonth = [];
    Object.entries(objPeriodDay).map((dayBucket) => {
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
                    {events.map((event) => {
                        return (
                            <CalendarEventComponent
                                key={event.id}
                                event={event}
                            ></CalendarEventComponent>
                        );
                    })}
                </div>
            </div>
        );
    });
    return <div>{daysInMonth}</div>;
};

CalendarDayComponent.propTypes = {
    eventsOfMonth: PropTypes.array
};

export default CalendarDayComponent;
