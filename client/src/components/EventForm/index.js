import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EVENT } from "../../utils/mutations";
import CategoryMenu from "../CategoryMenu";
import EventFlowers from "../../assets/EventFlowers";

const EventForm = ({ currentDate, onClose }) => {
    const [eventForm, setEventForm] = useState(
        {
            title: "",
            description: "",
            startDate: `${currentDate.day},${currentDate.month},${currentDate.year}`,
            endDate: "",
            category: ""
        })

    const handleFormChange = e => {
        const { name, value } = e.target;
        setEventForm({
            ...eventForm,
            [name]: value
        });
    }

    const updateCategoryState = e => {
        setEventForm({
            ...eventForm,
            category: e
        });
    }

    const [addEvent, { error }] = useMutation(ADD_EVENT);
    const createAnEvent = async (e) => {
        e.preventDefault();

        try {
            const { data } = await addEvent({
                variables: { ...eventForm }
            });
            window.location.assign("/myplanner");
        } catch(e) {
            console.log(e);
        }
    };

    return (
        <>
            <div className="eventFormBackdrop">
            </div>
                <div className="eventFormContainer">
                    <svg onClick={onClose} xmlns="http://www.w3.org/2000/svg" width="29.573" height="18.074" viewBox="0 0 29.573 18.074">
                        <g id="Group_26" data-name="Group 26" transform="translate(-25.963 -31.463)">
                            <line id="Line_1" data-name="Line 1" x2="25.5" y2="14" transform="translate(28 33.5)" fill="none" stroke="#898e77" stroke-linecap="round" stroke-width="3"/>
                            <line id="Line_3" data-name="Line 3" y1="14" x2="25.5" transform="translate(28 33.5)" fill="none" stroke="#898e77" stroke-linecap="round" stroke-width="3"/>
                        </g>
                    </svg>
                    
                    
                    <div>
                        <EventFlowers />
                        
                        <form onSubmit={createAnEvent}>
                            <h2 className="main-red font">Add an event</h2>
                        
                            <label className="main-red font para" htmlFor="title">Title:</label>
                            <input className="main-green handwriting para" name="title" onChange={handleFormChange} />
                        
                            <label className="main-red font para" htmlFor="description">Description:</label>
                            <input className="main-green handwriting para" name="description" onChange={handleFormChange} />
                        
                            <CategoryMenu updateCategoryState={updateCategoryState} />
                        
                            <button className="green-btn font subtitle" type="submit">Add Event</button>
                            {error && <p>There was an error with creating this event.</p>}
                        </form>
                    </div>
                </div>
        </>
    )
}

export default EventForm;