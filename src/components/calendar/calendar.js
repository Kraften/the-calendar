import moment from "moment";
import React, { Component } from "react";
import "./calendar.css";
import AddEventPanel from "../add-event-panel/add-event-panel";
import Month from "../month/month";
import list from "../mocks/mocks";

export default class Calendar extends Component {
    constructor() {
        super();
        this.state = {
            isPanelOpen: false
        };
    }
    onClick = () => {
        this.setState({
            isPanelOpen: !this.state.isPanelOpen
        });
    };

    getYear = () => {
        return moment(list[0].date).format("YYYY");
    };

    eventsIntoMonthBuckets = () => {
        const monthList = moment.months();
        let eventByMonth = [];
        const monthBucket = monthList.map((month) => {
            list.map((event) => {
                const monthOfEvent = moment(event.date).format("MMMM");
                if (month === monthOfEvent) {
                    eventByMonth.push(event);
                }
                return eventByMonth;
            });
            return (
                <li key={month.monthName}>
                    <Month monthName={month} events={eventByMonth}></Month>
                </li>
            );
        });
        return monthBucket;
    };

    render() {
        const { isPanelOpen } = this.state;
        return (
            <div className="App">
                <div>
                    <div className="top-year">
                        <span className="year">{this.getYear()}</span>
                    </div>
                    <div className="cover">
                        <button
                            type="button"
                            onClick={this.onClick}
                            className="add-event-button"
                        >
                            <span
                                className={
                                    isPanelOpen
                                        ? "add-event-button-text clicked"
                                        : "add-event-button-text"
                                }
                            >
                                +
                            </span>
                        </button>
                        <AddEventPanel isOpen={isPanelOpen}></AddEventPanel>
                    </div>

                    <ul>{this.eventsIntoMonthBuckets()}</ul>
                </div>
            </div>
        );
    }
}
