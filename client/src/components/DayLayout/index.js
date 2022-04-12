import React from "react";

const DayLayout = ({ day, month, year, i }) => {
    const dateInfo = `${year}, ${month}, ${day}`;

    const addEvent = (e) => {
        console.log(day, month, year);
    };

    return (
        <>
            <div key={i} >Date: {day}</div>
            <button onClick={addEvent}>Add Event</button>
        </>
    )
}

export default DayLayout;