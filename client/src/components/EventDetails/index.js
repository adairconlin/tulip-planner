import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EVENT, QUERY_MY_CATEGORIES } from "../../utils/queries";
import { EDIT_EVENT } from "../../utils/mutations";
const { DateTime } = require("luxon");

const EventDetails = ({ eventId, onClose, eventDate }) => {
    const todaysDate = DateTime.local(parseInt(eventDate.year), parseInt(eventDate.month), parseInt(eventDate.day)).toLocaleString(DateTime.DATE_HUGE);

    // Query for selected event
    const { loading, data } = useQuery(QUERY_EVENT, {
        variables: { _id: eventId }
    });
    const currentEvent = data?.event;

    // Query for your categories
    const { loading:loadingCat, data:catData } = useQuery(QUERY_MY_CATEGORIES);
    const categories = catData?.myCategories || [];

    const [eventDetails, setEventDetails] = useState({
        eventId: eventId,
        title: currentEvent?.title,
        description: currentEvent?.description,
        category: currentEvent?.category
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setEventDetails({
            ...eventDetails,
            [name]: value
        });
    }

    const [editEvent, { error }] = useMutation(EDIT_EVENT);
    const updateEvent = async (e) => {
        e.preventDefault();
        try {
            const { data } = await editEvent({
                variables: { ...eventDetails }
            });
        } catch(e) {
            console.log(e);
        }
    };

    const cancelSave = () => {
        const container = document.querySelector(".eventDetailContainer");
        container.removeChild(container.lastChild);
    }

    const promptSave = e => {
        const container = document.querySelector(".eventDetailContainer");
        const warningDiv = document.createElement("div");
        const warningMessage = document.createElement("p");
        warningMessage.textContent = "Are you sure you want to save?";
        const saveBtn = document.createElement("button");
        const cancelBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.addEventListener("click", updateEvent);
        cancelBtn.textContent = "Cancel";
        cancelBtn.addEventListener("click", cancelSave);

        container.appendChild(warningDiv)
        warningDiv.appendChild(warningMessage);
        warningDiv.appendChild(saveBtn);
        warningDiv.appendChild(cancelBtn);
    }

    if(loading || loadingCat) {
        return (
            <div className="eventDetailBackdrop">
                <div className="eventDetailContainer">
                    <button onClick={onClose}>X</button>
                    <p>Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="eventDetailBackdrop">
            <div className="eventDetailContainer">
                <button onClick={onClose}>X</button>
                <p>{todaysDate}</p>
                <textarea onChange={handleChange} defaultValue={currentEvent?.title} name="title" />
                <textarea onChange={handleChange} defaultValue={currentEvent?.description} name="description" />
                <div className="dropdown">
                    { currentEvent?.category ? 
                    <button className="dropBtn">{currentEvent?.category}</button> :
                    <button className="dropBtn">+ Add A Category</button> }
                    <div className="dropdown-content">
                            
                            <button className="subtitle">+ Add New Category</button>
                    </div>
                </div>
                
                <button onClick={promptSave}>Save Changes</button>
                {error && <p>There was an error with your request.</p>}
            </div>
        </div>
    )
}

export default EventDetails;