import React, { useState } from "react";

const Menu = () => {
    const [menuActive, setMenuActive] = useState(false);

    const menuDisplay = () => {
        setMenuActive(!menuActive);
    }

    return (
        <>
            <section className="menu-overlay">
                { !menuActive ? (
                        <button onClick={menuDisplay}>x</button>
                    ) : (
                        <button onClick={menuDisplay}>o</button>
                    )
                }
            </section>
        </>
    )
}

export default Menu;