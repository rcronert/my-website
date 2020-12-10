// import React from "react"
// import PropTypes from "prop-types"
// import ArrowLeftSvg from "../assets/svg-icons/arrow-left.svg"
// import ArrowRightSvg from "../assets/svg-icons/arrow-right.svg"
// import "./arrowCircleButton.scss"

// const ArrowCircleButton = props => {
//     const className = `arrow-circle-button${props.leftArrow ?  ' left' : ' right'}${props.disabled ? ' disabled' : ''}`;
//     return (
//         <div role="button" tabIndex="0" className={className} onKeyPress={() => {}}
//             onClick={props.onClick} style={{ display: props.visible ? "flex" : "none" }}
//         >
//             {props.leftArrow &&
//                 <img src={ArrowLeftSvg} alt="Left arrow icon" />
//             }
//             {props.rightArrow &&
//                 <img src={ArrowRightSvg} alt="Right arrow icon" />
//             }
//         </div>
//     )
// }

// ArrowCircleButton.propTypes = {
//     className: PropTypes.string,
//     onClick: PropTypes.func.isRequired,
//     visible: PropTypes.bool,
//     leftArrow: PropTypes.bool,
//     rightArrow: PropTypes.bool,
// }

// export default ArrowCircleButton
