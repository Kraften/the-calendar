import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useForm } from 'react-hook-form';
import FirebaseEventsService from '../services/firebase/events.service';

// isOpen comes from parent and controls the Open/close of the AddEventPanel.
const EventForm = ({ isOpen }) => {
  // Destructuring of features from useForm package.
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const handleAddEvent = (event) => {
    FirebaseEventsService.saveNewEvent(event).then(() => {
      reset();
    });
  };

  const handleFormError = () => {};

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
            autoFocus
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
        <input type="submit" value="SUBMIT" />
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
  color: var(--calendar-black);
  z-index: -1;
  background: black;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);

  &.open {
    color: white;
    margin: 25px;
    width: 50vw;
    height: 56vh;

    @media (max-width: 768px) {
      width: 100vw;
      height: 56vh;
      margin: 0;
    }
  }
`;

const AddEventForm = styled.form`
  display: none;
  animation: hide 3s;
  padding: 30px 0 30px 0;

  &.open {
    display: flex;
    flex-direction: column;
    margin: 0 60px 0 60px;

    @media (max-width: 500px) {
      width: 75%;
    }
  }
`;
