import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_TODAY } from "../../utils/queries";
import EventForm from "../EventForm";

const DayLayout = ({ day, month, year, i }) => {
    const [btnDisplay, setBtnDisplay] = useState(true);
    const [btnText, setBtnText] = useState(true);
    const dateInfo = {
        day: day.toString(),
        month: month.toString(),
        year: year.toString()
    };

    const { loading, data } = useQuery(QUERY_TODAY, {
        variables: { day: dateInfo.day, month: dateInfo.month, year: dateInfo.year }
    });

    const todaysEvents = data?.todaysDate[0]?.events;


    const [formState, setFormState] = useState(false);
    const toggleEventForm = () => {
        setFormState(!formState);
    }

    const changeBtnDisplay = (e) => {
        setBtnDisplay(!btnDisplay);
        const btn = e.target.children[0]?.children[0];

        if(btn?.style) {
            if(btnDisplay) {
            btn.style.display = "block";
            } else if (!btnDisplay) {
                btn.style.display = "none";
            }
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
                <button className="addEventBtn">+</button>
                <div className="font date" key={i} >
                    <span>{day}</span>
                </div>
            </article>
        )
    }

    return (
        <>
            {formState && <EventForm currentDate={dateInfo} onClose={toggleEventForm} />}
            <article className="day" onMouseEnter={changeBtnDisplay} onMouseLeave={changeBtnDisplay}>
                <div className="font date" key={i} >
                    <button className="addEventBtn" 
                        onMouseEnter={changeBtnText} 
                        onMouseLeave={changeBtnText} 
                        onClick={toggleEventForm}>+</button>
                    <span>{day}</span>
                </div>
                {todaysEvents &&
                    <div>
                        <p>{todaysEvents[0].title}</p>
                    </div>
                }
            </article>
        </>
    )
}

export default DayLayout;