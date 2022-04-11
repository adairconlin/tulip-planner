import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";
import Auth from "../utils/auth";

const Homepage = () => {
    const { loading, data } = useQuery(QUERY_USERS);
    const users = data?.users || [];
    console.log(users);

    const logout = e => {
        e.preventDefault();
        Auth.logout();
    }

    return (
        <>
            <h1>Homepage</h1>
            <Link to="/signup">
                <button>Sign Up</button>
            </Link>
            <Link to="/login">
                <button>Login</button>
            </Link>
            <a href="/" onClick={logout}>Logout</a>
        </>
    )
}

export default Homepage;