import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import PropTypes from 'prop-types';

const TopMenuComponent = ({ toggleOptionsMenu }) => {
  const today = moment(new Date());

  return (
    <TopMenu>
      <div className="first-row">
        <span className="year">{today.format('YYYY')}</span>
        <OptionsButton onClick={toggleOptionsMenu}>Options</OptionsButton>
      </div>
      <div className="second-row">
        <span className="day-name bold">Today</span>
        <div>
          <span className="day-name">{today.format('MM')} - </span>
          <span className="day-name bold">{today.format('DD')}</span>
          <span className="day-name"> - {today.format('dddd')}</span>
        </div>
      </div>
    </TopMenu>
  );
};

export default TopMenuComponent;

TopMenuComponent.propTypes = {
  isMenuOpen: PropTypes.bool,
  toggleOptionsMenu: PropTypes.func
};
/*--------------------------------------
------------Styled Components-----------
--------------------------------------*/
const TopMenu = styled.div`
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

    .year {
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
