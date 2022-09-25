import React from "react";
import header from "../images/Vector.svg";

export default function Header() {
    return(
    <header className="header">
        <img className="header__logo" src={header} alt="лого" />
    </header>
    )
}


