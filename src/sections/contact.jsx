import React from "react"

const Contact = () => {

    return (
        <section id="contact">
            <div className="section-content">
                <div className="title">
                    <h1>You have a project?</h1>
                    <h1>Tell me more</h1>
                </div>
                <div className="contact-me">
                    <div className="mail">
                        <a href="mailto:robin.cronert@gmail.com">robin.cronert@gmail.com</a>
                        <p>I am based in Paris</p>
                    </div>
                    <div className="social-networks">
                        <a href="https://www.linkedin.com/in/robin-crönert" rel="noreferrer" target="_blank">Linkedin</a>
                    </div>
                </div>
                <div className="footer">
                    <span>Developed by myself</span>
                </div>
            </div>
        </section>
    );

}

export default Contact
