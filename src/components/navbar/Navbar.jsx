import { useState } from "react";
import "./navbar.scss"

const Navbar = () => {
    const [open, setOpen] = useState(false);
    return (
        <nav>
            <div className='left'>
                <a href="/" className="logo">
                    <img src="./logo.png"></img>
                    <span>DuyEstate</span>
                </a>
                <a href="/">Home</a>
                <a href="/list">About</a>
                <a href="">Contact</a>
                <a href="">Angents</a>
            </div>
            <div className='right'>
                <a href="">Sign in</a>
                <a href="" className="register">Sign Up</a>
                <div className="menuIcon">
                    <img src="/menu.png" onClick={() => setOpen(prev => !prev)} />
                </div>
                <div className={open ? "menu active" : "menu"}>
                    <a href="/">Home</a>
                    <a href="/list">About</a>
                    <a href="">Contact</a>
                    <a href="">Angents</a>
                    <a href="">Sign in</a>
                    <a href="">Sign Up</a>
                </div>
            </div>
        </nav>


    )
}

export default Navbar
