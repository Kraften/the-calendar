import moment from "moment";
import "../../App.css";
import eventList from "../../mocks/mocks";
import Event from "../day/event.js";
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

export default Month;
