import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useParallax } from "react-scroll-parallax";
import Sun from "../assets/Sun";
import Flowers from "../assets/Flowers";

const Homepage = () => {
    const target = useRef(null);
    const mid = useParallax({
        speed: -10,
        targetElement: target.current,
      });

    return (
        <>
            <section className="hero">
                <Sun direction={"top"} />
                <hr />
                    <h1 className="font main-red">Start your day with every sunrise</h1>
                <hr />
                <Sun direction={"bottom"} />
            </section>

            <section className="mid main">
                <Flowers />
                <div>
                    <p className="handwriting white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et tellus facilisis, auctor purus vitae, sollicitudin lectus. Vestibulum gravida euismod elit, a semper justo.</p>
                    <p className="handwriting white">Suspendisse ac imperdiet neque, vitae suscipit purus. Vivamus iaculis dictum dolor, in tincidunt urna molestie et. Curabitur sit amet leo eu quam finibus pellentesque.</p>
                </div>
            </section>

            <section ref={target} className="sectionPreview">
                <div className="preview" ref={mid.ref} />
            </section>

            <section className="login-section main">
                <hr />
                    <h1 className="font white">Begin Planning</h1>
                    <div>
                        <button className="btn-select font">
                            <Link to="/signup">Sign Up</Link>
                        </button>
                        <button className="btn-select font">
                            <Link to="/login">Login</Link>
                        </button>
                    </div>
                <hr />
            </section>
        </>
    )
}

export default Homepage;