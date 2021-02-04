import React from "react"
// import Logo from "../assets/svg-icons/logo_rc.svg"
import lottie from "lottie-web"
import menuLottieJson from "../assets/lotties/burger-menu.json"
import constants from "../const/constants"
import PropTypes from "prop-types"
import functions from "../const/functions"

const NavBar = ({ scrollInstance, navBarRef }) => {

    const lottieMenuRef = React.useRef();
    const directionLottie = React.useRef(1);
    const phoneNavMenuRef = React.useRef();

    // Load burger menu anim
    React.useEffect(() => {
        lottieMenuRef.current = lottie.loadAnimation({
            container: document.querySelector('.nav-bar .menu-lottie'),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: menuLottieJson,
        });
        lottieMenuRef.current.setSpeed(3);
    }, []); // eslint-disable-line

    const onLinkClick = React.useCallback((name) => {
        if (name === constants.menuLinks.home) {
            scrollInstance.scrollTo("top");
        } else if (name === constants.menuLinks.contact) {
            scrollInstance.scrollTo("bottom");
        } else { // About for now
            scrollInstance.scrollTo(`#${name}`);
        }
    }, [scrollInstance, navBarRef]); // eslint-disable-line

    const setDarkPhoneMenu = React.useCallback(() => {
        if (phoneNavMenuRef.current.classList.contains("light")) {
            phoneNavMenuRef.current.classList.remove("light");
        }
    }, []); // eslint-disable-line

    const setLightPhoneMenu = React.useCallback(() => {
        phoneNavMenuRef.current.classList.add("light");
    }, []); // eslint-disable-line

    const openPhoneMenu = React.useCallback(() => {
        phoneNavMenuRef.current.classList.add("open");
    }, []); // eslint-disable-line

    const closePhoneMenu = React.useCallback(() => {
        phoneNavMenuRef.current.classList.remove("open");
    }, []); // eslint-disable-line

    const isPhoneMenuOpen = React.useCallback(() => {
        return phoneNavMenuRef.current.classList.contains("open");
    }, []); // eslint-disable-line

    const triggerMenu = React.useCallback(() => {
        if (isPhoneMenuOpen()) {
            closePhoneMenu();
        } else {
            openPhoneMenu();
            if (functions.isDarkNavBarColor(navBarRef)) {
                setLightPhoneMenu();
            } else {
                setDarkPhoneMenu();
            }
        }
    }, [navBarRef]); // eslint-disable-line

    const onBurgerMenuClick = React.useCallback(() => {
        lottieMenuRef.current.setDirection(directionLottie.current);
        if (directionLottie.current === 1) {
            lottieMenuRef.current.playSegments([5, 40], true);
            triggerMenu();
        } else {
            lottieMenuRef.current.playSegments([40, 5], true);
            triggerMenu();
        }
        directionLottie.current = -directionLottie.current;
    }, []); // eslint-disable-line

    const onMenuLinkClick = React.useCallback((linkName) => {
        onLinkClick(linkName);
        onBurgerMenuClick();
    }, [scrollInstance, navBarRef]); // eslint-disable-line

    // Intersection observer to adapt nav bar color (FOR SKILLS SECTION)
    // React.useEffect(() => {
    //     let previousY = undefined;
    //     const observer = new IntersectionObserver((entries) => {
    //         entries.forEach(entry => {
    //             const currentY = entry.boundingClientRect.y;
    //             const isIntersecting = entry.isIntersecting;

    //             if (previousY !== undefined) {
    //                 if (currentY < previousY) { // Skills section on top (scrolling down enter)
    //                     if (isIntersecting) {
    //                         // console.log("Scrolling down enter")
    //                         setDarkNavBarColor();
    //                     }
    //                 } else if (currentY > previousY) { // Skills section not on top anymore (scrolling up leaving)
    //                     if (!isIntersecting) {
    //                         // console.log("Scrolling up leave")
    //                         setLightNavBarColor();
    //                     }
    //                 }
    //             }

    //             previousY = currentY;
    //         });
    //     }, { threshold: [0], rootMargin: "0px 0px -90%" });

    //     // observing a target element
    //     observer.observe(document.querySelector("#skills"));
    // }, []); // eslint-disable-line

    return (
        <>
            <div className="nav-bar dark" ref={navBarRef}>
                {/* <img onClick={() => onLinkClick(constants.menuLinks.home)}
                    className="logo animate__animated animate__fadeIn" src={Logo} alt="Left arrow icon"
                /> */}
                <div className="fadeInUp-wrapper">
                    <div className="logo hoverFadeInUp clickable animate__animated animate__fadeInUp animate__delay-2s"
                        onClick={() => onLinkClick(constants.menuLinks.home)}
                    >
                        <span data-text="Robin Crönert">Robin Crönert</span>
                    </div>
                </div>
                <nav>
                    <div className="links-wrap">
                        <div className="fadeInUp-wrapper">
                            <div className="page-link clickable hoverFadeInUp animate__animated animate__fadeInUp animate__delay-2s">
                                <span data-text="About" onClick={() => onLinkClick(constants.menuLinks.about)}>
                                    About
                                </span>
                            </div>
                        </div>
                        <div className="fadeInUp-wrapper">
                            <div className="page-link clickable hoverFadeInUp animate__animated animate__fadeInUp animate__delay-2s">
                                <span data-text="Contact" onClick={() => onLinkClick(constants.menuLinks.contact)}>
                                    Contact
                                </span>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="menu-lottie animate__animated animate__fadeIn" onClick={onBurgerMenuClick} />
            </div>
            <div className="nav-menu-phone" ref={phoneNavMenuRef}>
                <div className="menu-link" onClick={() => onMenuLinkClick(constants.menuLinks.home)}><a>Home</a></div>
                <div className="menu-link" onClick={() => onMenuLinkClick(constants.menuLinks.about)}><a>About</a></div>
                <div className="menu-link" onClick={() => onMenuLinkClick(constants.menuLinks.contact)}><a>Contact</a></div>
            </div>
        </>
    );

}

NavBar.propTypes = {
    navBarRef: PropTypes.object,
    scrollInstance: PropTypes.object,
}

export default React.memo(NavBar)
// export default NavBar
