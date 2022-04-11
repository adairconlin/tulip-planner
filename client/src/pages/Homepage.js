import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";

const Homepage = () => {
    const { loading, data } = useQuery(QUERY_USERS);
    const users = data?.users || [];
    console.log(users);

    return (
        <>
            <h1>Homepage</h1>
        </>
    )
}

export default Homepage;