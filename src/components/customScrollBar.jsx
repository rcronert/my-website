import React from "react"
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import PropTypes from "prop-types"

const CustomScrollbar = (props) => {

    // const scrollEltRef = React.useRef(undefined);

    // React.useEffect(() => {
    //     props.setBarRef(scrollEltRef.current);
    // }, []); // eslint-disable-line

    return (
        <SimpleBar style={{ height: '100%' }} /*ref={scrollEltRef}*/>
            {props.children}
        </SimpleBar>
    );
}

CustomScrollbar.propTypes = {
    children: PropTypes.object.isRequired,
    // setBarRef: PropTypes.func
}

export default CustomScrollbar
