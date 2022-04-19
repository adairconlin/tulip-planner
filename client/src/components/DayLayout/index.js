import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_TODAY } from "../../utils/queries";
import EventForm from "../EventForm";
import EventDetails from "../EventDetails";

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

    const [eventState, setEventState] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const toggleEventDetails = id => {
        if(eventState) {
            setCurrentEvent(null);
        } else if(!eventState) {
            setCurrentEvent(id);
        }
        setEventState(!eventState);
    }

    const changeBtnDisplay = e => {
        setBtnDisplay(!btnDisplay);
        let btn = e.target.querySelector("button");
        
        if(btn?.style) {
            if(btnDisplay) {
                btn.style.visibility = "visible";
                e.target.style = "overflow-y: auto";
            } else if(!btnDisplay) {
                btn.style.visibility = "hidden";
                e.target.style = "overflow-y: hidden";
            }
        }
    }

    const changeBtnText = e => {
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
                <div className="font date" key={i}>
                    <button className="addEventBtn">+</button>
                    <span>{day}</span>
                </div>
            </article>
        )
    }

    return (
        <>
            {formState && <EventForm currentDate={dateInfo} onClose={toggleEventForm} />}
            {eventState && <EventDetails eventId={currentEvent} onClose={toggleEventDetails} />}
            <article className="day" onMouseEnter={changeBtnDisplay} onMouseLeave={changeBtnDisplay}>
                <div className="font date" key={i} >
                    <button className="addEventBtn"
                        onMouseEnter={changeBtnText}
                        onMouseLeave={changeBtnText}
                        onClick={toggleEventForm}>+</button>
                    <span>{day}</span>
                </div>
                <div className="eventList">
                    {todaysEvents?.length ?
                            todaysEvents?.map(event => {
                                return <a key={event?._id}
                                            onClick={() => toggleEventDetails(event._id)}
                                            className="handwriting white subtitle event-default">{event?.title}</a>
                                
                            })
                        : ""
                    }
                </div>
            </article>
        </>
    )
}

export default DayLayout;