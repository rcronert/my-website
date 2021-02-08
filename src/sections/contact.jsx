import React from "react"

const Contact = () => {

    return (
        <section id="contact">
            <div className="section-content">
                <div className="title">
                    <h1>Let&apos;s get in touch</h1>
                    {/* <h1>Contact</h1> */}
                </div>
                <div className="contact-me">
                    <div className="mail">
                        <span className="underlineEffect-wrapper">
                            <a href="mailto:robin.cronert@gmail.com">robin.cronert@gmail.com</a>
                        </span>
                        <p>Based in Paris</p>
                    </div>
                    <div className="social-networks">
                        <div className="links-wrapper">
                            <a href="https://www.linkedin.com/in/robin-crönert" rel="noreferrer" target="_blank">Linkedin</a>
                            <a href="https://github.com/rcronert/" rel="noreferrer" target="_blank">GitHub</a>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <span>Designed and developed with ♡ by myself</span>
                </div>
            </div>
        </section>

    );

}

export default Contact
