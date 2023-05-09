import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const menuItems = [
  { id: 1, name: 'Sessions' },
  { id: 2, name: 'Exercises' }
];
const TrainingMenuItemComponents = ({ passToParent }) => {
  const [selectedItemId, setSelectedItemId] = useState(1);

  const handleToggle = (id) => {
    setSelectedItemId(id);
    passToParent(selectedItemId);
  };
  const menuItemsComponent = () => {
    const a = menuItems.map((item) => {
      return (
        <StylesMenuItems
          key={item.id}
          className={selectedItemId === item.id ? 'selected' : ''}
          onClick={() => handleToggle(item.id)}
        >
          <h2>{item.name}</h2>
        </StylesMenuItems>
      );
    });
    return a;
  };

  return <>{menuItemsComponent()}</>;
};

TrainingMenuItemComponents.propTypes = {
  asd: PropTypes.number,
  passToParent: PropTypes.func
};

export default TrainingMenuItemComponents;

/*--------------------------------------
------------Styled Components-----------
--------------------------------------*/
const StylesMenuItems = styled.li`
  cursor: pointer;
  &.selected {
    border-bottom: 3px solid black;
  }
`;
