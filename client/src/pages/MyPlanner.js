import React from "react";
import Calendar from "../components/Calendar";
import { useQuery } from "@apollo/client";
import { QUERY_ME_LONG } from "../utils/queries";
const { DateTime } = require("luxon");

const MyPlanner = () => {
    const { loading, data } = useQuery(QUERY_ME_LONG);
    const userData = data?.me;

    const today = DateTime.now().toLocaleString(DateTime.DATE_HUGE);

    if(loading) {
        return (
            <>
                <h2 className="handwriting main-red">Loading</h2>
            </>
        )
    }

    return (
        <>
            <p className="font today main">Today is {today}.</p>
            <Calendar />
        </>
    )
}

export default MyPlanner;