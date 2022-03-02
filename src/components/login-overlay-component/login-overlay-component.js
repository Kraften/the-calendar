import React from 'react';
import PropTypes from 'prop-types';
import SignInForm from './sign-in-form-component/sign-in-form-component.jsx';
import './login-overlay-component.css';

const LoginOverlay = (props) => {
    const close = () => {
        const showLoginPanel = props.showLoginPanel;
        props.handleClose(!showLoginPanel);
    };
    return (
        <SignInForm></SignInForm>

        // <div
        //     className={
        //         props.showLoginPanel
        //             ? 'overlay flex-column pin-center show'
        //             : 'overlay flex-column pin-center'
        //     }
        // >
        //     <div className="overlay-content flex-column">
        //         <button className="close-button" onClick={close}>
        //             <span
        //                 className={
        //                     props.showLoginPanel
        //                         ? 'close-button-text'
        //                         : 'close-button-text clicked'
        //                 }
        //             >
        //                 X
        //             </span>
        //         </button>
        //     </div>
        // </div>
    );
};

LoginOverlay.propTypes = {
    // TODO: Add correct propType here!
    showLoginPanel: PropTypes.any,
    handleClose: PropTypes.func
};

export default LoginOverlay;
