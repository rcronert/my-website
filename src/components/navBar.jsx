import React from "react"
import Logo from "../assets/svg-icons/logo_rc.svg"
import lottie from "lottie-web"
import menuLottieJson from "../assets/lotties/burger-menu.json"
import constants from "../const/constants"
// import PropTypes from "prop-types"

const NavBar = () => {

    const lottieMenuRef = React.useRef();
    const directionLottie = React.useRef(1);
    const navBarRef = React.useRef();
    const phoneNavMenuRef = React.useRef();

    const setDarkNavBarColor = React.useCallback(() => {
        navBarRef.current.classList.add("dark");
    }, []); // eslint-disable-line

    const setLightNavBarColor = React.useCallback(() => {
        if (navBarRef.current.classList.contains("dark")) {
            navBarRef.current.classList.remove("dark");
        }
    }, []); // eslint-disable-line

    const isDarkNavBarColor = React.useCallback(() => {
        return navBarRef.current.classList.contains("dark");
    }, []); // eslint-disable-line

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
            if (isDarkNavBarColor()) {
                setLightPhoneMenu();
            } else {
                setDarkPhoneMenu();
            }
        }

    }, []); // eslint-disable-line

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
        onBurgerMenuClick();
        setTimeout(() => {
            if (linkName === constants.menuLinks.about || linkName === constants.menuLinks.contact) {
                setLightNavBarColor();
                setDarkPhoneMenu();
            }
        }, 100);
    }, []); // eslint-disable-line

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

    // Intersection observer to adapt nav bar color (FOR SKILLS SECTION)
    React.useEffect(() => {
        let previousY = undefined;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const currentY = entry.boundingClientRect.y;
                const isIntersecting = entry.isIntersecting;

                if (previousY !== undefined) {
                    if (currentY < previousY) { // Skills section on top (scrolling down enter)
                        if (isIntersecting) {
                            // console.log("Scrolling down enter")
                            setDarkNavBarColor();
                        }
                    } else if (currentY > previousY) { // Skills section not on top anymore (scrolling up leaving)
                        if (!isIntersecting) {
                            // console.log("Scrolling up leave")
                            setLightNavBarColor();
                        }
                    }
                }

                previousY = currentY;
            });
        }, { threshold: [0], rootMargin: "0px 0px -90%" });

        // observing a target element
        observer.observe(document.querySelector("#skills"));
    }, []); // eslint-disable-line

    // Intersection observer to adapt nav bar color (FOR CONTACT SECTION)
    React.useEffect(() => {
        let previousY = undefined;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const currentY = entry.boundingClientRect.y;
                const isIntersecting = entry.isIntersecting;

                if (previousY !== undefined) {
                    if (currentY < previousY) { // Contact section on top (scrolling down enter)
                        if (isIntersecting) {
                            // console.log("Scrolling down enter")
                            setLightNavBarColor();
                        }
                    } else if (currentY > previousY) { // Contact section not on top anymore (scrolling up leaving)
                        if (!isIntersecting) {
                            // console.log("Scrolling up leave")
                            setDarkNavBarColor();
                        }
                    }
                }
                
                previousY = currentY;
            });
        }, { threshold: [0], rootMargin: "0px 0px -90%" });

        // observing a target element
        observer.observe(document.querySelector("#contact"));
    }, []); // eslint-disable-line

    return (
        <>
            <div className="nav-bar" ref={navBarRef}>
                <img className="logo animate__animated animate__fadeIn" src={Logo} alt="Left arrow icon" />
                <nav>
                    <div className="links-wrap">
                        <div className="page-link"><a href="#about">About</a></div>
                        <div className="page-link"><a href="#contact">Contact</a></div>
                    </div>
                </nav>
                <div className="menu-lottie animate__animated animate__fadeIn" onClick={onBurgerMenuClick} />
            </div>
            <div className="nav-menu-phone" ref={phoneNavMenuRef}>
                <div className="menu-link" onClick={() => onMenuLinkClick(constants.menuLinks.about)}><a href="#about">About</a></div>
                <div className="menu-link" onClick={() => onMenuLinkClick(constants.menuLinks.contact)}><a href="#contact">Contact</a></div>
            </div>
        </>
    );

}

// NavBar.propTypes = {
//     triggerMenu: PropTypes.func,
//     // scrollBarRef: PropTypes.object,
// }

export default React.memo(NavBar)
