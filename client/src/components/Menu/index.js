import React, { useState } from "react";
import { useSpring, animated, config } from "react-spring";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Menu = () => {
    const [menuActive, setMenuActive] = useState(false);

    const logout = e => {
        e.preventDefault();
        Auth.logout();
    }

    const menuDisplay = () => {
        setMenuActive(!menuActive);

        if(menuActive) {
            document.querySelector("body").style.overflowY = "auto";
        } else if(!menuActive) {
            document.querySelector("body").style.overflowY = "hidden";
        }
    }

    // React Spring animation
    const openMenu = useSpring({
        opacity: menuActive ? 1 : 0,
        config: config.gentle
    });

    return (
        <>
            <section className="menu-overlay">
                { !menuActive ? (
                    <svg onClick={menuDisplay} xmlns="http://www.w3.org/2000/svg" width="28" height="17" viewBox="0 0 28 17">
                        <g id="Group_1" data-name="Group 1" transform="translate(-26.5 -32)">
                        <line id="Line_1" data-name="Line 1" x2="25" transform="translate(28 33.5)" fill="none" stroke="#898e77" strokeLinecap="round" strokeWidth="3"/>
                        <line id="Line_2" data-name="Line 2" x2="25" transform="translate(28 40.5)" fill="none" stroke="#898e77" strokeLinecap="round" strokeWidth="3"/>
                        <line id="Line_3" data-name="Line 3" x2="25" transform="translate(28 47.5)" fill="none" stroke="#898e77" strokeLinecap="round" strokeWidth="3"/>
                        </g>
                    </svg>
                    ) : (
                    <>
                        <animated.div style={openMenu} className="menu-open">
                            <animated.div style={openMenu} className="menu-white">
                                <svg onClick={menuDisplay} xmlns="http://www.w3.org/2000/svg" width="29.573" height="18.074" viewBox="0 0 29.573 18.074">
                                    <g id="Group_26" data-name="Group 26" transform="translate(-25.963 -31.463)">
                                        <line id="Line_1" data-name="Line 1" x2="25.5" y2="14" transform="translate(28 33.5)" fill="none" stroke="#898e77" strokeLinecap="round" strokeWidth="3"/>
                                        <line id="Line_3" data-name="Line 3" y1="14" x2="25.5" transform="translate(28 33.5)" fill="none" stroke="#898e77" strokeLinecap="round" strokeWidth="3"/>
                                    </g>
                                </svg>
                                
                                <div>
                                { Auth.loggedIn() ? 
                                    <a href="/" className="handwriting para main-green" onClick={logout}>Logout</a>
                                    :
                                    <>
                                    <Link to="/"
                                            className="handwriting para main-green" onClick={menuDisplay}>Home
                                        </Link>
                                        <Link to="/signup"
                                            className="handwriting para main-green" onClick={menuDisplay}>Sign Up
                                        </Link>
                                        <Link to="/login"
                                            className="handwriting para main-green" onClick={menuDisplay}>Login
                                        </Link>
                                    </>
                                    }
                                </div>
                            </animated.div>
                        </animated.div>
                    </>
                    )
                }
            </section>
        </>
    )
}

export default Menu;