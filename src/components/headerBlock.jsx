import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

const HeaderBlock = props => {
    const headerBlockClassName = classNames(
        "header-block",
        { [`${props.className}`]: props.className !== undefined }
    );

    return (
        <div className={headerBlockClassName}>
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
    text2: PropTypes.string,
    className: PropTypes.string,
}

export default HeaderBlock
