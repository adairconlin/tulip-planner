import React, { useState } from "react";
import { useSpring, animated, config } from "react-spring";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

// import svg asset
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

    // React Spring animations
    const containerLoad = useSpring({
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0 },
        config: config.gentle,
        delay: 100
    });

    const formLoad = useSpring({
        from: { opacity: 0},
        to: { opacity: 1},
        config: config.molasses,
        delay: 800
    })

    return (
        <>
            <section className="overlay-background"> 
                <animated.section style={containerLoad} className="overlay-container signon-container">
                    <SecondaryFlowers form={"signon"} />
                    <animated.form style={formLoad} onSubmit={handelUserLogin} autoComplete="off">
                        <h2 className="main-red font">Welcome back!</h2>

                        <label className="font main-red para" htmlFor="email">Email:</label>
                        <input className="handwriting main-green para" name="email" type="email" onChange={handleFormChange} />

                        <label className="font main-red para" htmlFor="password">Password:</label>
                        <input className="handwriting main-green para" name="password" type="password" onChange={handleFormChange} />

                        <button className="subtitle font green-btn" type="submit">Log In</button>
                        {error && <p>Log in failed.</p>}
                    </animated.form>
                </animated.section>
            </section>
        </>
    )
}

export default Login;