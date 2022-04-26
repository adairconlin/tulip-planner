import React from "react";

const EventBtn = ({ status }) => {

    return (
        <>
            {status === "defaultBtn" && 
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="22" viewBox="0 0 26 22">
                    <g id="Group_39" data-name="Group 39" transform="translate(-401 -364)">
                        <g id="Group_10" data-name="Group 10" transform="translate(-208 -152)">
                            <rect id="Rectangle_74" data-name="Rectangle 74" width="26" height="22" rx="11" transform="translate(609 516)" fill="#bc938b"/>
                            <g id="Group_9" data-name="Group 9" transform="translate(2009.962 734.962) rotate(180)">
                                <g id="Group_5" data-name="Group 5" transform="translate(1382.344 202.349)">
                                    <line id="Line_24" data-name="Line 24" y2="11.345" transform="translate(5.672)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="3"/>
                                    <line id="Line_26" data-name="Line 26" y2="11.345" transform="translate(11.345 5.673) rotate(90)" fill="none" stroke="#fff" strokeLinecap="round" stroke-width="3"/>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            }

            {status === "hoverBtn" &&
                <svg xmlns="http://www.w3.org/2000/svg" width="104" height="22" viewBox="0 0 104 22">
                    <g id="Group_21" data-name="Group 21" transform="translate(-401 -364)">
                        <g id="Group_10" data-name="Group 10" transform="translate(-208 -152)">
                            <rect id="Rectangle_74" data-name="Rectangle 74" width="104" height="22" rx="11" transform="translate(609 516)" fill="#bc938b"/>
                            <g id="Group_9" data-name="Group 9" transform="translate(2009.962 734.962) rotate(180)">
                                <g id="Group_5" data-name="Group 5" transform="translate(1382.344 202.349)">
                                    <line id="Line_24" data-name="Line 24" y2="11.345" transform="translate(5.672)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="3"/>
                                    <line id="Line_26" data-name="Line 26" y2="11.345" transform="translate(11.345 5.673) rotate(90)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="3"/>
                                </g>
                            </g>
                        </g>
                    <text id="Add_Event" data-name="Add Event" transform="translate(424 380)" fill="#fff" fontSize="16" fontFamily="KigeliaArabic-Extrabold, Kigelia Arabic" fontWeight="800"><tspan x="0" y="0">Add Event</tspan></text>
                    </g>
                </svg>
            }
        </>
    )
}

export default EventBtn;