import React, { useEffect } from "react"
// import classNames from "classnames"
// import NavBar from "../components/navBar"
import constants from "../const/constants"
// import Lottie from 'react-lottie-player'
import lottie from "lottie-web"
// import { Player } from '@lottiefiles/react-lottie-player';
import scrollLottieJson from "../assets/lotties/scroll.json"
import PropTypes from "prop-types"

const Home = ({ adaptCursorColor }) => {

    const homeSectionRef = React.useRef();
    const sunDivRef = React.useRef();

    useEffect(() => {
        setTimeout(
            () => {
                homeSectionRef.current.classList.add("sunrise");
                sunDivRef.current.classList.add("sunrise");
            },
            constants.sunriseDelay
        );
        setTimeout(() => { adaptCursorColor();}, 6000);
        lottie.loadAnimation({
            container: document.querySelector('#home .scroll-lottie'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: scrollLottieJson,
        });
    }, []); // eslint-disable-line

    return (

        <section id="home" ref={homeSectionRef}>
            <div className="introduction animate__animated animate__fadeIn">
                <span className="hello">{"Hello, I'm Robin Crönert."}</span>
                <div className="description">{"I'm a french web Developer passionate about UX/UI Design."}</div>
            </div>
            <div className="scroll-lottie animate__animated animate__fadeIn" />
            <div ref={sunDivRef} className="sun" />
        </section>

    );

}

Home.propTypes = {
    adaptCursorColor: PropTypes.func
}

export default React.memo(Home)
