import React from "react"
import AboutMe from "./subSections/aboutMe"
import Skills from "./subSections/skills"

const About = () => {

    return (
        <section id="about" data-scroll-section>
            <AboutMe />
            <Skills />
        </section>
    );

}

export default About
