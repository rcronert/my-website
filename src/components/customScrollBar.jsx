import React from "react"
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import PropTypes from "prop-types"

const CustomScrollbar = (props) => {
    return (
        <SimpleBar style={{ height: '100%' }}>
            {props.children}
        </SimpleBar>
    );
}

CustomScrollbar.propTypes = {
    children: PropTypes.object.isRequired,
}

export default CustomScrollbar
