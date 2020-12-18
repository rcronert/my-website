import React from "react"
import Logo from "../assets/svg-icons/logo_rc.svg"
import lottie from "lottie-web"
import menuLottieJson from "../assets/lotties/burger-menu.json"
import PropTypes from "prop-types"

const NavBar = ({triggerMenu}) => {

    const lottieMenuRef = React.useRef(undefined);
    const directionLottie = React.useRef(1);

    const onMenuClick = React.useCallback(() => {
        lottieMenuRef.current.setDirection(directionLottie.current);
        if (directionLottie.current === 1) {
            lottieMenuRef.current.playSegments([5, 40], true);
            triggerMenu();
        } else {
            lottieMenuRef.current.playSegments([40, 5], true);
            triggerMenu();
        }
        // lottieMenuRef.current.play();
        directionLottie.current = -directionLottie.current;
    }, []); // eslint-disable-line

    React.useEffect(() => {
        lottieMenuRef.current = lottie.loadAnimation({
            container: document.querySelector('.nav-row .menu-lottie'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: menuLottieJson,
        });
        lottieMenuRef.current.setSpeed(2);
    }, []);

    return (
        // <div>
        <div className="nav-row">
            {/* <div className="logo">Robin Crönert</div> */}
            <img className="logo animate__animated animate__fadeIn" src={Logo} alt="Left arrow icon" />
            <nav>
                <div className="links-wrap">
                    <div className="page-link"><a href="#about">About</a></div>
                    <div className="page-link"><a href="#contact">Contact</a></div>
                </div>
            </nav>
            <div className="menu-lottie animate__animated animate__fadeIn" onClick={onMenuClick} />
        </div>
        // <div>

        // </div>
        // </div>
    );

}

NavBar.propTypes = {
    triggerMenu: PropTypes.func,
}

export default React.memo(NavBar)
