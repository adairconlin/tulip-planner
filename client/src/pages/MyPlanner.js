import React from "react";
import Fade from "react-reveal/Fade";
import Calendar from "../components/Calendar";
const { DateTime } = require("luxon");

const MyPlanner = () => {
    const today = DateTime.now().toLocaleString(DateTime.DATE_HUGE);

    return (
        <>
            <div>
                <Fade>
                    <h2 className="font today main-red main">Today is {today}.</h2>
                </Fade>
                <Fade delay={600}>
                    <Calendar />
                </Fade>
            </div>
        </>
    )
}

export default MyPlanner;