import React, { useRef } from "react";
import { useSpring, animated, config } from "react-spring";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import { useParallax } from "react-scroll-parallax";

//import svg assets
import Sun from "../assets/Sun";
import Flowers from "../assets/Flowers";

const Homepage = () => {
    const target = useRef(null);
    const mid = useParallax({
        speed: -10,
        targetElement: target.current,
      });

    //React Spring animations
    const heroLoad = useSpring({ 
        to: { opacity: 1 },
        from: { opacity: 0 },
        config: config.molasses,
        delay: 300
    });

    return (
        <>
            <section className="hero">
                <Sun direction={"top"} />
                <animated.hr style={heroLoad} />
                    <animated.h1 style={heroLoad} className="font main-red">Start your day with every sunrise</animated.h1>
                <animated.hr style={heroLoad} />
                <Sun direction={"bottom"} />
            </section>

            <section className="mid main">
                <Flowers />
                <div>
                    <Fade right>
                        <p className="handwriting white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et tellus facilisis, auctor purus vitae, sollicitudin lectus. Vestibulum gravida euismod elit, a semper justo.</p>
                    </Fade>
                    <Fade right delay={500}>
                        <p className="handwriting white">Suspendisse ac imperdiet neque, vitae suscipit purus. Vivamus iaculis dictum dolor, in tincidunt urna molestie et. Curabitur sit amet leo eu quam finibus pellentesque.</p>
                    </Fade>
                </div>
            </section>

            <section ref={target} className="sectionPreview">
                <div className="preview" ref={mid.ref} />
            </section>

            <section className="login-section main">
                <hr />
                    <h1 className="font white">Begin Planning</h1>
                    <div>
                        <Fade>
                            <button className="btn-select font">
                                <Link to="/signup">Sign Up</Link>
                            </button>
                        </Fade>
                        <Fade delay={500}>
                            <button className="btn-select font">
                                <Link to="/login">Login</Link>
                            </button>
                        </Fade>
                    </div>
                <hr />
            </section>
        </>
    )
}

export default Homepage;