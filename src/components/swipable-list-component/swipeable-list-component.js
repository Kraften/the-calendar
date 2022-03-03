import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './SwipableList.css';

const SwipableList = ({ children }) => {
    return <List className="List">{children}</List>;
};

export default SwipableList;

SwipableList.propTypes = {
    children: PropTypes.any
};

/*--------------------------------------
------------Styled Components-----------
--------------------------------------*/

const List = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
`;
