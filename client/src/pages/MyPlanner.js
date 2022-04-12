import React from "react";
import Calendar from "../components/Calendar";
import { useQuery } from "@apollo/client";
import { QUERY_ME_LONG, QUERY_MY_EVENTS } from "../utils/queries";

const MyPlanner = () => {
    const { loading, data } = useQuery(QUERY_ME_LONG);
    const { data: eventData } = useQuery(QUERY_MY_EVENTS);
    const userData = data?.me;
    const events = eventData?.myEvents;

    if(loading) {
        return (
            <>
                <h1>Loading</h1>
            </>
        )
    }

    return (
        <>
            <h1>{userData?.name}'s Planner</h1>
            <Calendar />
        </>
    )
}

export default MyPlanner;