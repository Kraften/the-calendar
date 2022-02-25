import React from 'react';
import PropTypes from 'prop-types';
import FirebaseEventsService from '../../../services/firebase/events.service';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

const EventForm = (props) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const handleAddEvent = (event) => {
        FirebaseEventsService.saveNewEvent(event).then(() => {
            reset();
            props.isOpen = !props.isOpen;
        });
    };

    const handleError = (data) => console.log(data);

    const formOptions = {
        title: { required: 'Title is required' },
        date: { required: 'Date is required' }
    };

    return (
        <StyledAddEventPanel
            className={props.isOpen ? 'add-panel open' : 'add-panel'}
        >
            <StyledAddEventForm
                className={props.isOpen ? 'open' : ''}
                onSubmit={handleSubmit(handleAddEvent, handleError)}
            >
                <StyledLabel>
                    <span className="input-name">Title:</span>
                    <StyledInputWrapper>
                        <StyledInput
                            name="title"
                            type="text"
                            {...register('title', formOptions.title)}
                        />
                        <StyledAddEventWarningText>
                            {errors?.title && errors.title.message}
                        </StyledAddEventWarningText>
                    </StyledInputWrapper>
                </StyledLabel>
                <StyledLabel>
                    <span className="input-name">Date:</span>
                    <StyledInputWrapper>
                        <StyledInput
                            name="date"
                            type="datetime-local"
                            {...register('date', formOptions.date)}
                        />
                        <StyledAddEventWarningText>
                            {errors?.date && errors.date.message}
                        </StyledAddEventWarningText>
                    </StyledInputWrapper>
                </StyledLabel>
                <StyledLabel>
                    <StyledTextareaWrapper>
                        <span className="input-name">Comment:</span>
                        <StyledTextarea
                            name="comment"
                            rows="10"
                            {...register('comment')}
                        ></StyledTextarea>
                    </StyledTextareaWrapper>
                </StyledLabel>
                <input type="submit" value="Submit" />
            </StyledAddEventForm>
        </StyledAddEventPanel>
    );
};

/*--------------------------------------
------------Styled Components-----------
--------------------------------------*/
const StyledAddEventPanel = styled.div`
    margin: 25px;
    width: 60px;
    height: 60px;
    background-color: black;
    color: black;
    z-index: -1;
    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);

    &.open {
        color: white;
        margin: 25px;
        width: 600px;
        height: 520px;
        background-color: black;
        z-index: -1;
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;
    }
`;
const StyledAddEventForm = styled.form`
    display: none;
    animation: hide 3s;
    padding: 30px;

    &.open {
        display: flex;
        flex-direction: column;
    }
`;

const StyledLabel = styled.label`
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    font-size: 2em;
    font-family: 'montserrat-medium';
`;

const StyledInput = styled.input`
    all: unset;
    width: 92%;
    color: black;
    background-color: white;
    margin-left: 20px;
    height: 50px;
    padding: 0 10px;
`;

const StyledAddEventWarningText = styled.small`
    font-size: 10px;
    margin-left: 20px;
    margin-top: 5px;
`;

const StyledInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledTextareaWrapper = styled.div`
    flex-direction: column;
    width: -webkit-fill-available;
`;

const StyledTextarea = styled.textarea`
    font-size: 0.2em;
    // width: -webkit-fill-available;
`;

EventForm.propTypes = {
    isOpen: PropTypes.bool
};

export default EventForm;
