import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SessionListItemComponent = (props) => {
  const { session } = props;
  const [isSessionOpen, setIsSessionOpen] = useState(false);

  const handleSessionClick = () => {
    setIsSessionOpen(!isSessionOpen);
  };

  return (
    <div key={session.id} onClick={handleSessionClick}>
      {/* {isSessionOpen ? ( */}
      <Wrapper>
        <h2>asd</h2>
        {/* <Name>{session.name}</Name> */}
        <div>
          asdasdasdd
          {/* {session.exercises.map((exercise) => {
            return <p key={exercise.id}>{exercise.name}</p>;
          })} */}
        </div>
      </Wrapper>
      {/* ) : null} */}
    </div>
  );
};

SessionListItemComponent.propTypes = {
  session: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    exercises: PropTypes.array
  })
};
export default SessionListItemComponent;

/*--------------------------------------
------------Styled Components-----------
--------------------------------------*/
// const StyledSession = styled.div`
//   animation: fadeIn 700ms linear forwards;
//   cursor: pointer;
//   padding: 1.5rem;
//   color: white;
//   box-shadow: 10px 10px black;

//   background: linear-gradient(
//     36deg,
//     rgba(31, 31, 31, 1) 0%,
//     rgba(5, 5, 5, 1) 35%,
//     rgba(75, 75, 75, 1) 100%
//   );
// `;

const Wrapper = styled.div`
  margin: 1rem;
  padding: 1rem;
  cursor: pointer;
  background-color: black;
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease-out;
  &:hover {
    grid-template-rows: 1fr;
    background-color: green;
  }
  div {
    color: white;
    overflow: hidden;
  }
`;
const Name = styled.div``;
const Inner = styled.div`
  overflow: hidden;
`;
