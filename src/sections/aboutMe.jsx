import React from "react"
import Image from "../components/image"

const AboutMe = () => {

    return (
        <section id="about">
            <div className="section-content">
                <h1>About me</h1>
                <div className="introduction">
                    <div className="photo-container">
                        <Image src="cv_photo.jpg" alt="photo image" />
                    </div>
                    <div className="description">
                        <p>
                            {"As a Front-End developer for 5 years now, I have had the opportunity to work on various projects for key accounts such as Total, Criteo, Canal Plus or the Conseil Régional PACA."}
                        </p>
                        <p>
                            {"Passionate about web technologies, I will be able to be force of proposal to bring an added value to your projects."}
                        </p>
                        <p>
                            {"My curiosity allows me to be informed and up to date on new practices and technical stacks."}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );

}

export default AboutMe
