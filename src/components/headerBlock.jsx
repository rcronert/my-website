import React from "react"
import PropTypes from "prop-types"

const HeaderBlock = props => {
    return (
        <div className="header-block">
            <div className="header">
                <h3>{props.header}</h3>
            </div>
            {props.text1 &&
                <div className="text">
                    <p>{props.text1}</p>
                    {props.text2 &&
                        <p>{props.text2}</p>
                    }
                </div>
            }
        </div>
    )
}

HeaderBlock.propTypes = {
    header: PropTypes.string.isRequired,
    text1: PropTypes.string.isRequired,
    text2: PropTypes.string.isRequired,
    // className: PropTypes.string.isRequired,
}

export default HeaderBlock
