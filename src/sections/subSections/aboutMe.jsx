import React from "react"
import Image from "../../components/image"

const AboutMe = () => {

    const divRef = React.useRef(undefined);

    const setImgBoxDivSize = React.useCallback(() => {
        const imageBox = document.querySelector('#about-me .img-box');
        if (imageBox) {
            imageBox.style.height = `${divRef.current.clientHeight}px`;
            imageBox.style.width = `${divRef.current.clientWidth}px`;
        }
    }, [divRef]); // eslint-disable-line

    React.useEffect(() => {
        setImgBoxDivSize();
    }, []); // eslint-disable-line

    React.useEffect(() => {
        window.addEventListener('resize', setImgBoxDivSize);
    }, []); // eslint-disable-line

    return (
        <div id="about-me" data-scroll data-scroll-id="aboutMe">
            <div className="section-content">
                {/* <h1 data-scroll data-scroll-speed="0.3">About me</h1> */}
                <div className="introduction">
                    <div className="photo-container">
                        {/* <div className="img-wrapper-move" data-scroll data-scroll-speed="1"> */}
                            <div ref={divRef} className="img-wrapper" /*data-scroll data-scroll-speed="1"*/>
                                <Image src="cv_photo.jpg" alt="photo image" />
                            </div>
                        {/* </div> */}
                        <div className="img-box" data-scroll data-scroll-speed="0.5" />
                    </div>
                    <div className="description" data-scroll data-scroll-speed="0.5">
                        <p>
                            {"Good afternoon! I'm Robin Crönert, a french web Developer passionate about UX/UI Design."}
                        </p>
                        {/* <p>
                            {"I am an engineering school graduate and specialized in web development and innovation."}
                        </p> */}
                        <p>
                            {"From concept to production, I create user-friendly and fast solutions, paying attention to clean design and maintainable code."}
                        </p>
                        <p>
                            {/* {"As a Front-End Developer for 5 years now, I have had the opportunity to work on various projects for key accounts such as Total, Criteo, Canal Plus or the Conseil Régional PACA."} */}
                            {/* {"As a Front-End Developer for 5 years now, I've had the chance to work on multiple projects, each more interesting and challenging than the last."} */}
                            {"As a Front-End Developer for 5 years now, I've gained a wealth of knowledge and expertise by working on numerous projects, each more interesting and challenging than the last."}
                        </p>
                        {/* <p>
                            {"Passionate about web technologies and UX/UI Design, I bring an added value to your projects in terms of development as well as design."}
                        </p> */}
                        <p>
                            {/* {"Curious, I am well informed and up to date on new practices and technical stacks."} */}
                            {/* {"Curious, I stay informed and up to date on state of the art practices and technical stacks."} */}
                            {"Curious, I keep abreast of web design trends, best practices and new technical stacks."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AboutMe
