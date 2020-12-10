import React from "react"
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from "prop-types"

const CustomScrollbars = (props) => {
    return (
        <Scrollbars
            style={{ width: '100%', height: '100%' }}
            autoHide
            autoHideTimeout={2000}
            autoHideDuration={300}
            // renderTrackHorizontal={props => <div {...props} className="track-horizontal" />}
            renderTrackVertical={sbProps => <div style={{...sbProps.style, width: 8}} className="track-vertical" />}
            // renderThumbHorizontal={props => <div {...props} className="thumb-horizontal" />}
            renderThumbVertical={sbProps => <div {...sbProps} className="thumb-vertical" />}
            // renderView={props => <div {...props} className="view" />}
        >
            {props.children}
        </Scrollbars>
    );
}

CustomScrollbars.propTypes = {
    children: PropTypes.object.isRequired,
}

export default CustomScrollbars
