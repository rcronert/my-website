import React from "react"
import PropTypes from "prop-types"

const TranlationWords = props => {

    const words = [];
    for(let i = 0; i < 6; i++) {
        words.push(
            <div key={`key_${i}`} className={`${i%2 == 0 ? '' : ' empty'}`}>{props.text}</div>
        );
    }

    return (
        <div className={`word-container${props.className ? (' ' + props.className) : '' }`}>
            {words}
        </div>
    )
}

TranlationWords.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    // backColor: PropTypes.string.isRequired,
    // img: PropTypes.string.isRequired,
    // altImg: PropTypes.string.isRequired,
    // backContent: PropTypes.object.isRequired,
}

export default TranlationWords
