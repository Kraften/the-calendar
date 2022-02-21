import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class EventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {
                id: null,
                name: null,
                date: null,
                start: null,
                end: null,
                comment: null
            }
        };
    }
    render() {
        return (
            <StyledAddEventPanel
                className={this.props.isOpen ? 'add-panel open' : 'add-panel'}
            >
                <StyledAddEventForm
                    className={this.props.isOpen ? 'open' : ''}
                    onSubmit={this.handleSubmit}
                >
                    <StyledLabel>
                        <span className="input-name">Title:</span>
                        <StyledInput
                            type="text"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                    </StyledLabel>
                    <StyledLabel>
                        <span className="input-name">Date:</span>
                        <StyledInput
                            type="text"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                    </StyledLabel>
                    <StyledLabel>
                        <span className="input-name">Comment:</span>
                        <StyledInput
                            type="text"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                    </StyledLabel>

                    <input type="submit" value="Submit" />
                </StyledAddEventForm>
            </StyledAddEventPanel>
        );
    }
}

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
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);

    &.open {
        color: white;
        margin: 25px;
        width: 600px;
        height: 425px;
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
    width: 60%;
    color: black;
    background-color: white;
    margin-left: 20px;
    height: 50px;
    padding: 0 10px;
`;

EventForm.propTypes = {
    isOpen: PropTypes.bool
};

export default EventForm;
