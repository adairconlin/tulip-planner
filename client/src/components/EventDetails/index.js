import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_EVENT } from "../../utils/queries";

const EventDetails = ({ eventId, onClose }) => {
    const { loading, data } = useQuery(QUERY_EVENT, {
        variables: { _id: eventId }
    });

    const currentEvent = data?.event;

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
               <p>{currentEvent?.title}</p>
               <p>{currentEvent?.description}</p>
               <p>{currentEvent?.startDate.day}/{currentEvent?.startDate.month}/{currentEvent?.startDate.year}</p>
           </div>
        </div>
    )
}

export default EventDetails;