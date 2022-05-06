import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EVENT } from "../../utils/queries";
import { EDIT_EVENT } from "../../utils/mutations";
import CategoryMenu from "../CategoryMenu";
import EventFlowers from "../../assets/EventFlowers";
const { DateTime } = require("luxon");

const EventDetails = ({ eventId, onClose, eventDate }) => {
    const todaysDate = DateTime.local(parseInt(eventDate.year), parseInt(eventDate.month), parseInt(eventDate.day)).toLocaleString(DateTime.DATE_HUGE);

    // Query for selected event
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

    const updateCategoryState = e => {
        setEventDetails({
            ...eventDetails,
            category: e
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

        const container = document.querySelector(".event-form");
        container.removeChild(container.lastChild);
        onClose();
    };

    const cancelSave = e => {
        const container = document.querySelector(".event-form");
        container.removeChild(container.lastChild);

        const contArticle = document.querySelector(".event-form article");

        const addBtn = document.createElement("button");
        addBtn.classList= "green-btn font subtitle";
        addBtn.textContent = "Save Changes";
        addBtn.addEventListener("click", promptSave);

        contArticle.appendChild(addBtn);
    }

    const promptSave = e => {
        e.target.remove();

        const container = document.querySelector(".event-form");
        const warningDiv = document.createElement("div");
        warningDiv.className = "warningDiv";

        const warningMessage = document.createElement("p");
        warningMessage.textContent = "Are you sure you want to save?";
        warningMessage.classList = "main-red font para";

        const btnDiv = document.createElement("div");
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.classList = "green-btn font subtitle";
        saveBtn.addEventListener("click", updateEvent);

        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel";
        cancelBtn.classList = "green-btn font subtitle";
        cancelBtn.addEventListener("click", cancelSave);

        container.appendChild(warningDiv)
        warningDiv.appendChild(warningMessage);
        warningDiv.appendChild(btnDiv);
        btnDiv.appendChild(saveBtn);
        btnDiv.appendChild(cancelBtn);
    }

    if(loading) {
        return (
            <>
                <div className="event-background" />
                <div className="overlay-container event-form">
                    <svg onClick={onClose} xmlns="http://www.w3.org/2000/svg" width="29.573" height="18.074" viewBox="0 0 29.573 18.074">
                        <g id="Group_26" data-name="Group 26" transform="translate(-25.963 -31.463)">
                            <line id="Line_1" data-name="Line 1" x2="25.5" y2="14" transform="translate(28 33.5)" fill="none" stroke="#898e77" strokeLinecap="round" strokeWidth="3"/>
                            <line id="Line_3" data-name="Line 3" y1="14" x2="25.5" transform="translate(28 33.5)" fill="none" stroke="#898e77" strokeLinecap="round" strokeWidth="3"/>
                        </g>
                    </svg>
                    <p className="main-green handwriting para">Loading...</p>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="event-background" />
            <div className="overlay-container event-form">
                <svg className="onCloseBtn" onClick={onClose} xmlns="http://www.w3.org/2000/svg" width="29.573" height="18.074" viewBox="0 0 29.573 18.074">
                    <g id="Group_26" data-name="Group 26" transform="translate(-25.963 -31.463)">
                        <line id="Line_1" data-name="Line 1" x2="25.5" y2="14" transform="translate(28 33.5)" fill="none" stroke="#898e77" strokeLinecap="round" strokeWidth="3"/>
                        <line id="Line_3" data-name="Line 3" y1="14" x2="25.5" transform="translate(28 33.5)" fill="none" stroke="#898e77" strokeLinecap="round" strokeWidth="3"/>
                    </g>
                </svg>

                <div>
                    <EventFlowers />

                    <article>
                        <p className="main-red font">{todaysDate}</p>
                        <textarea className="main-red handwriting title" onChange={handleChange} defaultValue={currentEvent?.title} name="title" />
                        <textarea className="main-red handwriting para" onChange={handleChange} defaultValue={currentEvent?.description} name="description" />
                        <CategoryMenu updateCategoryState={updateCategoryState} defaultCategory={currentEvent?.category?.categoryName} />
                        
                        <button className="green-btn font subtitle" onClick={promptSave}>Save Changes</button>
                        {error && <p>There was an error with your request.</p>}
                    </article>
                </div>
            </div>
        </>
    )
}

export default EventDetails;