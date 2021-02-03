import React from "react"
import locomotiveScroll from "locomotive-scroll"
import Home from "../sections/home"
import About from "../sections/about"
// import Clients from "../sections/subSections/clients"
// import AboutMe from "../sections/aboutMe"
// import Skills from "../sections/skills"
import Contact from "../sections/contact"
// import Offer from "../sections/offer"
import CustomCursor from "../components/customCursor"
// import CustomScrollbar from "../components/customScrollBar"
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
import "locomotive-scroll/dist/locomotive-scroll.css"
import "../scss/style.scss"

const IndexPage = () => {

  const hoveredSectionBackgroundC = React.useRef(undefined);
  const navBarRef = React.useRef();

  const [locoScroll, setLocoScroll] = React.useState(undefined);
  const [displayHome, setDisplayHome] = React.useState(true);
  const [cursorColor, setCursorColor] = React.useState(constants.rgbBlackColor);

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

  React.useEffect(() => {
    const myLocoScroll = new locomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
      inertia: 0.75,
      useKeyboard: true,
      smartphone: {
        smooth: true
      },
      tablet: {
        smooth: true
      },
    });
    setLocoScroll(myLocoScroll);
    return () => {
      if (locoScroll) locoScroll.destroy();
    }
  }, []); // eslint-disable-line

  React.useEffect(() => {

    let localDisplayHome = true;
    let navBarBorderDistance = 0;
    let colorChangedWhenEntered = false;
    let colorChangedWhenLeft = true;

    if (locoScroll) {

      locoScroll.on("scroll", (scrollEvent) => {

        navBarBorderDistance = navBarRef.current.clientHeight / 2;

        // To handle Hide of Home section (to let appear contact section)
        if (scrollEvent.scroll.y > window.innerHeight) { // If we scrolled more than Home section height (viewport height)
          if (localDisplayHome === true) {
            localDisplayHome = false;
            setDisplayHome(false);
          }
        } else {
          if (localDisplayHome === false) {
            localDisplayHome = true;
            setDisplayHome(true);
          }
        }

        // To handle colors (backgrounds, navbar etc) for section #About
        if (scrollEvent.currentElements.aboutMe) {
          let threshold = 0.9;
          if (window.matchMedia("(min-width: 768px)").matches) {
            threshold = 0.85;
          }
          if (scrollEvent.currentElements.aboutMe.progress > threshold) {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
              aboutSection.classList.add("skills-in-view");
              functions.setDarkNavBarColor(navBarRef);

              // console.log(scrollEvent)
              // const y = 1 + (scrollEvent.scroll.y) / 150
              // const [r, g, b] = [red/y, green/y, blue/y].map(Math.round)
              
              // aboutSection.style.backgroundColor = `rgb(${r}, ${g}, ${b})`

              // To make titles appear
              const headerBlocks = document.querySelectorAll('#skills .header-block');
              if (headerBlocks) {
                headerBlocks.forEach(element => {
                  element.classList.remove("hidden");
                  // const classesList = ["animate__animated", "animate__fadeIn"];
                  // element.classList.add(...classesList);
                });
              }
            }
          } else { // If we are before the skills section
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
              if (aboutSection.classList.contains("skills-in-view")) {
                aboutSection.classList.remove("skills-in-view");
                functions.setLightNavBarColor(navBarRef);
              } else {
                // To handle navbar color changes for #home section
                if (scrollEvent.scroll.y > window.innerHeight - navBarBorderDistance) { // If we scrolled more than Home section height (viewport height) - navbar border distance
                  if (functions.isDarkNavBarColor(navBarRef)) {
                    functions.setLightNavBarColor(navBarRef);
                  }
                } else {
                  if (!functions.isDarkNavBarColor(navBarRef)) {
                    functions.setDarkNavBarColor(navBarRef);
                  }
                }
              }
            }
          }
        }

        // Handling of navbar color for #contact section
        if (locoScroll.el.clientHeight - window.innerHeight - navBarBorderDistance // Total scroll height - home section - nav bar border distance
          <= scrollEvent.scroll.y // scroll position
          && scrollEvent.scroll.y
          <= locoScroll.el.clientHeight - window.innerHeight
        ) { // Total scroll height - home section
          if (!colorChangedWhenEntered) {
            functions.setLightNavBarColor(navBarRef);
            colorChangedWhenLeft = false;
            colorChangedWhenEntered = true;
          }
        } else if (scrollEvent.scroll.y < locoScroll.el.clientHeight - window.innerHeight - navBarBorderDistance) {
          if (!colorChangedWhenLeft) {
            functions.setDarkNavBarColor(navBarRef);
            colorChangedWhenEntered = false;
            colorChangedWhenLeft = true;
          }
        }

      });
      // locoScroll.on("call", (callValue ) => {
      //   console.log(callValue)
      //   // const aboutSection = document.querySelector('#about');
      //   // console.log(aboutSection)
      // });
    }
  }, [locoScroll, navBarRef]);

  return (
    <>
      <CustomCursor adaptCursorColor={adaptCursorColor} cursorColor={cursorColor} />
      <main data-scroll-container>
        {/* A voir si on peut gérer avec le scroll ? */}
        <SEO title="Home" />
        <NavBar navBarRef={navBarRef} scrollInstance={locoScroll} />
        <Home adaptCursorColor={adaptCursorColor} display={displayHome} />
        <About />
        <Contact />
      </main>
    </>
  );


}

export default IndexPage