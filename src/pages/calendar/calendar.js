import React, { Component } from "react";
import moment from "moment";
import AddEventPanel from "../../components/add-event-panel/add-event-panel";
import Month from "../../components/month/month";
import list from "../../components/mocks/mocks";
import styled from "styled-components";
import "./calendar.css";

export default class Calendar extends Component {
    constructor() {
        super();
        this.state = {
            isPanelOpen: false
        };
    }

    openAddEventPanel = () => {
        this.setState({
            isPanelOpen: !this.state.isPanelOpen
        });
    };

    getYear = () => {
        return moment(list[0].date).format("YYYY");
    };

    eventsIntoMonthBuckets = () => {
        const monthList = moment.months();
        let eventsByMonth = [];
        const monthBucket = monthList.map((month) => {
            list.map((event) => {
                const monthOfEvent = moment(event.date).format("MMMM");
                if (month === monthOfEvent) {
                    eventsByMonth.push(event);
                }
                return eventsByMonth;
            });
            return (
                <li key={month.monthName}>
                    <Month monthName={month.toString()} events={eventsByMonth}></Month>
                </li>
            );
        });
        return monthBucket;
    };

    render() {
        const { isPanelOpen } = this.state;

        return (
            <StyledCalendar className="App">
                <div>
                    <StyledYearText className="top-year">
                        <span className="year">{this.getYear()}</span>
                    </StyledYearText>
                    <div className="cover">
                        <button
                            type="button"
                            onClick={this.openAddEventPanel}
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
            </StyledCalendar>
        );
    }
}

/*--------------------------------------
------------Styled Components-----------
--------------------------------------*/
const StyledCalendar = styled.div`
    padding: 0 30px;
`

const StyledYearText = styled.div`
    display: flex;
    justify-content: center;
    
    span {
        font-family: 'Montserrat-semibold';
        font-size: 4em;
    }
`