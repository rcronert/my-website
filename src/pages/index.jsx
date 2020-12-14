import React from "react"
import Home from "../sections/home"
import AboutMe from "../sections/aboutMe"
import Skills from "../sections/skills"
import Contact from "../sections/contact"
// import Offer from "../sections/offer"
import CustomCursor from "../components/customCursor"
import CustomScrollbar from "../components/customScrollBar"
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
    <>
      <CustomCursor />
      <CustomScrollbar>
        <main>
          {/* A voir si on peut gérer avec le scroll ? */}
          <SEO title="Home" />
          <Home />
          <AboutMe />
          <Skills />
          <Contact />
        </main>
      </CustomScrollbar>
    </>
  );


}

export default IndexPage