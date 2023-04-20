import React, { useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import AuthContext from '../store/auth-context';
import SignInForm from './options-menu-sign-in-form-component';

const OptionsMenuComponent = ({ isMenuOpen, handleOptionsMenuChildToggle }) => {
  const authCtx = useContext(AuthContext);
  const [showLoginForm, setShowLoginForm] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    // Make sure login form closes when options menu closes.
    if (!isMenuOpen) {
      setShowLoginForm(false);
    }
  }, [isMenuOpen]);

  const MenuItems = () => {
    // const handleArtClick = () => {
    //   navigate('/art')
    // };
    const handleLogoutClick = () => {
      authCtx.logout();
    };
    const handleClickLoginMenuOpen = () => {
      setShowLoginForm(!showLoginForm);
    };
    return (
      <Menu>
        {!authCtx.isLoggedIn ? (
          <div>
            <MenuItem onClick={handleClickLoginMenuOpen}>Login</MenuItem>
            <SignInForm
              show={showLoginForm}
              handleOptionsMenuChildToggle={handleOptionsMenuChildToggle}
            ></SignInForm>
          </div>
        ) : (
          <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
        )}
        {/* <MenuItem onClick={handleArtClick}>Art</MenuItem> */}
      </Menu>
    );
  };
  return (
    <Container className={isMenuOpen ? 'open' : ''}>{MenuItems()}</Container>
  );
};

export default OptionsMenuComponent;

OptionsMenuComponent.propTypes = {
  isMenuOpen: PropTypes.bool,
  handleOptionsMenuChildToggle: PropTypes.func
};

/*--------------------------------------
------------Styled Components-----------
--------------------------------------*/
const Container = styled.div`
  z-index: 1;
  position: fixed;
  top: -20px;
  left: 0;
  height: 0%;
  width: 100%;
  padding: 30px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.6s;
  background: radial-gradient(
    circle at 414% 336%,
    #ffffff,
    #f8f8f8,
    #e6e6e6,
    #cbcbcb,
    #ababab,
    #888888,
    #666666,
    #474747,
    #2d2d2d,
    #191919,
    #080808,
    #000000
  );
  &.open {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
`;

const Menu = styled.ul`
  user-select: none;
  color: white;
`;

const MenuItem = styled.li`
  font-size: 60px;
  font-weight: bold;
  margin: 20px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    font-size: 80px;
  }
`;
