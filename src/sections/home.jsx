import React, { useState } from "react"
import constants from "../const/constants"
import Lottie from 'react-lottie-player';
import scrollLottieJson from '../assets/lotties/scroll.json';

const Home = () => {

    const sunrises = () => {
        setSunCn('sun sunrise');
        setHomeSectionCn('sunrise');
    }

    const [sunCn, setSunCn] = useState('sun');
    const [homeSectionCn, setHomeSectionCn] = useState('');

    setTimeout(sunrises, constants.sunriseDelay);

    return (

        <section id='home' className={homeSectionCn}>
            <div className="nav-row">
                <div className="logo">Robin Crönert</div>
                <nav>
                    <div className="links-wrap">
                        <div className="page-link"><a href="#about">About</a></div>
                        <div className="page-link"><a href="#contact">Contact</a></div>
                    </div>
                </nav>
            </div>
            <div className="introduction animate__animated animate__fadeIn">
                <span className="hello">{"Hello, I'm Robin Cronert."}</span>
                <div className="description">{"I'm a french web developer passionate about UX/UI Design."}</div>
            </div>
            <div className='scroll-lottie animate__animated animate__fadeIn'>
                <Lottie
                    loop
                    animationData={scrollLottieJson}
                    play
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
            <div className={sunCn} />
        </section>

    );


}

export default Home
