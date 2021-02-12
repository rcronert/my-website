import React from "react"
import PropTypes from "prop-types"
import Image from "../components/image"

const Card = props => {

    const className = `flip-card`;
    const className2 = `flip-card-back${props.backColor ?  (' ' + props.backColor) : ''}`;
    
    return (
        <div className={className}>
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <Image src={props.img} alt={props.altImg} />
                    <div className="tap-icon" />
                </div>
                <div className={className2}>
                    <h3> {props.backContent.title} </h3>
                    <span className="years">+ {props.backContent.xp} years XP</span>
                </div>
            </div>
        </div>
    )
}

Card.propTypes = {
    backColor: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    altImg: PropTypes.string.isRequired,
    backContent: PropTypes.object.isRequired,
}

export default Card
