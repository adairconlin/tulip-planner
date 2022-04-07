import React from "react";

const DayLayout = ({ day, month, year, i }) => {
    const dateInfo = `${year}, ${month}, ${day}`;

    return (
        <>
            <div key={i} >Date: {day}</div>
        </>
    )
}

export default DayLayout;