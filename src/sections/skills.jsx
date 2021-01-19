import React from "react"
import SwiperCore, { Navigation, Pagination } from "swiper"
import { Swiper, SwiperSlide } from 'swiper/react'
import Card from "../components/card"
import HeaderBlock from "../components/headerBlock"
import TranslationWords from "../components/translationWords"
import constants from "../const/constants"

import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'

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
        <section id="skills">
            <div className="section-content">

                <div className="skills-container">
                    <HeaderBlock
                        header="Skills"
                        text1="My skills are Front-End web development oriented"
                        text2="Here are the cards I hold"
                    />
                    <div id="cards-container">
                        <Swiper
                            updateOnWindowResize
                            navigation
                            pagination
                            simulateTouch={false}
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

                <div className="assuredQuality">
                    <HeaderBlock
                        header="Assured quality"
                        text1="I guarantee the quality of my deliverables"
                        text2="And this is how I play my cards"
                    />
                    <div className="words-container">
                        <TranslationWords className='fast' text="FAST" />
                        <TranslationWords className='intuitive' text="INTUITIVE" />
                        <TranslationWords className='responsive' text="RESPONSIVE" />
                        <TranslationWords className='clean-code' text="CLEAN CODE" />
                    </div>
                </div>
                
            </div>

        </section>
    );

}

export default Skills
