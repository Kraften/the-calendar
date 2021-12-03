import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import eventList from '../../mocks/mocks';
import CalendarDayComponent from '../calendar-day-component/calendar-day-component';
import '../../App.css';
import './month-component.css';

function Month(props) {
    const eventsOfMonth = [];
    eventList.map((event) => {
        const eventMonth = moment(event.date).format('MMMM');
        if (eventMonth === props.monthName) {
            eventsOfMonth.push(event);
        }
        return { eventMonth, event };
    });

    const monthHasEvents = eventsOfMonth.length > 0 ? true : false;
    if (monthHasEvents) {
        return (
            <div className="flex-column">
                <span className="month-name">{props.monthName}</span>
                <CalendarDayComponent
                    key={eventsOfMonth}
                    eventsOfMonth={eventsOfMonth}
                ></CalendarDayComponent>
            </div>
        );
    } else {
        return null;
    }
}

Month.propTypes = {
    monthName: PropTypes.string
};

export default Month;
