import React from "react"
import PropTypes from "prop-types"

const positionStart = -20;
const innerCursorSize = 8;
const outerCursorSize = 20;
const outerCursorBackgroundOpacity = 0.4;
const outerScale = 3;
const innerScale = 0.7;

const isMobile = () => {
    const ua = navigator.userAgent;
    return /Android|Mobi/i.test(ua);
};

const styles = {
    cursorInner: {
        position: 'fixed',
        top: positionStart,
        left: positionStart,
        borderRadius: '50%',
        width: innerCursorSize,
        height: innerCursorSize,
        transition: 'background-color 0.3s ease-in-out, transform 0.25s ease-in-out',
        // transition: 'transform 0.25s ease-in-out',
        zIndex: 1000,
        pointerEvents: 'none',
        visibility: typeof navigator !== 'undefined' && isMobile() ? 'hidden' : 'visible'
    },
    cursorOuter: {
        position: 'fixed',
        top: positionStart,
        left: positionStart,
        borderRadius: '50%',
        width: outerCursorSize,
        height: outerCursorSize,
        transition: 'background-color 0.3s ease-in-out, transform 0.15s ease-in-out',
        // transition: 'transform 0.15s ease-in-out',
        zIndex: 1000,
        pointerEvents: 'none',
        visibility: typeof navigator !== 'undefined' && isMobile() ? 'hidden' : 'visible'
    }
};

function useEventListener(eventName, handler, element = document) {
    const savedHandler = React.useRef();

    React.useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    React.useEffect(() => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;

        const eventListener = (event) => savedHandler.current(event);

        element.addEventListener(eventName, eventListener);

        return () => {
            element.removeEventListener(eventName, eventListener);
        }
    }, [eventName, element]);
}

const CustomCursor = ({ adaptCursorColor, cursorColor }) => {
    const cursorOuterRef = React.useRef();
    const cursorInnerRef = React.useRef();
    const requestRef = React.useRef();
    // const previousTimeRef = React.useRef();
    const [coords, setCoords] = React.useState({ x: positionStart, y: positionStart });
    const [isVisible, setIsVisible] = React.useState(true);
    const [isActive, setIsActive] = React.useState(false);
    const [isActiveClickable, setIsActiveClickable] = React.useState(false);
    let endX = React.useRef(positionStart);
    let endY = React.useRef(positionStart);

    const onMouseMove = React.useCallback(({ clientX, clientY }) => {
        adaptCursorColor();
        setCoords({ x: clientX, y: clientY });
        cursorInnerRef.current.style.top = (clientY - innerCursorSize / 2) + 'px';
        cursorInnerRef.current.style.left = (clientX - innerCursorSize / 2) + 'px';
        endX.current = clientX;
        endY.current = clientY;
    }, []); // eslint-disable-line

    const animateOuterCursor = React.useCallback((/*time*/) => {
        // if (previousTimeRef.current !== undefined) {
            coords.x += (endX.current - coords.x) / 8;
            coords.y += (endY.current - coords.y) / 8;
            cursorOuterRef.current.style.top = (coords.y - outerCursorSize / 2) + 'px';
            cursorOuterRef.current.style.left = (coords.x - outerCursorSize / 2) + 'px';
        // }
        // previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animateOuterCursor);
    }, [requestRef]); // eslint-disable-line

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
        if (isActive) {
            cursorInnerRef.current.style.transform = `scale(${innerScale})`;
            cursorOuterRef.current.style.transform = `scale(${outerScale})`;
            cursorOuterRef.current.style.border = `1px solid rgb(${cursorColor})`;
            cursorOuterRef.current.style.backgroundColor = `transparent`;
        } else {
            cursorInnerRef.current.style.transform = 'scale(1)';
            cursorOuterRef.current.style.transform = 'scale(1)';
            cursorOuterRef.current.style.border = `none`;
            cursorOuterRef.current.style.backgroundColor = `rgba(${cursorColor}, ${outerCursorBackgroundOpacity})`;
        }
    }, [isActive, cursorColor]);

    React.useEffect(() => {
        if (isActiveClickable) {
            cursorInnerRef.current.style.transform = `scale(${innerScale * 1.2})`;
            cursorOuterRef.current.style.transform = `scale(${outerScale * 1.4})`;
        }
    }, [isActiveClickable]);

    React.useEffect(() => {
        if (isVisible) {
            cursorInnerRef.current.style.transform = `scale(1)`;
            cursorOuterRef.current.style.transform = `scale(1)`;
        } else {
            cursorInnerRef.current.style.transform = `scale(0)`;
            cursorOuterRef.current.style.transform = `scale(0)`;
        }
    }, [isVisible]);

    const attachClickableEvents = React.useCallback(() => {
        const clickables = document.querySelectorAll(
            // 'a, input[type="submit"], input[type="image"], label[for], select, button, .link, *[class^="swiper-button"]'
            'a, button, .link, *[class^="swiper-button"], .logo, .c-scrollbar_thumb'
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
            <div className="outer-cursor" ref={cursorOuterRef} style={{...styles.cursorOuter, backgroundColor: `rgba(${cursorColor}, ${outerCursorBackgroundOpacity})`}} />
            <div className="inner-cursor" ref={cursorInnerRef} style={{...styles.cursorInner, backgroundColor: `rgb(${cursorColor})`}} />
        </React.Fragment>
    );

}

CustomCursor.propTypes = {
    cursorColor: PropTypes.string.isRequired,
    adaptCursorColor: PropTypes.func,
}

// export default CustomCursor
export default React.memo(CustomCursor)
