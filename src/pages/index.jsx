import React from "react"
import Home from "../sections/home"
import AboutMe from "../sections/aboutMe"
import Skills from "../sections/skills"
// import Offer from "../sections/offer"
import CustomScrollbars from "../components/customScrollBar"
import SEO from "../components/seo"
// import constants from "../const/constants"
// import { Link } from "gatsby"
// import Layout from "../components/layout"
// import variablesScss from ""
import "typeface-montserrat"
import "animate.css/animate.min.css"
import "../scss/style.scss"

const IndexPage = () => {

  return (
    <CustomScrollbars>
      <div>
        <main>
          {/* A voir si on peut gérer avec le scroll ? */}
          <SEO title="Home" />
          <Home />
          <AboutMe />
          <Skills />
          {/* <Offer /> */}
          <section id="outroFooter">
            <div className="section-content">
              <div className="title">
                <h1>Have an idea?</h1>
                <h1>Tell me about it</h1>
              </div>
                
            </div>
        </section>
        </main>
      </div>
    </CustomScrollbars >

  );


}

export default IndexPage