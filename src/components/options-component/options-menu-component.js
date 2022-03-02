import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AuthContext from '../../store/auth-context';
import SignInForm from '../login-overlay-component/sign-in-form-component/sign-in-form-component';

const OptionsMenu = ({ isMenuOpen, toggleOptionsMenuChild }) => {
    const authCtx = useContext(AuthContext);
    const [showLogin, setShowLogin] = useState(false);

    const handleCloseFromChild = (data) => {
        setShowLogin(data);
    };
    const MenuItems = () => {
        const onLogoutClick = () => {
            authCtx.logout();
        };
        const onLoginClick = () => {
            setShowLogin(!showLogin);
        };
        return (
            <Menu>
                {!authCtx.isLoggedIn ? (
                    <MenuItem onClick={onLoginClick}>Login</MenuItem>
                ) : (
                    <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
                )}
            </Menu>
        );
    };
    return (
        <Container className={isMenuOpen ? 'open' : ''}>
            {MenuItems()}
            {showLogin ? (
                <SignInForm
                    toggleOptionsMenuChild={toggleOptionsMenuChild}
                    isMenuOpen={isMenuOpen}
                    handleCloseFromChild={handleCloseFromChild}
                ></SignInForm>
            ) : (
                ''
            )}
        </Container>
    );
};

export default OptionsMenu;

OptionsMenu.propTypes = {
    isMenuOpen: PropTypes.bool,
    toggleOptionsMenuChild: PropTypes.func
};

/*--------------------------------------
------------Styled Components-----------
--------------------------------------*/
const Container = styled.div`
    z-index: 1;
    position: fixed;
    top: 0;
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
    background-color: #2d3436;
    background-image: linear-gradient(315deg, #2d3436 0%, #000000 74%);

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
