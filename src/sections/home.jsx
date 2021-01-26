import React from "react"
// import classNames from "classnames"
// import NavBar from "../components/navBar"
import constants from "../const/constants"
// import Lottie from 'react-lottie-player'
import lottie from "lottie-web"
// import { Player } from '@lottiefiles/react-lottie-player';
import scrollLottieJson from "../assets/lotties/scroll.json"
import PropTypes from "prop-types"

const Home = ({ adaptCursorColor, display }) => {

    const homeSectionRef = React.useRef();
    const sunDivRef = React.useRef();

    React.useEffect(() => {
        if (display === false) {
            homeSectionRef.current.classList.add("hidden");
        } else {
            if (homeSectionRef.current.classList.contains("hidden")) {
                homeSectionRef.current.classList.remove("hidden");
            }
        }
    }, [display]);

    React.useEffect(() => {
        setTimeout(
            () => {
                homeSectionRef.current.classList.add("sunrise");
                sunDivRef.current.classList.add("sunrise");
            },
            constants.sunriseDelay
        );
        setTimeout(
            () => {
                adaptCursorColor();
                // homeSectionRef.current.classList.add("sunrise-over");
            }, 
            constants.sunriseDelay + constants.sunriseDuration
        );
        lottie.loadAnimation({
            container: document.querySelector('#home .scroll-lottie'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: scrollLottieJson,
        });
    }, []); // eslint-disable-line

    return (
        <section id="home" ref={homeSectionRef} /*data-scroll-section*/>
            <div className="introduction animate__animated animate__fadeIn">
                <span className="hello">{"Hello, I'm Robin Crönert."}</span>
                <div className="description">{"I'm a french web Developer passionate about UX/UI Design."}</div>
            </div>
            <div className="scroll-lottie animate__animated animate__fadeIn animate__delay-3s" />
            <div ref={sunDivRef} className="sun" />
        </section>
    );

}

Home.propTypes = {
    adaptCursorColor: PropTypes.func,
    display: PropTypes.bool
}

export default React.memo(Home)
