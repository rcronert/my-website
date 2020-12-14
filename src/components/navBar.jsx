import React from "react"
// import PropTypes from "prop-types"

const NavBar = () => {

    return (
        <div className="nav-row">
            <div className="logo">Robin Crönert</div>
            <nav>
                <div className="links-wrap">
                    <div className="page-link"><a href="#about">About</a></div>
                    <div className="page-link"><a href="#contact">Contact</a></div>
                </div>
            </nav>
        </div>
    )
}

// NavBar.propTypes = {
    // text: PropTypes.string.isRequired,
    // className: PropTypes.string.isRequired,
    // backColor: PropTypes.string.isRequired,
    // img: PropTypes.string.isRequired,
    // altImg: PropTypes.string.isRequired,
    // backContent: PropTypes.object.isRequired,
// }

export default NavBar
