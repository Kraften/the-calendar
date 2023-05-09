import React from 'react';
import PropTypes from 'prop-types';
import SessionListItemComponent from './session-list-item-component';
import styled from 'styled-components';

const SessionComponent = (props) => {
  const { sessions, exercises } = props;

  const sessionsComponent = () => {
    const sessionsListItems = sessions.map((session) => {
      return (
        <StyledSessionList key={session.id}>
          <SessionListItemComponent session={session} />
        </StyledSessionList>
      );
    });
    return sessionsListItems;
  };
  return <>{sessionsComponent()}</>;
};

SessionComponent.propTypes = {
  exercises: PropTypes.array,
  sessions: PropTypes.array
};

export default SessionComponent;

/*--------------------------------------
------------Styled Components-----------
--------------------------------------*/
const StyledSessionList = styled.div``;
