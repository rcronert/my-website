import React from "react"
import AboutMe from "./subSections/aboutMe"
import Skills from "./subSections/skills"
import Clients from "./subSections/clients"

const About = () => {

    return (
        <section id="about" data-scroll-section>
            <AboutMe />
            <Skills />
            <Clients />
        </section>
    );

}

export default About
