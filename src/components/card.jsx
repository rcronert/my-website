import React from "react"
import Image from "../components/image"

const Card = props => {

    const className = `flip-card${props.className ?  (' ' + props.className) : ''}`;
    const className2 = `flip-card-back${props.backColor ?  (' ' + props.backColor) : ''}`;
    
    return (
        <div class={className}>
            <div class="flip-card-inner">
                <div className="flip-card-front">
                    <Image src={props.img} alt={props.altImg} />
                </div>
                <div className={className2}>
                    <h3> {props.backContent.title} </h3>
                    <div className="xp-div">
                        <span className="xp"> XP </span>
                        <span className="years"> {props.backContent.xp} years </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
