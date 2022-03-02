import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import FirebaseEventsService from '../../../services/firebase/events.service';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

// isOpen comes from parent and controls the Open/close of the AddEventPanel.
const EventForm = ({ isOpen }) => {
    // Destructuring of features from useForm package.
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const inputElement = useRef(null);

    useEffect(() => {}, [inputElement]);

    const handleAddEvent = (event) => {
        FirebaseEventsService.saveNewEvent(event).then(() => {
            reset();
        });
    };

    const handleFormError = (data) => {
        throw new Error(data);
    };

    // Settings for registration of the inputs in the form.
    const formOptions = {
        title: { required: 'Title is required' },
        date: { required: 'Date is required' }
    };

    return (
        <AddEventPanel className={isOpen ? 'open' : ''}>
            <AddEventForm
                className={isOpen ? 'open' : ''}
                onSubmit={handleSubmit(handleAddEvent, handleFormError)}
            >
                <h2 className={isOpen ? 'open' : ''}>Add event</h2>
                <InputWrapper>
                    <input
                        name="title"
                        placeholder="TITLE"
                        type="text"
                        ref={() => {
                            inputElement.current = element;
                            console.log('sdasda', inputElement.current);
                        }}
                        {...register('title', formOptions.title)}
                    />
                    <AddEventWarningText>
                        {errors?.title && errors.title.message}
                    </AddEventWarningText>
                </InputWrapper>
                <InputWrapper>
                    <input
                        name="date"
                        placeholder="DATE"
                        type="datetime-local"
                        {...register('date', formOptions.date)}
                    />
                    <AddEventWarningText>
                        {errors?.date && errors.date.message}
                    </AddEventWarningText>
                </InputWrapper>
                <textarea
                    name="comment"
                    placeholder="COMMENT"
                    type="textarea"
                    rows="6"
                    {...register('comment')}
                ></textarea>
                <input type="submit" value="LOGIN" />
            </AddEventForm>
        </AddEventPanel>
    );
};

const AddEventWarningText = styled.small`
    font-size: 10px;
    margin-left: 20px;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

EventForm.propTypes = {
    isOpen: PropTypes.bool
};

export default EventForm;

/*--------------------------------------
------------Styled Components-----------
--------------------------------------*/
const AddEventPanel = styled.div`
    margin: 25px;
    width: 60px;
    height: 60px;
    background-color: black;
    color: black;
    z-index: -1;
    background-image: linear-gradient(150deg, #3c3a3a 0%, #000000 74%);
    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);

    @media (max-width: 768px) {
        margin: 0;
    }

    &.open {
        color: white;
        margin: 25px;
        width: 750px;
        height: auto;
        background-color: black;
        z-index: -1;
        display: flex;
        justify-content: center;
        align-items: center;
        @media (max-width: 1000px) {
            width: 100vw;
            margin: 0;
        }
    }
`;

const AddEventForm = styled.form`
    display: none;
    animation: hide 3s;
    padding: 30px;

    &.open {
        display: flex;
        flex-direction: column;
    }
`;

// const Header = styled.h2`
//     /* display: none; */
//     animation: hide 3s;
// `;
