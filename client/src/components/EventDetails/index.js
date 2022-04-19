import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_EVENT } from "../../utils/queries";

const EventDetails = () => {
    const { id: eventId } = useParams();
    const { loading, data } = useQuery(QUERY_EVENT, {
        variables: { _id: eventId }
    });

    const currentEvent = data?.event;

    return (
        <div className="eventDetailBackdrop">
           <div className="eventDetailContainer">
               <p>{currentEvent.title}</p>
               <p>{currentEvent.description}</p>
               <p>{currentEvent.startDate.day}/{currentEvent.startDate.month}/{currentEvent.startDate.year}</p>
           </div>
        </div>
    )
}

export default EventDetails;