import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CalendarDayComponent from '../calendar-day-component/calendar-day-component';
import '../../App.css';
import './month-component.css';

/**
 *
 * @param {*} props { events: [], monthName: string }
 * @returns
 */
function Month(props) {
    const eventsInMonth = [];
    // Map events into month buckets.
    props.events.map((event) => {
        const monthName = moment(event.date).format('MMMM');
        if (monthName === props.monthName) {
            eventsInMonth.push(event);
        }

        // Sort events in moth bucket on date, ascending.
        eventsInMonth.sort(
            (a, b) => moment(a.date).valueOf() - moment(b.date).valueOf()
        );
    });

    // Checks if month has events, if not we dont draw month at all.
    const monthHasEvents = eventsInMonth.length > 0 ? true : false;
    if (monthHasEvents) {
        return (
            <div className="flex-column">
                <span className="month-name">{props.monthName}</span>
                <CalendarDayComponent
                    key={eventsInMonth}
                    eventsInMonth={eventsInMonth}
                ></CalendarDayComponent>
            </div>
        );
    } else {
        return null;
    }
}

Month.propTypes = {
    monthName: PropTypes.string,
    events: PropTypes.array
};

export default Month;
