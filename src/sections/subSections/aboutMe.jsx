import React from "react"
import Image from "../../components/image"

const AboutMe = () => {

    // const divRef = React.useRef(undefined);

    // React.useEffect(() => {
    //     console.log(divRef.current.clientHeight)
    //     const imageBox = document.querySelector('#about-me .img-box');
    //     if (imageBox) {
    //         console.log(imageBox)
    //         // imageBox.style.height = divRef.current.clientHeight;
    //         imageBox.style.height = `${divRef.current.clientHeight}px`;
    //         imageBox.style.bottom = `${divRef.current.clientHeight - 40}px`;
    //         // imageBox.style.height = "230px";
    //     }
    // }, [divRef]);

    return (
        <div id="about-me" data-scroll data-scroll-id="aboutMe">
            <div className="section-content">
                <h1 data-scroll data-scroll-speed="0.3">About me</h1>
                <div className="introduction">
                    <div className="photo-container">
                        <div className="img-wrapper-move" data-scroll data-scroll-speed="1">
                            <div className="img-wrapper" data-scroll data-scroll-speed="-1">
                                <Image src="cv_photo.jpg" alt="photo image" />
                            </div>
                        </div>
                        {/* <div className="img-box" data-scroll data-scroll-speed="1" /> */}
                    </div>
                    <div className="description" data-scroll data-scroll-speed="1">
                        <p>
                            {"As a Front-End Developer for 5 years now, I have had the opportunity to work on various projects for key accounts such as Total, Criteo, Canal Plus or the Conseil Régional PACA."}
                        </p>
                        <p>
                            {"Passionate about web technologies and UX/UI Design, I will be able to bring an added value to your projects in terms of development as well as design."}
                        </p>
                        <p>
                            {"My curiosity allows me to be informed and up to date on new practices and technical stacks."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AboutMe
