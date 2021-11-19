import moment from "moment";
import "./event.css";

const eventsIntoDayBuckets = function (eventList) {
    var period = {};
    eventList.map((d) => {
        let dayName = `${moment(d.date).format("dddd")} ${moment(d.date).format(
            "DD"
        )}`;
        period[dayName] = period[dayName] || [];
        return period[dayName].push(d);
    });
    return period;
};

function Event(props) {
    var objPeriodDay = eventsIntoDayBuckets(props.eventsOfMonth);
    const array = [];
    Object.entries(objPeriodDay).map((dayBucket) => {
        const events = dayBucket[1];
        const day = dayBucket[0].split(" ");
        const dayName = day[0];
        const dayNumber = day[1];
        return array.push(
            <div className="day">
                <div className="flex-column">
                    <span className="date-number">{dayNumber}</span>
                    <span className="date-name">{dayName}</span>
                </div>
                <div className="events">
                    {events.map((event) => {
                        const dateTime = moment(event.date);
                        return (
                            <div className="event flex-column">
                                <span className="event-time">
                                    {dateTime.format("hh:mm")}
                                </span>
                                <span className="event-name">{event.name}</span>
                                <span className="event-comment">
                                    {event.comment}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    });
    return <div>{array}</div>;
}

export default Event;
