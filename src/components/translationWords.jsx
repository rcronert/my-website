import React from "react"
import PropTypes from "prop-types"

const TranlationWords = props => {

    const words = [];
    for(let i = 0; i < 9; i++) {
        words.push(
            <div key={`key_${i}`} className={`${i%2 == 0 ? '' : ' empty'}`}>{props.text}</div>
        );
    }

    let dataScrollProps = {};
    if (props.rowNumber === 1) {
        dataScrollProps = {
            ['data-scroll-speed']: "6",
        };
    } else if (props.rowNumber === 2) {
        dataScrollProps = {
            ['data-scroll-speed']: "5.5",
        };
    } else if (props.rowNumber === 3) {
        dataScrollProps = {
            ['data-scroll-speed']: "6.5",
        };
    } else if (props.rowNumber === 4) {
        dataScrollProps = {
            ['data-scroll-speed']: "5",
        };
    }

    return (
        <div name={props.name} className={`word-container${props.className ? (' ' + props.className) : '' }`}
            data-scroll data-scroll-direction="horizontal" {...dataScrollProps}
        >
            {words}
        </div>
    )
}

TranlationWords.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
    rowNumber: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    // img: PropTypes.string.isRequired,
    // altImg: PropTypes.string.isRequired,
    // backContent: PropTypes.object.isRequired,
}

export default TranlationWords
