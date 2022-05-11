import React, { useState } from "react";
import { useSpring, animated, config } from "react-spring";
import { useMutation } from "@apollo/client";
import { ADD_EVENT } from "../../utils/mutations";
import CategoryMenu from "../CategoryMenu";
import EventFlowers from "../../assets/EventFlowers";
const { DateTime } = require("luxon");

const EventForm = ({ currentDate, onClose }) => {
    currentDate = {
        day: parseInt(currentDate.day),
        month: parseInt(currentDate.month),
        year: parseInt(currentDate.year)
    };
    const [openForm, setOpenForm] = useState(false);
    const openCategoryForm = () => {
        setOpenForm(!openForm);
    }

    const [eventForm, setEventForm] = useState(
        {
            title: "",
            description: "",
            startDate: `${currentDate.day},${currentDate.month},${currentDate.year}`,
            endDate: "",
            category: ""
        });

    const handleFormChange = e => {
        const { name, value } = e.target;
        setEventForm({
            ...eventForm,
            [name]: value
        });
    }

    const updateCategoryState = e => {
        setEventForm({
            ...eventForm,
            category: e,
        });
    }

    const [addEvent, { error }] = useMutation(ADD_EVENT);
    const createAnEvent = async (e) => {
        e.preventDefault();

        try {
            const { data } = await addEvent({
                variables: { ...eventForm }
            });
            window.location.assign("/myplanner");
        } catch(e) {
            console.log(e);
        }
    };

    const [defaultCategory, setDefaultCategory] = useState(null);
    const updateDefaultCategory = (e) => {
        setDefaultCategory(e);
    }

    // React Spring animated
    const overlayLoad = useSpring({
        from: { opacity: 0 },
        to: { opacity: .85 },
    })

    const containerLoad = useSpring({
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0 },
        config: config.gentle,
        delay: 100
    });

    const formLoad = useSpring({
        from: { opacity: 0},
        to: { opacity: 1},
        config: config.molasses,
        delay: 800
    });

    return (
        <>
            <animated.div style={overlayLoad} className="event-background" />
                <animated.div style={containerLoad} className="overlay-container event-form">
                    <svg className="onCloseBtn" onClick={onClose} xmlns="http://www.w3.org/2000/svg" width="29.573" height="18.074" viewBox="0 0 29.573 18.074">
                        <g id="Group_26" data-name="Group 26" transform="translate(-25.963 -31.463)">
                            <line id="Line_1" data-name="Line 1" x2="25.5" y2="14" transform="translate(28 33.5)" fill="none" stroke="#898e77" strokeLinecap="round" strokeWidth="3"/>
                            <line id="Line_3" data-name="Line 3" y1="14" x2="25.5" transform="translate(28 33.5)" fill="none" stroke="#898e77" strokeLinecap="round" strokeWidth="3"/>
                        </g>
                    </svg>
                    
                    <div>
                        <EventFlowers />
                        
                        <animated.form style={formLoad} onSubmit={createAnEvent} autoComplete="off">
                            <h2 className="main-red font">Add An Event For<br />
                            {DateTime.local(currentDate.year, currentDate.month, currentDate.day).toLocaleString(DateTime.DATE_HUGE)}
                            </h2>
                        
                            { !openForm &&
                                <>
                                    <label className="main-red font para" htmlFor="title">Title:</label>
                                    <input className="main-green handwriting para" name="title" value={eventForm.title} onChange={handleFormChange} />
                                    
                                    <label className="main-red font para" htmlFor="description">Description:</label>
                                    <input className="main-green handwriting para" name="description" value={eventForm.description} onChange={handleFormChange} />
                                </>
                            }
                        
                            <CategoryMenu updateCategoryState={updateCategoryState} openForm={openForm} setDefault={updateDefaultCategory} defaultCategory={defaultCategory} openCategoryForm={openCategoryForm} />
                        
                            { !openForm &&
                                <button className="green-btn font subtitle" type="submit">Add Event</button>
                            }
                            {error && <p>There was an error with creating this event.</p>}
                        </animated.form>
                    </div>
                </animated.div>
        </>
    )
}

export default EventForm;