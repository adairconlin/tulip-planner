import React, { useState } from "react";
import DayLayout from "../DayLayout";
const { DateTime } = require("luxon");

const Calendar = () => {
    const currentMonth = DateTime.local().month;
    const currentYear = DateTime.local().year;
    const [ activeMonth, setActiveMonth ] = useState(currentMonth);
    const [ activeYear, setActiveYear ] = useState(currentYear);

    // Calculates the amount of days in the active month
    const getDays = () => {
        return DateTime.local(activeYear, activeMonth).daysInMonth;
    }

    let days = [];
    for(let i = 0; i < getDays(); i++) {
        days.push(<DayLayout day={i + 1} month={activeMonth} year={activeYear} key={i} />);
    }

    // Changes the month and year based on current month
    const changeActiveMonth = (e) => {
        if(e === "forward") {
            if(activeMonth < 12) {
                setActiveMonth(activeMonth + 1);
            } else {
                setActiveYear(activeYear + 1);
                setActiveMonth(1);
            }
        } else if(e ==="backward") {
            if(activeMonth > 1) {
                setActiveMonth(activeMonth - 1);
            } else {
                setActiveYear(activeYear - 1);
                setActiveMonth(12);
            }
        }
    };

    return (
        <section className="calendar">
            <div className="calendar-top">
                <button onClick={() => changeActiveMonth("backward")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12.861" height="16.59" viewBox="0 0 12.861 16.59">
                        <g id="Group_5" data-name="Group 5" transform="translate(10.764 14.492) rotate(180)">
                            <line id="Line_24" data-name="Line 24" x2="8.667" y2="6.386" fill="none" stroke="#898e77" strokeLinecap="round" strokeWidth="3"/>
                            <line id="Line_25" data-name="Line 25" y1="6.009" x2="8.171" transform="translate(0.496 6.386)" fill="none" stroke="#898e77" strokeLinecap="round" strokeWidth="3"/>
                        </g>
                    </svg>
                </button>
                <p className="font main-red">{DateTime.local(currentYear, activeMonth, 1).monthLong} {DateTime.local(activeYear, activeMonth, 1).year}</p>
                <button onClick={() => changeActiveMonth("forward")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12.967" height="16.741" viewBox="0 0 12.967 16.741">
                        <g id="Group_5" data-name="Group 5" transform="translate(2.097 2.097)">
                            <line id="Line_24" data-name="Line 24" x2="8.772" y2="6.464" fill="none" stroke="#898e77" strokeLinecap="round" strokeWidth="3"/>
                            <line id="Line_25" data-name="Line 25" y1="6.083" x2="8.271" transform="translate(0.502 6.464)" fill="none" stroke="#898e77" strokeLinecap="round" strokeWidth="3"/>
                        </g>
                    </svg>
                </button>
            </div>
            <div className="days">{days}</div>
        </section>
    )
}

export default Calendar;