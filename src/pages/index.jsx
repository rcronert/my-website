import React from "react"
import Home from "../sections/home"
import AboutMe from "../sections/aboutMe"
import Card from "../components/card"
import ArrowLeftSvg from "../assets/svg-icons/arrow-left.svg"
import ArrowRightSvg from "../assets/svg-icons/arrow-right.svg"
// import constants from "../const/constants"
// import { Link } from "gatsby"
// import Layout from "../components/layout"
import SEO from "../components/seo"
import "typeface-montserrat"
import "animate.css/animate.min.css"
import "../scss/style.scss"

const IndexPage = () => {

  return (

    <div>
      <main>
        {/* A voir si on peut gérer avec le scroll ? */}
        <SEO title="Home" />
        <Home />
        <AboutMe />
        <section id="cards">
          <div className="section-content">
            <div className="arrow-circle">
              <img src={ArrowLeftSvg} alt="Left arrow icon" />
            </div>
            
            <h2>The cards I hold</h2>
            <div className="cards-container">
              <Card img="react.png" altImg="React logo" backColor="blue"
                backContent={{ title: "React JS", xp: "+ 4" }}
              /> 
              <Card img="html.png" altImg="HTML5 logo" backColor="orange"
                backContent={{ title: "HTML5", xp: "+ 4" }}
              />
              <Card img="css.png" altImg="CSS3 logo" backColor="darkBlue"
                backContent={{ title: "CSS3", xp: "+ 4" }}
              />
              <Card img="javascript.png" altImg="JavaScript logo" backColor="yellow"
                backContent={{ title: "JavaScript", xp: "+ 4" }}
              />
              <Card img="adobe_xd.png" altImg="Adobe XD logo" backColor="violet"
                backContent={{ title: "Adobe XD", xp: "+ 3" }}
              />
            </div>
            <div className="arrow-circle right">
              <img src={ArrowRightSvg} alt="Right arrow icon" />
            </div>
          </div>
        </section>
      </main>
    </div>

  );


}

export default IndexPage