import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import SecondaryFlowers from "../assets/SecondaryFlowers";

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
            <section className="overlay-background"> 
                <section className="overlay-container signon-container">
                    <SecondaryFlowers form={"signon"} />
                    <form onSubmit={handelUserLogin} autoComplete="off">
                        <h2 className="main-red font">Welcome back!</h2>

                        <label className="font main-red para" htmlFor="email">Email:</label>
                        <input className="handwriting main-green para" name="email" type="email" onChange={handleFormChange} />

                        <label className="font main-red para" htmlFor="password">Password:</label>
                        <input className="handwriting main-green para" name="password" type="password" onChange={handleFormChange} />

                        <button className="subtitle font green-btn" type="submit">Log In</button>
                        {error && <p>Log in failed.</p>}
                    </form>
                </section>
            </section>
        </>
    )
}

export default Login;