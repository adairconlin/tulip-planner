import React, { useState } from "react";
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
    }

    return (
        <>
            <section className="menu-overlay">
                { !menuActive ? (
                        <button onClick={menuDisplay}>x</button>
                    ) : (
                        <>
                            <div className="menu-open">
                                <button onClick={menuDisplay}>o</button>
                                <div>
                                { Auth.loggedIn() ? 
                                    <a href="/" className="handwriting para" onClick={logout}>Logout</a>
                                    :
                                    <>
                                        <Link to="/signup">
                                            <a className="handwriting para" onClick={menuDisplay}>Sign Up</a>
                                        </Link>
                                        <Link to="/login">
                                            <a className="handwriting para" onClick={menuDisplay}>Login</a>
                                        </Link>
                                    </>
                                    }
                                </div>
                            </div>
                        </>
                    )
                }
            </section>
        </>
    )
}

export default Menu;