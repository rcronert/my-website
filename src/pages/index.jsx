import React from "react"
import Home from "../sections/home"
import AboutMe from "../sections/aboutMe"
import Skills from "../sections/skills"
import Contact from "../sections/contact"
// import Offer from "../sections/offer"
import CustomCursor from "../components/customCursor"
import CustomScrollbar from "../components/customScrollBar"
import SEO from "../components/seo"
import constants from "../const/constants"
// import constants from "../const/constants"
// import { Link } from "gatsby"
// import Layout from "../components/layout"
// import variablesScss from ""
import "typeface-montserrat"
import "animate.css/animate.min.css"
import "../scss/style.scss"

function lightOrDark(color) {
  let r, g, b, hsp;
  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If HEX --> store the red, green, blue values in separate variables
    color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

    r = color[1];
    g = color[2];
    b = color[3];
  }
  else {
    // If RGB --> Convert it to HEX: http://gist.github.com/983661
    color = +(
      "0x" + color.slice(1)
        .replace(
          color.length < 5 && /./g, '$&$&'
        )
    );

    r = color >> 16;
    g = color >> 8 & 255;
    b = color & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
  );

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 127.5) {
    return 'light';
  }
  else {
    return 'dark';
  }
}

const IndexPage = () => {

  const [cursorColor, setCursorColor] = React.useState(constants.rgbBlackColor);

  const hoveredSectionBackgroundC = React.useRef(undefined);

  const adaptCursorColor = React.useCallback(() => {
    const hoveredSection = document.querySelectorAll("section:hover")[0];
    if (hoveredSection) {
      const newSectionBackgroundC = window.getComputedStyle(hoveredSection, null).getPropertyValue("background-color");
      if (hoveredSectionBackgroundC.current !== newSectionBackgroundC) {
        hoveredSectionBackgroundC.current = newSectionBackgroundC;
        const colorType = lightOrDark(newSectionBackgroundC);
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
      <CustomScrollbar>
        <main>
          {/* A voir si on peut gérer avec le scroll ? */}
          <SEO title="Home" />
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