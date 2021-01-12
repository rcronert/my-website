import React from "react"
import Home from "../sections/home"
import AboutMe from "../sections/aboutMe"
import Skills from "../sections/skills"
import Contact from "../sections/contact"
// import Offer from "../sections/offer"
import CustomCursor from "../components/customCursor"
import CustomScrollbar from "../components/customScrollBar"
import SEO from "../components/seo"
import NavBar from "../components/navBar"
import constants from "../const/constants"
import functions from "../const/functions"
// import constants from "../const/constants"
// import { Link } from "gatsby"
// import Layout from "../components/layout"
// import variablesScss from ""
import "typeface-montserrat"
import "animate.css/animate.min.css"
import "../scss/style.scss"

const IndexPage = () => {

  // const phoneNavMenuRef = React.useRef();

  const [cursorColor, setCursorColor] = React.useState(constants.rgbBlackColor);
  // const [scrollBarRef, setScrollBarRef] = React.useState(undefined);

  const hoveredSectionBackgroundC = React.useRef(undefined);

  // const triggerMenu = React.useCallback((navBarRef) => {
  //   if (phoneNavMenuRef.current.classList.contains("open")) {
  //     phoneNavMenuRef.current.classList.remove("open");
  //     if (phoneNavMenuRef.current.classList.contains("light")) {
  //       phoneNavMenuRef.current.classList.remove("light");
  //     }
  //   } else {
  //     phoneNavMenuRef.current.classList.add("open");
  //     if (navBarRef.current.classList.contains("dark")) {
  //       phoneNavMenuRef.current.classList.add("light");
  //     }
  //   }

  // }, []); // eslint-disable-line

  const adaptCursorColor = React.useCallback(() => {
    const hoveredSection = document.querySelector("section:hover");
    if (hoveredSection) {
      const newSectionBackgroundC = window.getComputedStyle(hoveredSection, null).getPropertyValue("background-color");
      if (hoveredSectionBackgroundC.current !== newSectionBackgroundC) {
        hoveredSectionBackgroundC.current = newSectionBackgroundC;
        const colorType = functions.isLightOrDark(newSectionBackgroundC);
        if (colorType === "dark") {
          setCursorColor(constants.rgbWhiteColor);
        } else {
          setCursorColor(constants.rgbBlackColor);
        }
      }
    }
  }, []);

  return (
    <>
      <CustomCursor adaptCursorColor={adaptCursorColor} cursorColor={cursorColor} />
      <CustomScrollbar /*setBarRef={setBarRef}*/>
        <main>
          {/* A voir si on peut gérer avec le scroll ? */}
          <SEO title="Home" />
          <NavBar /*triggerMenu={triggerMenu}*/ />
          {/* <div className="nav-menu-phone" ref={phoneNavMenuRef}>
            <div className="menu-link" onClick={triggerMenu}><a href="#about">About</a></div>
            <div className="menu-link" onClick={triggerMenu}><a href="#contact">Contact</a></div>
          </div> */}
          <Home adaptCursorColor={adaptCursorColor} />
          <AboutMe />
          <Skills />
          <Contact />
        </main>
      </CustomScrollbar>
    </>
  );


}

export default IndexPage