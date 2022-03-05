import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import OptionsMenu from '../../components/options-component/options-menu-component';
import AddEventPanel from '../../components/add-event-panel-component/add-event-panel-component';
import Month from '../../components/month-component/month-component';
import styled from 'styled-components';
import FirebaseEventsService from '../../services/firebase/events.service';
import './calendar-page.css';
import { onSnapshot } from 'firebase/firestore';
import AuthContext from '../../store/auth-context';

const CalendarPage = () => {
    const authCtx = useContext(AuthContext);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [year, setYear] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        () => {
            const query = FirebaseEventsService.getAllQuery();
            onSnapshot(query, (querySnap) => {
                if (querySnap.docs.length == 0) {
                    setIsLoading(true);
                    setCalendarEvents(querySnap.docs.map((e) => e.data()));
                    setYear(moment(new Date()).format('YYYY'));
                    setIsLoading(false);
                } else {
                    setIsLoading(true);
                    setYear(
                        moment(querySnap.docs[0].data().date).format('YYYY')
                    );
                    setCalendarEvents(querySnap.docs.map((e) => e.data()));
                    setIsLoading(false);
                }
            });
        },
        [
            // TODO: Check if active day updates after new day starts at 00:00
            // Reloads component constantly.
            // calendarEvents
        ]
    );

    const toggleOptionsMenuChild = () => {
        toggleOptionsMenu();
    };

    const toggleOptionsMenu = () => {
        setIsOptionsMenuOpen(!isOptionsMenuOpen);
    };

    const toggleAddEventPanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };

    const eventsIntoMonthBuckets = () => {
        const monthList = moment.months();
        let eventsByMonth = [];
        let monthElementList = [];
        if (calendarEvents.length > 0) {
            monthElementList = monthList.map((month) => {
                calendarEvents.map((event) => {
                    const monthOfEvent = moment(event.date).format('MMMM');
                    if (month === monthOfEvent) {
                        eventsByMonth.push(event);
                    }
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
        } else {
            return (
                <Nothing>
                    <span>NOTHING</span>
                    <span> TO DO {isLoading}</span>
                </Nothing>
            );
        }
        return monthElementList;
    };

    return (
        <div>
            <TopMenu className="top-year">
                <span className="year">{year}</span>
                <OptionsButton onClick={toggleOptionsMenu}>
                    Options
                </OptionsButton>
            </TopMenu>
            <OptionsMenu
                isMenuOpen={isOptionsMenuOpen}
                toggleOptionsMenuChild={toggleOptionsMenuChild}
            />
            {isLoading ? (
                <h1>Loading</h1>
            ) : (
                <StyledCalendar className="App">
                    <div>
                        <ul>{eventsIntoMonthBuckets()}</ul>
                    </div>
                </StyledCalendar>
            )}

            {authCtx.isLoggedIn ? (
                <div className="cover">
                    <div
                        type="button"
                        onClick={toggleAddEventPanel}
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
                    </div>
                    <AddEventPanel isOpen={isPanelOpen}></AddEventPanel>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default CalendarPage;

/*--------------------------------------
------------Styled Components-----------
--------------------------------------*/
const StyledCalendar = styled.div`
    padding: 0 30px;
`;

const TopMenu = styled.div`
    user-select: none;
    display: flex;
    z-index: 2;
    justify-content: space-between;
    position: sticky;
    background: white;
    padding: 16px 20px;
    top: 0px;
    border-bottom: 1px solid whitesmoke;

    span {
        font-family: 'Montserrat-semibold';
        font-size: 4em;
    }
`;
const OptionsButton = styled.button`
    all: unset;
    cursor: pointer;
    z-index: 2;
    font-size: 2em;
    font-weight: bold;
`;
const Nothing = styled.div`
    user-select: none;
    font-size: calc(1rem + 16vw);
    font-weight: 800;
    display: flex;
    justify-content: center;
    flex-direction: column;
    letter-spacing: -6px;
`;
