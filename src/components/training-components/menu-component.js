import React from 'react';
import styled from 'styled-components';
import TrainingMenuItemComponents from './menu-item-component';
import PropTypes from 'prop-types';

const TrainingMenuComponent = ({ passToParent }) => {
  return (
    <StylesMenu>
      <TrainingMenuItemComponents passToParent={passToParent} />
    </StylesMenu>
  );
};

TrainingMenuComponent.propTypes = {
  passToParent: PropTypes.func
};

export default TrainingMenuComponent;

/*--------------------------------------
------------Styled Components-----------
--------------------------------------*/
const StylesMenu = styled.ul`
  display: flex;
  gap: 20px;
`;
