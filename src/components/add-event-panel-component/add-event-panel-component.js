import React from 'react';
import PropTypes from 'prop-types';
import EventForm from './add-event-form-component/add-event-form-component';
import './add-event-panel-component.css';

function AddEventPanel({ isOpen }) {
    return (
        <div>
            <EventForm isOpen={isOpen} />
        </div>
    );
}

AddEventPanel.propTypes = {
    isOpen: PropTypes.bool
};

export default AddEventPanel;
