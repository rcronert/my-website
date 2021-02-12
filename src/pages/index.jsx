import React from "react"
import locomotiveScroll from "locomotive-scroll"
import Home from "../sections/home"
import About from "../sections/about"
import Contact from "../sections/contact"
import CustomCursor from "../components/customCursor"
import SEO from "../components/seo"
import NavBar from "../components/navBar"
import constants from "../const/constants"
import functions from "../const/functions"
import "typeface-montserrat"
// import "typeface-roboto-slab"
import "animate.css/animate.min.css"
import "locomotive-scroll/dist/locomotive-scroll.css"
import 'swiper/swiper-bundle.min.css'
import "../scss/style.scss"

const IndexPage = () => {

  const hoveredSectionBackgroundC = React.useRef(undefined);
  const navBarRef = React.useRef();
  const [isMobile, setIsMobile] = React.useState(typeof navigator !== 'undefined' && functions.isMobile());

  const [locoScroll, setLocoScroll] = React.useState(undefined);
  const [displayHome, setDisplayHome] = React.useState(true);
  const [colorClass, setColorClass] = React.useState(constants.darkClass);

  React.useEffect(() => {
    window.addEventListener('resize', () => setIsMobile(typeof navigator !== 'undefined' && functions.isMobile()));
  }, []);

  // To handle vh on mobile devices
  const setVhProperty = React.useCallback(() => {
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

  React.useEffect(() => {
    setVhProperty();
  }, []); // eslint-disable-line

  React.useEffect(() => {
    window.addEventListener('resize', () => setVhProperty());
  }, []); // eslint-disable-line

  const adaptCursorColor = React.useCallback(() => {
    const hoveredSection = document.querySelector("section:hover");
    if (hoveredSection) {
      const newSectionBackgroundC = window.getComputedStyle(hoveredSection, null).getPropertyValue("background-color");
      if (hoveredSectionBackgroundC.current !== newSectionBackgroundC) {
        hoveredSectionBackgroundC.current = newSectionBackgroundC;
        const colorType = functions.isLightOrDark(newSectionBackgroundC);
        if (colorType === "dark") {
          setColorClass(constants.lightClass);
        } else {
          setColorClass(constants.darkClass);
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
      getDirection: true,
      touchMultiplier: 2.5,
      smartphone: {
        smooth: true,
      },
      tablet: {
        smooth: true,
      },
    });
    setLocoScroll(myLocoScroll);
  }, []); // eslint-disable-line

  React.useEffect(() => {
    return () => {
      if (locoScroll) locoScroll.destroy();
    }
  }, [locoScroll]);

  React.useEffect(() => {

    let localDisplayHome = true;
    let navBarBorderDistance = 0;
    let colorChangedWhenEntered = false;
    let colorChangedWhenLeft = true;
    const homeTitle1 = document.querySelector('#home-title-1');
    const homeTitle2 = document.querySelector('#home-title-2');
    const aboutSection = document.querySelector('#about');
    let lastScrollDirection = "down";
    const thresholdSkillsInView = 0.9;
    let thresholdHomeTitles = 0;
    const clientsGrid = document.querySelector('#clients-grid');

    if (locoScroll) {

      const skillWordsContainer = document.querySelectorAll('#words-container > div');
      const wordsAnimsList = [];

      // To handle #skills word-container animation
      if (skillWordsContainer) {
        skillWordsContainer.forEach(parent => {
          for (let i = 0; i < parent.children.length; i++) {
            wordsAnimsList.push(
              parent.children[i].animate(
                [
                  { transform: 'translateX(-400%)' }
                ], {
                // timing options
                duration: functions.getAnimWordDuration(parent.getAttribute("name")),
                iterations: Infinity,
                easing: "linear"
              }
              )
            );
          }
        });
      }

      locoScroll.on("scroll", (scrollEvent) => {

        navBarBorderDistance = navBarRef.current.clientHeight / 2;

        // To handle Hide of Home section (to let appear contact section)
        if (scrollEvent.scroll.y > window.innerHeight + navBarBorderDistance) { // If we scrolled more than Home section height (viewport height) => - navbar to be sure (on some mobiles)
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

        // To handle colors (backgrounds, navbar etc) for #HOME ; #AboutMe ; #SKILLS
        if (scrollEvent.currentElements.aboutMe) {
          if (scrollEvent.currentElements.aboutMe.progress > thresholdSkillsInView) { // We skipped about me section
            if (aboutSection) {
              functions.setClass(aboutSection, "skills-in-view");
              functions.setClass(aboutSection, "first-background");
              functions.setDarkNavBarColor(navBarRef);
            }
          } else { // If we are before the skills section
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
              if (aboutSection.classList.contains("skills-in-view")) {
                functions.unsetClass(aboutSection, "skills-in-view");
                functions.unsetClass(aboutSection, "first-background");
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

                // To handle effect on home titles
                if (homeTitle1 && homeTitle2) {
                  if (window.matchMedia(`(min-width: ${constants.respBreakPoints.tabletPort}px)`).matches) {
                    thresholdHomeTitles = 0.07;
                  } else if (window.matchMedia(`(min-width: ${constants.respBreakPoints.phoneLand}px)`).matches) {
                    thresholdHomeTitles = 0.08;
                  } else {
                    thresholdHomeTitles = 0.12;
                  }
                  if (scrollEvent.currentElements.aboutMe.progress > thresholdHomeTitles) {
                    functions.setClass(homeTitle1, "hiddenEffect");
                    functions.setClass(homeTitle2, "hiddenEffect");
                  } else {
                    functions.unsetClass(homeTitle1, "hiddenEffect");
                    functions.unsetClass(homeTitle2, "hiddenEffect");
                  }
                }
              }
            }
          }
        }

        // To handle direction of words translating in section assuredQuality
        if (scrollEvent.currentElements.assuredQuality && scrollEvent.direction !== lastScrollDirection) {
          lastScrollDirection = scrollEvent.direction;
          wordsAnimsList.forEach(anim => {
            anim.reverse();
          });
        }

        // To hande backgrounds color variations between #SKILLS ; #ASSUREDQUALITY ; #CLIENTS
        if (aboutSection) {
          if (scrollEvent.currentElements.skills) { // We are still in skills section
            if (aboutSection.classList.contains("skills-in-view")) {
              functions.setClass(aboutSection, "first-background");
              functions.unsetClass(aboutSection, "second-background");
            }
          } else if (scrollEvent.currentElements.assuredQuality) { // We are no longer in skills section but in assuredQuality section
            functions.setClass(aboutSection, "second-background");
            functions.unsetClass(aboutSection, "first-background");
            functions.unsetClass(aboutSection, "third-background");
            functions.unsetClass(clientsGrid, "clients-background");
          } else if (scrollEvent.currentElements.clients) { // We are no longer in assuredQuality section but in clients section
            functions.setClass(aboutSection, "third-background");
            functions.unsetClass(aboutSection, "second-background");
            functions.setClass(clientsGrid, "clients-background");
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
    }
  }, [locoScroll, navBarRef]);

  return (
    <>
      {isMobile === false &&
        <CustomCursor adaptCursorColor={adaptCursorColor} colorClass={colorClass} />
      }
      <main data-scroll-container>
        <SEO title="Developer" />
        <NavBar navBarRef={navBarRef} scrollInstance={locoScroll} />
        <Home adaptCursorColor={adaptCursorColor} display={displayHome} />
        <About />
        <Contact />
      </main>
    </>
  );


}

export default IndexPage