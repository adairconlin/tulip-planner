import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EVENT } from "../../utils/queries";
import { EDIT_EVENT } from "../../utils/mutations";
const { DateTime } = require("luxon");

const EventDetails = ({ eventId, onClose, dateInfo }) => {
    const todaysDate = DateTime.local(dateInfo?.year, dateInfo?.month, dateInfo?.day).toLocaleString(DateTime.DATE_HUGE);
    const { loading, data } = useQuery(QUERY_EVENT, {
        variables: { _id: eventId }
    });

    const currentEvent = data?.event;

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

    const cancelSave = () => {
        const container = document.querySelector(".eventDetailContainer");
        container.removeChild(container.lastChild);
    }

    const [editEvent, { error }] = useMutation(EDIT_EVENT);
    const updateEvent = async (e) => {
        console.log("test updateEvent");
        e.preventDefault();
        try {
            const { data } = await editEvent({
                variables: { ...eventDetails }
            });
        } catch(e) {
            console.log(e);
        }
    };

    if(loading) {
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
               {currentEvent?.category ?
                    <textarea onChange={handleChange} defaultValue={currentEvent?.category} name="category" />
                :
                    <button>Add Category</button>
               }
               {error && <p>There was an error with your request.</p>}
               <button onClick={promptSave}>Save Changes</button>
           </div>
        </div>
    )
}

export default EventDetails;