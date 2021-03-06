import React from "react"
import PropTypes from "prop-types"
import functions from "../const/functions";
import constants from "../const/constants";

const positionStart = -20;
// const positionStart = 500;
// const innerCursorSize = 8;
// const outerCursorSize = 20;
// const innerCursorSize = 40;
// const outerCursorSize = 100;
// const outerCursorBackgroundOpacity = 0.4;
// const startScale = 0.2;
// const outerScale = 3;
// const innerScale = 0.7;
// const outerScale = 0.6;
// const innerScale = 0.15;

const styles = {
    cursorInner: {
        // position: 'fixed',
        top: positionStart,
        left: positionStart,
        // borderRadius: '50%',
        // width: innerCursorSize,
        // height: innerCursorSize,
        // transition: 'background-color 0.3s ease-in-out, transform 0.25s ease-in-out',
        // zIndex: 1000,
        // pointerEvents: 'none',
        // visibility: typeof navigator !== 'undefined' && functions.isMobile() ? 'hidden' : 'visible'
    },
    cursorOuter: {
        // position: 'fixed',
        top: positionStart,
        left: positionStart,
        // borderRadius: '50%',
        // width: outerCursorSize,
        // height: outerCursorSize,
        // transition: 'background-color 0.3s ease-in-out, transform 0.15s ease-in-out',
        // zIndex: 1000,
        // pointerEvents: 'none',
        // visibility: typeof navigator !== 'undefined' && functions.isMobile() ? 'hidden' : 'visible'
    }
};

function useEventListener(eventName, handler) {
    const savedHandler = React.useRef();

    React.useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    React.useEffect(() => {
        const eventListener = (event) => savedHandler.current(event);

        document.addEventListener(eventName, eventListener);

        return () => {
            document.removeEventListener(eventName, eventListener);
        }
    }, [eventName]);
}

const CustomCursor = ({ adaptCursorColor, colorClass }) => {
    const cursorOuterRef = React.useRef();
    const cursorInnerRef = React.useRef();
    const requestRef = React.useRef();
    // const previousTimeRef = React.useRef();
    const [coords, setCoords] = React.useState({ x: positionStart, y: positionStart });
    const [isVisible, setIsVisible] = React.useState(true);
    const [isActive, setIsActive] = React.useState(false);
    const [isActiveClickable, setIsActiveClickable] = React.useState(false);
    // const [visibilityProp, setVisibility] = React.useState(typeof navigator !== 'undefined' && functions.isMobile() ? 'hidden' : 'visible');
    let endX = React.useRef(positionStart);
    let endY = React.useRef(positionStart);

    // React.useEffect(() => {
    //     window.addEventListener('resize', () => setVisibility(typeof navigator !== 'undefined' && functions.isMobile() ? 'hidden' : 'visible'));
    // }, []);

    const onMouseMove = React.useCallback(({ clientX, clientY }) => {
        adaptCursorColor();
        setCoords({ x: clientX, y: clientY });
        // cursorInnerRef.current.style.top = (clientY - innerCursorSize / 2) + 'px';
        // cursorInnerRef.current.style.left = (clientX - innerCursorSize / 2) + 'px';
        cursorInnerRef.current.style.top = clientY + 'px';
        cursorInnerRef.current.style.left = clientX + 'px';
        endX.current = clientX;
        endY.current = clientY;
    }, []); // eslint-disable-line

    const animateOuterCursor = React.useCallback((/*time*/) => {
        // if (previousTimeRef.current !== undefined) {
        if (cursorOuterRef && cursorOuterRef.current) {
            coords.x += (endX.current - coords.x) / 8;
            coords.y += (endY.current - coords.y) / 8;
            // cursorOuterRef.current.style.top = (coords.y - outerCursorSize / 2) + 'px';
            // cursorOuterRef.current.style.left = (coords.x - outerCursorSize / 2) + 'px';
            cursorOuterRef.current.style.top = coords.y + 'px';
            cursorOuterRef.current.style.left = coords.x + 'px';
        }
        // }
        // previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animateOuterCursor);
    }, [requestRef, cursorOuterRef]); // eslint-disable-line

    React.useEffect(() => requestRef.current = requestAnimationFrame(animateOuterCursor), [animateOuterCursor]);

    const onMouseDown = React.useCallback(() => setIsActive(true), []);
    const onMouseUp = React.useCallback(() => setIsActive(false), []);
    const onMouseEnter = React.useCallback(() => setIsVisible(true), []);
    const onMouseLeave = React.useCallback(() => setIsVisible(false), []);

    useEventListener('mousemove', onMouseMove);
    useEventListener('mousedown', onMouseDown);
    useEventListener('mouseup', onMouseUp);
    useEventListener('mouseenter', onMouseEnter);
    useEventListener('mouseleave', onMouseLeave);

    React.useEffect(() => {
        if (colorClass === constants.lightClass) {
            functions.unsetClass(cursorInnerRef.current, constants.darkClass);
            functions.unsetClass(cursorOuterRef.current, constants.darkClass);
        } else if (colorClass === constants.darkClass) {    
            functions.unsetClass(cursorInnerRef.current, constants.lightClass);
            functions.unsetClass(cursorOuterRef.current, constants.lightClass);
        }
        functions.setClass(cursorInnerRef.current, colorClass);
        functions.setClass(cursorOuterRef.current, colorClass);
    }, [colorClass]);

    React.useEffect(() => {
        if (isActive) {
            functions.setClass(cursorInnerRef.current, 'active');
            functions.setClass(cursorOuterRef.current, 'active');
        } else {
            functions.unsetClass(cursorInnerRef.current, 'active');
            functions.unsetClass(cursorOuterRef.current, 'active');
        }
    }, [isActive/*, colorClass*/]);

    React.useEffect(() => {
        if (isActiveClickable) {
            functions.setClass(cursorInnerRef.current, 'clicked');
            functions.setClass(cursorOuterRef.current, 'clicked');
        } else {
            functions.unsetClass(cursorInnerRef.current, 'clicked');
            functions.unsetClass(cursorOuterRef.current, 'clicked');
        }
    }, [isActiveClickable]);

    React.useEffect(() => {
        if (isVisible) {
            functions.unsetClass(cursorInnerRef.current, 'hidden');
            functions.unsetClass(cursorOuterRef.current, 'hidden');
            // cursorInnerRef.current.style.transform = `scale(${startScale})`;
            // cursorOuterRef.current.style.transform = `scale(${startScale})`;
        } else {
            functions.setClass(cursorInnerRef.current, 'hidden');
            functions.setClass(cursorOuterRef.current, 'hidden');
        }
    }, [isVisible]);

    const attachClickableEvents = React.useCallback(() => {
        const clickables = document.querySelectorAll(
            // 'a, input[type="submit"], input[type="image"], label[for], select, button, .link, *[class^="swiper-button"]'
            'a, button, .clickable, *[class^="swiper-button"], .c-scrollbar_thumb'
        );

        clickables.forEach((el) => {
            el.style.cursor = 'none';

            el.addEventListener('mouseover', () => {
                setIsActive(true);
            });
            el.addEventListener('click', () => {
                setIsActive(true);
                setIsActiveClickable(false);
            });
            el.addEventListener('mousedown', () => {
                setIsActiveClickable(true);
            });
            el.addEventListener('mouseup', () => {
                setIsActive(true);
            });
            el.addEventListener('mouseout', () => {
                setIsActive(false);
                setIsActiveClickable(false);
            });
        });

        return () => {
            clickables.forEach((el) => {
                el.removeEventListener('mouseover', () => {
                    setIsActive(true);
                });
                el.removeEventListener('click', () => {
                    setIsActive(true);
                    setIsActiveClickable(false);
                });
                el.removeEventListener('mousedown', () => {
                    setIsActiveClickable(true);
                })
                el.removeEventListener('mouseup', () => {
                    setIsActive(true);
                });
                el.removeEventListener('mouseout', () => {
                    setIsActive(false);
                    setIsActiveClickable(false);
                });
            })
        }
    }, []); // eslint-disable-line

    React.useEffect(() => {
        setTimeout(() => attachClickableEvents(), 0); // wait until scrollbar loaded
    }, []); // eslint-disable-line

    React.useEffect(() => {
        attachClickableEvents();
    }, [isActive]); // eslint-disable-line

    return (
        <React.Fragment>
            <div className="outer-cursor" ref={cursorOuterRef}
                style={{...styles.cursorOuter/*, visibility: visibilityProp, backgroundColor: `rgba(${colorClass}, ${outerCursorBackgroundOpacity})`*/}}
            />
            <div className="inner-cursor" ref={cursorInnerRef}
                style={{...styles.cursorInner/*, visibility: visibilityProp, backgroundColor: `rgb(${colorClass})`*/}}
            />
        </React.Fragment>
    );

}

CustomCursor.propTypes = {
    colorClass: PropTypes.string.isRequired,
    adaptCursorColor: PropTypes.func,
}

// export default CustomCursor
export default React.memo(CustomCursor)
