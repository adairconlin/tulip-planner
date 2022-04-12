import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_EVENT } from "../../utils/mutations";

const DayLayout = ({ day, month, year, i }) => {
    //const dateInfo = `${year}, ${month}, ${day}`;
    const [addEvent, { error }] = useMutation(ADD_EVENT);
    const tempForm = {
        title: "Test Title",
        description: "Test a description!",
        startDate: `${day},${month},${year}`
    }

    const createAnEvent = async (e) => {
        console.log(day, month, year);
        e.preventDefault();

        try {
            const { data } = await addEvent({
                variables: { ...tempForm }
            });
            console.log("success.");
            console.log(data);
        } catch(e) {
            console.log(e);
            console.log(error);
        }
    };

    return (
        <>
            <div key={i} >Date: {day}</div>
            <button onClick={createAnEvent}>Add Event</button>
        </>
    )
}

export default DayLayout;