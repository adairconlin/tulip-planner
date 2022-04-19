import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Signup = () => {
    const [formState, setFormState] = useState(
        {
            name: "",
            email: "",
            password: ""
        }
    );

    const [addUser, { error }] = useMutation(ADD_USER);

    const handleFormChange = (e) => {
        const { name, value } = e.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handelUserSignup = async(e) => {
        e.preventDefault();

        try {
            const { data } = await addUser({
                variables: {...formState}
            });
            Auth.login(data.addUser.token);
        } catch(e) {
            console.error(e);
        }
    };

    return (
        <>
            <h1>Signup</h1>
            <form onSubmit={handelUserSignup} autoComplete="off">
                <label htmlFor="name">Name:</label>
                <input name="name" type="name" onChange={handleFormChange} />

                <label htmlFor="email">Email:</label>
                <input name="email" type="email" onChange={handleFormChange} />

                <label htmlFor="password">Password:</label>
                <input name="password" type="password" onChange={handleFormChange} />

                <button type="submit">Sign up</button>
                {error && <p>Login failed.</p>}
            </form>
        </>
    )
}

export default Signup;