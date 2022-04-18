import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_EVENT } from "../../utils/mutations";
import { QUERY_TODAY } from "../../utils/queries";

const DayLayout = ({ day, month, year, i }) => {
    const [btnDisplay, setBtnDisplay] = useState(true);
    const [btnText, setBtnText] = useState(true);
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
        } catch(e) {
            console.log(e);
            console.log(error);
        }
    };

    const changeBtnDisplay = (e) => {
        setBtnDisplay(!btnDisplay);
        const btn = e.target.children[0].children[0];

        if(btnDisplay) {
            btn.style.display = "block";
        } else if (!btnDisplay) {
            btn.style.display = "none";
        }
    }

    const changeBtnText = (e) => {
        setBtnText(!btnText);

        if(btnText) {
            e.target.textContent = "+ Add Event"
        } else if(!btnText) {
            e.target.textContent = "+"
        }
    }

    if(loading) {
        return (
            <article className="day">
                <button className="addEventBtn" onClick={createAnEvent}>+</button>
                <div className="font date" key={i} >
                    <span>{day}</span>
                </div>
            </article>
        )
    }

    return (
        <article className="day" onMouseEnter={changeBtnDisplay} onMouseLeave={changeBtnDisplay}>
            <div className="font date" key={i} >
                <button className="addEventBtn" onMouseEnter={changeBtnText} onMouseLeave={changeBtnText} onClick={createAnEvent}>+</button>
                <span>{day}</span>
            </div>
            {todaysEvents &&
                <div>
                    <p>{todaysEvents[0].title}</p>
                </div>
            }
        </article>
    )
}

export default DayLayout;