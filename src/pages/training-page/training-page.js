import OptionsMenuComponent from 'components/options-menu-component';
import TopMenuComponent from 'components/top-menu-component.react';
import TrainingMenuComponent from 'components/training-components/menu-component';
import SessionComponent from 'components/training-components/sessions-list-component';
import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

const exercises = [
  {
    name: 'Pushup'
  },
  {
    name: 'Pull-up'
  },
  {
    name: 'Max Jump'
  },
  {
    name: 'Arnold'
  }
];

const sessions = [
  {
    id: 1,
    name: 'Pull push session',
    exercises: [
      {
        id: 1,
        name: 'Pushup'
      },
      {
        id: 2,
        name: 'Pull-up'
      }
    ]
  },
  {
    id: 2,
    name: 'Plyo Session',
    exercises: [
      {
        id: 3,
        name: 'Max Jump'
      },
      {
        id: 4,
        name: 'Arnold'
      }
    ]
  }
];
const TrainingPage = () => {
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  const handleOptionsMenuChildToggle = () => {
    handleOptionsMenuToggle();
  };
  const handleOptionsMenuToggle = () => {
    setIsOptionsMenuOpen(!isOptionsMenuOpen);
  };
  const passToParent = (e) => {
    console.log('asd', e);
  };
  useEffect(() => {
    // setSelected()
  });

  return (
    <>
      <TopMenuComponent
        toggleOptionsMenu={handleOptionsMenuToggle}
      ></TopMenuComponent>
      <OptionsMenuComponent
        isMenuOpen={isOptionsMenuOpen}
        handleOptionsMenuChildToggle={handleOptionsMenuChildToggle}
      />
      <StyledTrainingHome>
        <TrainingMenuComponent
          passToParent={passToParent}
        ></TrainingMenuComponent>
        <StyledTrainingContainer>
          <SessionComponent sessions={sessions} exercises={exercises} />
        </StyledTrainingContainer>
      </StyledTrainingHome>
    </>
  );
};

export default TrainingPage;

/*--------------------------------------
------------Styled Components-----------
--------------------------------------*/
const StyledTrainingHome = styled.div`
  padding: 0 30px;
  animation: fadeIn 500ms linear forwards;
`;

const StyledTrainingContainer = styled.div`
  display: grid;
  row-gap: 20px;
`;
