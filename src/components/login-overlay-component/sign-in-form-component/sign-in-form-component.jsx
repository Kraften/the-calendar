import React, { useContext } from "react"
import styled from "styled-components";
import { auth } from '../../../services/firebase/firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
import AuthContext from "../../../store/auth-context";
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { handlePromise } from "../../../utils/utils";

const SignInForm = (props) => {
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
        email: { required: 'Title is required' },
        date: { required: 'Date is required' }
    };
    const authCtx = useContext(AuthContext);

    const signIn = async (email, password) => {
        let [userCredentials, signInErr] = await handlePromise(
            signInWithEmailAndPassword(auth, email,  password)
        );

        if(signInErr) { // Login fails
            const errorCode = signInErr.code;
            const errorMessage = signInErr.message;
            throw new Error(errorMessage)
        }

        if(userCredentials) { // Login success
            const user = userCredentials.user;
            authCtx.login(user.accessToken);
            const isMenuOpen = props.isMenuOpen;
            reset(); // Reset the form.
            props.handleCloseFromChild(!isMenuOpen);
            props.toggleOptionsMenuChild()
        }
      }

    const onSubmitClick = () => {
        const enteredEmail = getValues('email')
        const enteredPassword = getValues('password')
        signIn(enteredEmail, enteredPassword)
    }

    const handleFormError = (data) => {throw new Error(data)}

    return (
        <StyledForm 
            onSubmit={handleSubmit(onSubmitClick, handleFormError)}>
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
                {...register('password', formOptions.date)} 
            />
            <input 
                type="submit" 
                value="SUBMIT"
            />
        </StyledForm>
    )
}

SignInForm.propTypes = {
    // TODO: Add correct propType here!
    isMenuOpen: PropTypes.any,
    handleCloseFromChild: PropTypes.func,
    toggleOptionsMenuChild: PropTypes.func

};

export default SignInForm;

/*--------------------------------------
------------Styled Components-----------
--------------------------------------*/
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`