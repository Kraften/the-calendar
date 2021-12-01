import React, { Component } from "react";
import "./add-event-panel.css";

function AddEventPanel({ isOpen }) {
    return (
        <div>
            <EventForm isOpen={isOpen} />
        </div>
    );
}

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
            <div className={this.props.isOpen ? "add-panel open" : "add-panel"}>
                <form
                    className={this.props.isOpen ? "open" : ""}
                    onSubmit={this.handleSubmit}
                >
                    <label>
                        <span className="input-name">Title:</span>
                        <input
                            type="text"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        <span className="input-name">Date:</span>
                        <input
                            type="text"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        <span className="input-name">Comment:</span>
                        <input
                            type="text"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                    </label>

                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

AddEventPanel.propTypes = {
    isOpen: Boolean
};

EventForm.propTypes = {
    isOpen: Boolean
};

export default AddEventPanel;
