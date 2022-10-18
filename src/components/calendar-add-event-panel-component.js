import React from 'react';
import PropTypes from 'prop-types';

import EventForm from './calendar-add-event-form-component';

// TODO: Remove this func. component if not needed.
// isOpen comes from parent and controls the Open/close of the AddEventPanel
const AddEventPanel = ({ isOpen }) => {
  return (
    <div>
      <EventForm isOpen={isOpen} />
    </div>
  );
};

AddEventPanel.propTypes = {
  isOpen: PropTypes.bool
};

export default AddEventPanel;
