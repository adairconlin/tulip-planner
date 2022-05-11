import React, { useState } from "react";
import { useTrail, animated, config } from "react-spring";
import { useQuery } from "@apollo/client";
import { QUERY_TODAY } from "../../utils/queries";
import EventForm from "../EventForm";
import EventDetails from "../EventDetails";
import EventBtn from "../../assets/EventBtn";

const DayLayout = ({ day, month, year, i }) => {
    const [btnDisplay, setBtnDisplay] = useState(true);
    const dateInfo = {
        day: day.toString(),
        month: month.toString(),
        year: year.toString()
    };
    // Query for each day's info in order to display events
    const { loading, data } = useQuery(QUERY_TODAY, {
        variables: { day: dateInfo.day, month: dateInfo.month, year: dateInfo.year }
    });    

    const todaysEvents = data?.todaysDate[0]?.events || [];

    const [formState, setFormState] = useState(false);
    const toggleEventForm = () => {
        setFormState(!formState);
    }

    const [eventState, setEventState] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const toggleEventDetails = id => {
        if(eventState) {
            window.location.assign("/myplanner");
            setCurrentEvent(null);
            document.querySelector("body").style.overflowY = "auto";
        } else if(!eventState) {
            setCurrentEvent(id);
            setEventState(!eventState);
            document.querySelector("body").style.overflowY = "hidden";
        }
    }

    const changeBtnDisplay = () => {
        setBtnDisplay(!btnDisplay);
    }

    // React Spring animations
    const eventTrail = useTrail(todaysEvents.length, {
        from: { opacity: 0, y: 10 },
        to: { opacity: 1, y: 0 },
        config: config.gentle
    });

    if(loading) {
        return (
            <article className="day">
                <div className="font date" key={i}>
                    <div className="addEventBtn"
                        onClick={toggleEventForm}>
                            <EventBtn />
                    </div>
                    <span>{day}</span>
                </div>
            </article>
        )
    }

    return (
        <>
            {formState && 
                <EventForm currentDate={dateInfo} onClose={toggleEventForm} />}
            {eventState && 
                <EventDetails eventId={currentEvent} onClose={toggleEventDetails} eventDate={dateInfo} />}

            <article className="day" onMouseEnter={changeBtnDisplay} onMouseLeave={changeBtnDisplay}>
                <div className="font date" key={i} >
                    <div className="addEventBtn"
                        onClick={toggleEventForm}>
                            <EventBtn />
                    </div>
                    <span>{day}</span>
                </div>

                <div className="eventList">
                    {todaysEvents?.length ?
                            eventTrail.map((animation, index) => {
                                return <animated.a key={index}
                                            onClick={() => toggleEventDetails(todaysEvents[index]._id)}
                                            className={`handwriting white subtitle ${todaysEvents[index].category?.color ? `${todaysEvents[index].category.color}` : "event-default"} `}
                                            style={animation}>
                                                {todaysEvents[index].title}
                                            </animated.a>
                                
                            })
                        : ""
                    }
                </div>
            </article>
        </>
    )
}

export default DayLayout;