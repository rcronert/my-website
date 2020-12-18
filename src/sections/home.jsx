import React, { useEffect } from "react"
// import classNames from "classnames"
import NavBar from "../components/navBar"
import constants from "../const/constants"
// import Lottie from 'react-lottie-player'
import lottie from "lottie-web"
// import { Player } from '@lottiefiles/react-lottie-player';
import scrollLottieJson from '../assets/lotties/scroll.json'
import PropTypes from "prop-types"

const Home = ({ adaptCursorColor }) => {

    const homeSectionRef = React.useRef();
    const sunDivRef = React.useRef();

    const triggerMenu = React.useCallback(() => {
        homeSectionRef.current.classList.toggle("menu-open");
    }, []);

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
            <NavBar triggerMenu={triggerMenu} />
            <div className="introduction animate__animated animate__fadeIn">
                <span className="hello">{"Hello, I'm Robin Crönert."}</span>
                <div className="description">{"I'm a french web Developer passionate about UX/UI Design."}</div>
            </div>
            <div className="scroll-lottie animate__animated animate__fadeIn" />
            <div ref={sunDivRef} className="sun" />
            {/* {isMenuOpen &&
                <div className="menu-backdrop">
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                </div>
            } */}
            
            {/* <div className='scroll-lottie animate__animated animate__fadeIn'>
                <Lottie
                    loop
                    animationData={scrollLottieJson}
                    play
                    style={{ width: '100%', height: '100%' }}
                />
                <Player
                    autoplay
                    loop
                    src={scrollLottieJson}
                    // style={{ height: '100%', width: '100%' }}
                />
            </div> */}
        </section>

    );

}

Home.propTypes = {
    adaptCursorColor: PropTypes.func
}

export default React.memo(Home)
