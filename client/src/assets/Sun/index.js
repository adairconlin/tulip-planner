import React from "react";

const Sun = ({ direction }) => {
    return (
        <>
            {direction === "top" &&
                <svg className="sun" xmlns="http://www.w3.org/2000/svg" width="506.066" height="181.406" viewBox="0 0 506.066 181.406">
                <g id="Group_37" data-name="Group 37" transform="translate(-705.129 -184.001)">
                  <g id="Group_24" data-name="Group 24">
                    <path id="Path_1" data-name="Path 1" d="M3239.417,363s26.423-110.2,165.293-110.2S3572.359,363,3571.923,363" transform="translate(-2445.917)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="4"/>
                    <line id="Line_14" data-name="Line 14" x1="60.5" y1="12.832" transform="translate(707.5 324.5)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="4"/>
                    <line id="Line_15" data-name="Line 15" x1="47.5" y1="35.14" transform="translate(769.75 241.212)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="4"/>
                    <line id="Line_16" data-name="Line 16" x1="15.5" y1="18.599" transform="translate(843.5 222.613)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="4"/>
                    <line id="Line_17" data-name="Line 17" y1="42.367" x2="7.5" transform="translate(1016 186.5)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="4"/>
                    <line id="Line_18" data-name="Line 18" y1="17.05" x2="11.5" transform="translate(1059 224.162)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="4"/>
                    <path id="Path_30" data-name="Path 30" d="M0,36.6,27,0" transform="translate(1099.011 231.912)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="4"/>
                    <line id="Line_20" data-name="Line 20" y1="20.852" x2="28.989" transform="translate(1126.011 280.373)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="4"/>
                    <line id="Line_21" data-name="Line 21" y1="14.877" x2="57.245" transform="translate(1151.511 322.455)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="4"/>
                    <line id="Line_50" data-name="Line 50" x1="13" y1="42.367" transform="translate(900.5 186.5)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="4"/>
                    <line id="Line_51" data-name="Line 51" x1="1.5" y1="24.842" transform="translate(960 197.77)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="4"/>
                    <line id="Line_52" data-name="Line 52" x1="23" y1="12.725" transform="translate(760.5 288.5)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="4"/>
                  </g>
                </g>
              </svg>
            }

            {direction === "bottom" && 
                <svg className="sun" xmlns="http://www.w3.org/2000/svg" width="506.066" height="181.406" viewBox="0 0 506.066 181.406">
                    <g id="Group_38" data-name="Group 38" transform="translate(-705.062 -714.593)">
                    <g id="Group_32" data-name="Group 32" transform="translate(1916.256 1080) rotate(180)">
                        <path id="Path_1" data-name="Path 1" d="M3239.417,363s26.423-110.2,165.293-110.2S3572.359,363,3571.923,363" transform="translate(-2445.917)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="4"/>
                        <line id="Line_14" data-name="Line 14" x1="60.5" y1="12.832" transform="translate(707.5 324.5)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="4"/>
                        <line id="Line_15" data-name="Line 15" x1="47.5" y1="35.14" transform="translate(769.75 241.212)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="4"/>
                        <line id="Line_16" data-name="Line 16" x1="15.5" y1="18.599" transform="translate(843.5 222.613)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="4"/>
                        <line id="Line_17" data-name="Line 17" y1="42.367" x2="7.5" transform="translate(1016 186.5)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="4"/>
                        <line id="Line_18" data-name="Line 18" y1="17.05" x2="11.5" transform="translate(1059 224.162)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="4"/>
                        <path id="Path_30" data-name="Path 30" d="M0,36.6,27,0" transform="translate(1099.011 231.912)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="4"/>
                        <line id="Line_20" data-name="Line 20" y1="20.852" x2="28.989" transform="translate(1126.011 280.373)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="4"/>
                        <line id="Line_21" data-name="Line 21" y1="14.877" x2="57.245" transform="translate(1151.511 322.455)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="4"/>
                        <line id="Line_50" data-name="Line 50" x1="13" y1="42.367" transform="translate(900.5 186.5)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="4"/>
                        <line id="Line_51" data-name="Line 51" x1="1.5" y1="24.842" transform="translate(960 197.77)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="4"/>
                        <line id="Line_52" data-name="Line 52" x1="23" y1="12.725" transform="translate(760.5 288.5)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="4"/>
                    </g>
                    </g>
                </svg>
              
            }
        </>
    )
}

export default Sun;