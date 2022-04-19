import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EVENT } from "../../utils/mutations";

const EventForm = ({ currentDate, onClose }) => {
    const [eventForm, setEventForm] = useState(
        {
            title: "",
            description: "",
            startDate: `${currentDate.day},${currentDate.month},${currentDate.year}`,
            endDate: "",
            category: ""
        })
    const [addEvent, { error }] = useMutation(ADD_EVENT);

    const handleFormChange = e => {
        const { name, value } = e.target;
        setEventForm({
            ...eventForm,
            [name]: value
        });
    }

    const createAnEvent = async (e) => {
        e.preventDefault();
        try {
            const { data } = await addEvent({
                variables: { ...eventForm }
            });
            window.location.assign("/myplanner");
        } catch(e) {
            console.log(e);
            console.log(error);
        }
    };

    return (
        <div className="eventFormBackdrop">
            <div className="eventFormContainer">
                <button onClick={onClose}>X</button>
                <form onSubmit={createAnEvent}>
                    <h2>Add an event</h2>

                    <label htmlFor="title">Title:</label>
                    <input name="title" onChange={handleFormChange} />

                    <label htmlFor="description">Description:</label>
                    <input name="description" onChange={handleFormChange} />

                    <label htmlFor="category">Category:</label>
                    <input name="category" onChange={handleFormChange} />

                    <button type="submit">Add Event</button>
                </form>
            </div>
        </div>
    )
}

export default EventForm;