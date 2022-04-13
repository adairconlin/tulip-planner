import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Homepage = () => {
    const logout = e => {
        e.preventDefault();
        Auth.logout();
    }

    return (
        <>
            <h1>Homepage</h1>
            { Auth.loggedIn() ? 
            <a href="/" onClick={logout}>Logout</a>
            :
            <>
                <Link to="/signup">
                    <button>Sign Up</button>
                </Link>
                <Link to="/login">
                    <button>Login</button>
                </Link>
            </>
            }
        </>
    )
}

export default Homepage;