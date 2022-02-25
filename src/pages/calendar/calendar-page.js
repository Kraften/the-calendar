import React, { Component, useEffect, useState } from 'react';
import moment from 'moment';
import AddEventPanel from '../../components/add-event-panel-component/add-event-panel-component';
import Month from '../../components/month-component/month-component';
import list from '../../mocks/mocks';
import styled from 'styled-components';
import FirebaseEventsService from '../../services/firebase/events.service';
import './calendar-page.css';
import { onSnapshot } from 'firebase/firestore';

const CalendarPage = () => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [year, setYear] = useState('');

    useEffect(() => {
        const query = FirebaseEventsService.getAllQuery();
        onSnapshot(query, (querySnap) => {
            setYear(moment(querySnap.docs[0].data().date).format('YYYY'));
            setCalendarEvents(querySnap.docs.map((e) => e.data()));
        });
    }, []);

    const openAddEventPanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };

    const eventsIntoMonthBuckets = () => {
        const monthList = moment.months();
        let eventsByMonth = [];
        const monthBucket = monthList.map((month) => {
            calendarEvents.map((event) => {
                const monthOfEvent = moment(event.date).format('MMMM');
                if (month === monthOfEvent) {
                    eventsByMonth.push(event);
                }
                return eventsByMonth;
            });
            return (
                <li key={month}>
                    <Month
                        monthName={month.toString()}
                        events={eventsByMonth}
                    ></Month>
                </li>
            );
        });
        return monthBucket;
    };

    return (
        <StyledCalendar className="App">
            <div>
                <StyledYearText className="top-year">
                    <span className="year">{year}</span>
                </StyledYearText>
                <div className="cover">
                    <button
                        type="button"
                        onClick={openAddEventPanel}
                        className="add-event-button"
                    >
                        <span
                            className={
                                isPanelOpen
                                    ? 'add-event-button-text clicked'
                                    : 'add-event-button-text'
                            }
                        >
                            +
                        </span>
                    </button>
                    <AddEventPanel isOpen={isPanelOpen}></AddEventPanel>
                </div>

                <ul>{eventsIntoMonthBuckets()}</ul>
            </div>
        </StyledCalendar>
    );
};

export default CalendarPage;
/*--------------------------------------
------------Styled Components-----------
--------------------------------------*/
const StyledCalendar = styled.div`
    padding: 0 30px;
`;

const StyledYearText = styled.div`
    display: flex;
    justify-content: center;

    span {
        font-family: 'Montserrat-semibold';
        font-size: 4em;
    }
`;
