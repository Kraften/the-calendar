import React, { useRef, useState } from "react"
import styled from "styled-components";
import signIn from "../../../services/firebase/auth-signin";

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const handleEmailInputChange = (event) => {
        event.preventDefault()
        setEmail(event.target.value)
    }

    const handlePasswordInputChange = (event) => {
        event.preventDefault()
        setPassword(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value
        const enteredPassword = passwordInputRef.current.value
        console.log(enteredEmail, enteredPassword)
        signIn(enteredEmail, enteredPassword)
    }

    return (
        <StyledForm>
            <StyledInput type="text" ref={emailInputRef} placeholder="email" required onChange={handleEmailInputChange} />
            <StyledInput type="password" ref={passwordInputRef} placeholder="password" required onChange={handlePasswordInputChange} />
            <StyledButton type="submit" onClick={handleSubmit} />
        </StyledForm>
    )
}

export default SignInForm;

/*--------------------------------------
------------Styled Components-----------
--------------------------------------*/
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`
const StyledInput = styled.input`
    all: unset;
    color: #B3413D;
    background-color: #E5E1D5;;
    height: 50px;
    padding: 0 10px;
    margin-bottom: 10px;
    border-radius: 7px;
`
const StyledButton = styled.input`
    all: unset;
    color: #B3413D;
    background-color: #E5E1D5;;
    height: 50px;
    padding: 0 10px;
    margin-bottom: 10px;
    border-radius: 7px;
    cursor: pointer;
`
