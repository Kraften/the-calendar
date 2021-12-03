import React from "react";
import PropTypes from 'prop-types'
import EventForm from "./add-event-form/add-event-form";
import "./add-event-panel.css";

function AddEventPanel({ isOpen }) {
    return (
        <div>
            <EventForm isOpen={isOpen} />
        </div>
    );
}

AddEventPanel.propTypes = {
    isOpen: PropTypes.boolean
};

export default AddEventPanel;
