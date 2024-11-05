import "./navbar.scss"

const Navbar = () => {
    return (
        <nav>
            <div className='left'>
                <a href="/" className="logo">
                    <img src="./logo.png"></img>
                    <span>DuyEstate</span>
                </a>
                <a href="">Home</a>
                <a href="">About</a>
                <a href="">Contact</a>
                <a href="">Angents</a>
            </div>
            <div className='right'>
                <a href="">Sign in</a>
                <a href="" className="register">Sign Up</a>
            </div>
        </nav>


    )
}

export default Navbar
