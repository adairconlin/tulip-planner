import React from "react";
import Calendar from "../components/Calendar";
const { DateTime } = require("luxon");

const MyPlanner = () => {
    const today = DateTime.now().toLocaleString(DateTime.DATE_HUGE);

    return (
        <>
            <p className="font today main">Today is {today}.</p>
            <Calendar />
        </>
    )
}

export default MyPlanner;