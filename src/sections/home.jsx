import React from "react"
import lottie from "lottie-web"
import scrollLottieJson from "../assets/lotties/scroll.json"
import PropTypes from "prop-types"
import functions from "../const/functions"

const Home = ({ /*adaptCursorColor,*/ display }) => {

    const homeSectionRef = React.useRef();

    const getCubes = React.useCallback(() => {
        let cubes = [];
        for (let i = 0; i < 6; i++) {
            cubes.push(<div key={`cube_${i}`} className="cube" />);
        }
        return cubes;
    }, []);

    React.useEffect(() => {
        if (display === false) {
            functions.setClass(homeSectionRef.current, "hidden");
        } else {
            functions.unsetClass(homeSectionRef.current, "hidden");
        }
    }, [display]);

    React.useEffect(() => {
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
            {/* <div className="background-anim">
                {getCubes()}
            </div> */}
            <div className="background-anim" />
            <div className="introduction">
                <div className="fadeInUp-wrapper">
                    <div id="home-title-1" className="hoverFadeInUp animate__animated animate__fadeInUp">
                        <span className="text1" data-text="Creative">Creative</span>                        
                    </div>
                </div>
                <div className="fadeInUp-wrapper">
                    <div id="home-title-2" className="hoverFadeInUp animate__animated animate__fadeInUp animate__delay-2s">
                        <span className="text2" data-text="Developer">Developer</span>
                    </div>
                </div>
            </div>
            <div className="scroll-lottie animate__animated animate__fadeIn animate__delay-3s" />
        </section>
    );

}

Home.propTypes = {
    adaptCursorColor: PropTypes.func,
    display: PropTypes.bool
}

export default React.memo(Home)
