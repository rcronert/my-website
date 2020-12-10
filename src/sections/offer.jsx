import React from "react"
import HeaderBlock from "../components/headerBlock"
import TranslationWords from "../components/translationWords"

const Offer = () => {

    return (
        <section id="offer">
            <div className="section-content">
                {/* <h2>How will I play it?</h2> */}
                <HeaderBlock header="Skills" text1="Specialized in Front-End web development" text2="Here are the cards I hold" />
                <div className="words-container">
                    <TranslationWords className='first-row' text="INTUITIVE" />
                    <TranslationWords className='second-row' text="FAST" />
                    <TranslationWords className='third-row' text="RESPONSIVE" />
                    <TranslationWords className='fourth-row' text="CLEAN CODE" />
                </div>
            </div>
        </section>
    );

}

export default Offer
