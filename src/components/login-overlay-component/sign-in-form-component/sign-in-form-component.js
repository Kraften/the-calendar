import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { auth } from '../../../services/firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AuthContext from '../../../store/auth-context';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { handlePromise } from '../../../utils/utils';

const SignInForm = ({
    isMenuOpen,
    toggleOptionsMenuChild,
    closeMenuAfterLogin
}) => {
    const authCtx = useContext(AuthContext);
    const [a, setA] = useState(isMenuOpen);
    // Destructuring of features from useForm package.
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors }
    } = useForm();

    // Settings for registration of the inputs in the form.
    const formOptions = {
        email: { required: 'Email is required' },
        password: { required: 'Password is required' }
    };

    const signIn = async (email, password) => {
        let [userCredentials, signInErr] = await handlePromise(
            signInWithEmailAndPassword(auth, email, password)
        );

        if (signInErr) {
            // Login fails
            const errorCode = signInErr.code;
            const errorMessage = signInErr.message;
            console.log(errorCode, errorMessage);
        }

        if (userCredentials) {
            // Login success
            const user = userCredentials.user;
            authCtx.login(user.accessToken);
            const isMenuOpenLocal = isMenuOpen;
            reset(); // Reset the form.'
            closeMenuAfterLogin(!isMenuOpenLocal);
            toggleOptionsMenuChild();
        }
    };

    const onSubmitClick = () => {
        const enteredEmail = getValues('email');
        const enteredPassword = getValues('password');
        signIn(enteredEmail, enteredPassword);
    };

    const handleFormError = (error) => {
        console.log('Login missing values:', error);
    };

    {
        // if (isMenuOpen) {
        return (
            <StyledForm onSubmit={handleSubmit(onSubmitClick, handleFormError)}>
                <input
                    placeholder="EMAIL"
                    name="email"
                    type="text"
                    {...register('email', formOptions.email)}
                />
                <input
                    placeholder="PASSWORD"
                    name="password"
                    type="password"
                    {...register('password', formOptions.password)}
                />
                <input type="submit" value="LOGIN" />
            </StyledForm>
        );
        // }
        //  else {
        //     return <div></div>;
        // }
    }
};

SignInForm.propTypes = {
    // TODO: Add correct propType here!
    isMenuOpen: PropTypes.any,
    closeMenuAfterLogin: PropTypes.func,
    toggleOptionsMenuChild: PropTypes.func
};

export default SignInForm;

/*--------------------------------------
------------Styled Components-----------
--------------------------------------*/
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`;
