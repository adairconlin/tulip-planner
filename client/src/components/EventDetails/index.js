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
               <textarea onChange={handleChange} onBlur={updateEvent} defaultValue={currentEvent?.title} name="title" />
               <textarea onChange={handleChange} onBlur={updateEvent} defaultValue={currentEvent?.description} name="description" />
               {error && <p>There was an error with your request.</p>}
           </div>
        </div>
    )
}

export default EventDetails;