import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import SecondaryFlowers from "../assets/SecondaryFlowers";

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
            <div className="signon-background"> 
                <div className="eventFormContainer signonContainer">
                    <SecondaryFlowers form={"signon"} />
                    <form onSubmit={handelUserSignup} autoComplete="off">
                        <h2 className="main-red font">Welcome.</h2>

                        <label className="font main-red para" htmlFor="name">Name:</label>
                        <input className="handwriting main-green para" name="name" onChange={handleFormChange} />

                        <label className="font main-red para" htmlFor="email">Email:</label>
                        <input className="handwriting main-green para" name="email" type="email" onChange={handleFormChange} />

                        <label className="font main-red para" htmlFor="password">Password:</label>
                        <input className="handwriting main-green para" name="password" type="password" onChange={handleFormChange} />

                        <button className="subtitle font green-btn" type="submit">Log In</button>
                        {error && <p>Sign up failed.</p>}
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup;