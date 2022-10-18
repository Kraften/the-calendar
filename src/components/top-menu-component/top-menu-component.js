import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TopMenuComponent = (props) => {
  const { firstRowHeaderText, hasTwoRows, click, today } = props;

  return (
    <StyledTopMenu>
      <div className="first-row">
        <span className="headerText">{firstRowHeaderText}</span>
        <OptionsButton onClick={click}>Options</OptionsButton>
      </div>
      {hasTwoRows ? (
        <div className="second-row">
          <span className="day-name bold">Today</span>
          <div>
            <span className="day-name">{today.format('MM')} - </span>
            <span className="day-name bold">{today.format('DD')}</span>
            <span className="day-name"> - {today.format('dddd')}</span>
          </div>
        </div>
      ) : null}
    </StyledTopMenu>
  );
};

export default TopMenuComponent;
/*--------------------------------------
------------Styled Components-----------
--------------------------------------*/
const StyledTopMenu = styled.div`
  animation: fadeIn 500ms linear forwards;
  user-select: none;
  display: flex;
  z-index: 2;
  flex-direction: column;
  position: sticky;
  background: white;
  padding: 16px 20px;
  top: 0px;
  border-bottom: 1px solid whitesmoke;

  .first-row {
    display: flex;
    justify-content: space-between;

    .headerText {
      font-family: 'Montserrat-semibold';
      font-size: 4em;
    }
  }

  .second-row {
    font-size: 1em;
    font-family: 'montserrat-light';
  }
`;
const OptionsButton = styled.button`
  all: unset;
  cursor: pointer;
  z-index: 2;
  font-size: 2em;
  font-weight: bold;
`;

TopMenuComponent.propTypes = {
  firstRowHeaderText: PropTypes.string,
  hasTwoRows: PropTypes.bool,
  click: PropTypes.func,
  today: PropTypes.any
};
