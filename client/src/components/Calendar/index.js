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

    // Adds components to an array called "days" based on
    // the amount of days in the month. Each day is its own
    // component that passes in its unique date information
    let days = [];
    for(let i = 0; i < getDays(); i++) {
        days.push(<DayLayout day={i + 1} month={activeMonth} year={activeYear} key={i} />);
    }

    // Changes the month and year based on current month
    // i.e. If it's January, it will go backwards to December
    // of the previous year
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
                <button className="font subtitle" onClick={() => changeActiveMonth("backward")}> &#60; </button>
                <p className="font">{DateTime.local(currentYear, activeMonth, 1).monthLong} {DateTime.local(activeYear, activeMonth, 1).year}</p>
                <button className="font subtitle" onClick={() => changeActiveMonth("forward")}> &#62; </button>
            </div>
            <div className="days">{days}</div>
        </section>
    )
}

export default Calendar;