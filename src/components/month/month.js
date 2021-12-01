import React from 'react'
import moment from "moment";
import eventList from "../../mocks/mocks";
import Event from "../event/event";
import "../../App.css";
import "./month.css";

function Month(props) {
    const eventsOfMonth = [];

    eventList.map((event) => {
        const eventMonth = moment(event.date).format("MMMM");
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
                <Event eventsOfMonth={eventsOfMonth}></Event>
            </div>
        );
    } else {
        return <div></div>;
    }
}

Month.propTypes = {
    monthName: String
};

export default Month;
