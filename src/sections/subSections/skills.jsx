import React from "react"
import SwiperCore, { Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from 'swiper/react'
import Card from "../../components/card"
import HeaderBlock from "../../components/headerBlock"
import TranslationWords from "../../components/translationWords"
import constants from "../../const/constants"
// import 'swiper/swiper.scss'
// import 'swiper/swiper-bundle.css'

// import 'swiper/components/navigation/navigation.scss'
// import 'swiper/components/pagination/pagination.scss'
// import "animate.css/animate.min.css"
import functions from "../../const/functions"

SwiperCore.use([Navigation, Pagination]);

const Skills = () => {

    const onBreakPointChange = (swiper) => {

        // To handle nav buttons hidding
        const prevButton = document.getElementsByClassName('swiper-button-prev')[0];
        const nextButton = document.getElementsByClassName('swiper-button-next')[0];
        if (prevButton !== undefined && nextButton !== undefined) {
            if (swiper.currentBreakpoint < constants.tabletPortBpMin) {
                prevButton.classList.add("hidden");
                nextButton.classList.add("hidden");
            } else {
                prevButton.classList.remove("hidden");
                nextButton.classList.remove("hidden");
            }
        }

        // To handle swiper-container width
        const swiperContainer = document.getElementById('cards-container');
        if (swiperContainer !== undefined) {
            if (swiper.currentBreakpoint >= constants.largeDesktopBpMin) {
                swiperContainer.className = 'large-desktop-viewport';
            } else if (swiper.currentBreakpoint >= constants.desktopBpMin) {
                swiperContainer.className = 'desktop-viewport';
            } else if (swiper.currentBreakpoint >= constants.laptopBpMin) {
                swiperContainer.className = 'laptop-viewport';
            } else if (swiper.currentBreakpoint >= constants.tabletPortBpMin) {
                swiperContainer.className = 'tablet-portrait-viewport';
            } else {
                swiperContainer.className = 'mobile-viewport';
            }
        }
    }

    return (

        <div id="skills">

            <div className="section-content">

                <div className="skills-container" data-scroll data-scroll-id="skills">
                    <HeaderBlock
                        header="Skills"
                        text1="Front-End web development oriented skills."
                        // text2="Here are the cards I hold"
                        text2="Here are some cards I hold"
                        className="hidden"
                    />
                    <div id="cards-container" data-scroll data-scroll-speed="1">
                        <Swiper
                            updateOnWindowResize
                            navigation
                            pagination
                            simulateTouch={!(typeof navigator !== 'undefined' && functions.isMobile())}
                            // simulateTouch={false}
                            onBreakpoint={onBreakPointChange}
                            watchOverflow
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                },
                                [constants.tabletPortBpMin]: {
                                    slidesPerView: 2,
                                },
                                [constants.laptopBpMin]: {
                                    slidesPerView: 3,
                                },
                                [constants.desktopBpMin]: {
                                    slidesPerView: 4,
                                },
                                [constants.largeDesktopBpMin]: {
                                    slidesPerView: 5,
                                }
                            }}
                        >
                            <SwiperSlide>
                                <Card img="react.png" altImg="React logo" backColor="blue"
                                    backContent={{ title: "React JS", xp: "4" }}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Card img="html.png" altImg="HTML5 logo" backColor="orange"
                                    backContent={{ title: "HTML5", xp: "4" }}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Card img="css.png" altImg="CSS3 logo" backColor="darkBlue"
                                    backContent={{ title: "CSS3", xp: "4" }}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Card img="javascript.png" altImg="JavaScript logo" backColor="yellow"
                                    backContent={{ title: "JavaScript", xp: "4" }}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Card img="adobe_xd.png" altImg="Adobe XD logo" backColor="violet"
                                    backContent={{ title: "Adobe XD", xp: "3" }}
                                />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>

                <div className="assuredQuality" data-scroll data-scroll-id="assuredQuality">
                    <HeaderBlock
                        header="Guaranteed quality"
                        // text1="I guarantee the quality of my deliverables"
                        text1="My commitement is to hand over quality deliverables."
                        text2="And this is how I play my cards"
                        className="hidden"
                    />
                    <div id="words-container" className="words-container" data-scroll data-scroll-speed="1">
                        <TranslationWords name={constants.wordsRowNames.first} text="Fast" rowNumber={1} />
                        <TranslationWords name={constants.wordsRowNames.second} text="Intuitive" rowNumber={2} />
                        <TranslationWords name={constants.wordsRowNames.third} text="Responsive" rowNumber={3} />
                        <TranslationWords name={constants.wordsRowNames.fourth} text="Clean Code" rowNumber={4} />
                    </div>
                </div>

            </div>

        </div>

    );

}

export default Skills
