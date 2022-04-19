import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Login = () => {
    const [formState, setFormState] = useState(
        {
            email: "",
            password: ""
        }
    );
    const [login, { error }] = useMutation(LOGIN_USER);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handelUserLogin = async(e) => {
        e.preventDefault();

        try {
            const { data } = await login({
                variables: {...formState}
            });
            Auth.login(data.login.token);
        } catch(e) {
            console.error(e);
        }
    };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handelUserLogin} autoComplete="off">
                <label htmlFor="email">Email:</label>
                <input name="email" type="email" onChange={handleFormChange} />

                <label htmlFor="password">Password:</label>
                <input name="password" type="password" onChange={handleFormChange} />

                <button type="submit">Sign up</button>
                {error && <p>Sign up failed.</p>}
            </form>
        </>
    )
}

export default Login;