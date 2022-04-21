import React, { useRef } from "react";
import { useParallax } from "react-scroll-parallax";
import Flowers from "../components/Flowers";

const Homepage = () => {
    const target = useRef(null);
    const mid = useParallax({
        speed: -10,
        targetElement: target.current,
      });

    return (
        <>
            <section className="hero">
                <svg className="sun" xmlns="http://www.w3.org/2000/svg" width="508.715" height="191.735" viewBox="0 0 508.715 191.735">
                    <g id="Group_24" data-name="Group 24" transform="translate(-703.943 -174.878)">
                        <path id="Path_1" data-name="Path 1" d="M3239.417,363s26.423-110.2,165.293-110.2S3572.359,363,3571.923,363" transform="translate(-2445.917)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="6"/>
                        <line id="Line_14" data-name="Line 14" x1="60.5" y1="12.832" transform="translate(707.5 324.5)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="6"/>
                        <line id="Line_15" data-name="Line 15" x1="47.5" y1="35.14" transform="translate(749.5 256.5)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="6"/>
                        <line id="Line_16" data-name="Line 16" x1="23" y1="42.121" transform="translate(821 209.978)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="6"/>
                        <line id="Line_17" data-name="Line 17" x1="1.5" y1="46.166" transform="translate(910 178.652)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="6"/>
                        <line id="Line_18" data-name="Line 18" y1="46.328" x2="11" transform="translate(995 178.49)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="6"/>
                        <line id="Line_19" data-name="Line 19" y1="36.925" x2="30.5" transform="translate(1071.5 215.174)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="6"/>
                        <line id="Line_20" data-name="Line 20" y1="29.266" x2="44.489" transform="translate(1118.511 256.086)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="6"/>
                        <line id="Line_21" data-name="Line 21" y1="14.877" x2="57.245" transform="translate(1151.755 317.455)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="6"/>
                    </g>
                </svg>
                <hr />
                    <h1 className="font main-red">Start your day with every sunrise</h1>
                <hr />
                <svg className="sun" xmlns="http://www.w3.org/2000/svg" width="508.715" height="191.735" viewBox="0 0 508.715 191.735">
                    <g id="Group_25" data-name="Group 25" transform="translate(1212.658 366.613) rotate(180)">
                        <path id="Path_1" data-name="Path 1" d="M3239.417,363s26.423-110.2,165.293-110.2S3572.359,363,3571.923,363" transform="translate(-2445.917)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="6"/>
                        <line id="Line_14" data-name="Line 14" x1="60.5" y1="12.832" transform="translate(707.5 324.5)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="6"/>
                        <line id="Line_15" data-name="Line 15" x1="47.5" y1="35.14" transform="translate(749.5 256.5)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="6"/>
                        <line id="Line_16" data-name="Line 16" x1="23" y1="42.121" transform="translate(821 209.978)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="6"/>
                        <line id="Line_17" data-name="Line 17" x1="1.5" y1="46.166" transform="translate(910 178.652)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="6"/>
                        <line id="Line_18" data-name="Line 18" y1="46.328" x2="11" transform="translate(995 178.49)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="6"/>
                        <line id="Line_19" data-name="Line 19" y1="36.925" x2="30.5" transform="translate(1071.5 215.174)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="6"/>
                        <line id="Line_20" data-name="Line 20" y1="29.266" x2="44.489" transform="translate(1118.511 256.086)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="6"/>
                        <line id="Line_21" data-name="Line 21" y1="14.877" x2="57.245" transform="translate(1151.755 317.455)" fill="none" stroke="#bc938b" strokeLinecap="round" strokeWidth="6"/>
                    </g>
                </svg>
            </section>

            <section className="mid main">
                <Flowers />
                <div>
                    <p className="handwriting white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et tellus facilisis, auctor purus vitae, sollicitudin lectus. Vestibulum gravida euismod elit, a semper justo.</p>
                    <p className="handwriting white">Suspendisse ac imperdiet neque, vitae suscipit purus. Vivamus iaculis dictum dolor, in tincidunt urna molestie et. Curabitur sit amet leo eu quam finibus pellentesque.</p>
                </div>
            </section>

            <section ref={target} className="sectionPreview">
                <div className="preview" ref={mid.ref} />
            </section>

            <section className="login-section main">
                <hr />
                    <h1 className="font white">Begin Planning</h1>
                    <div>
                        <button className="btn-select main-red handwriting">Sign Up</button>
                        <button className="btn-select main-red handwriting">Log In</button>
                    </div>
                <hr />
            </section>
        </>
    )
}

export default Homepage;