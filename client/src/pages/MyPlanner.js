import React from "react";
import Calendar from "../components/Calendar";
const { DateTime } = require("luxon");

const MyPlanner = () => {
    const today = DateTime.now().toLocaleString(DateTime.DATE_HUGE);

    return (
        <>
            <div>
                <h2 className="font today main-red main">Today is {today}.</h2>
                <Calendar />
            </div>
        </>
    )
}

export default MyPlanner;