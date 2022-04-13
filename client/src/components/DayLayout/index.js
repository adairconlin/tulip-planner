import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_EVENT } from "../../utils/mutations";
import { QUERY_TODAY } from "../../utils/queries";

const DayLayout = ({ day, month, year, i }) => {
    const [addEvent, { error }] = useMutation(ADD_EVENT);
    const dateInfo = {
        day: day.toString(),
        month: month.toString(),
        year: year.toString()
    };

    const { loading, data } = useQuery(QUERY_TODAY, {
        variables: { day: dateInfo.day, month: dateInfo.month, year: dateInfo.year }
    });

    const todaysEvents = data?.todaysDate[0]?.events;

    if(todaysEvents) {
        console.log(day, todaysEvents);
    }


    const tempForm = {
        title: "Test Title",
        description: "Test a description!",
        startDate: `${day},${month},${year}`,
        endDate: "",
        category: ""
    }

    const createAnEvent = async (e) => {
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

    if(loading) {
        return (
            <p>Loading Dates</p>
        )
    }

    return (
        <>
            <div key={i} >Date: {day}</div>
            {todaysEvents &&
                <div>
                    <p>{todaysEvents[0].title}</p>
                </div>
            }
            <button onClick={createAnEvent}>Add Event</button>
        </>
    )
}

export default DayLayout;