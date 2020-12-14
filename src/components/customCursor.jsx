import React from "react"
// import PropTypes from "prop-types"

const isMobile = () => {
    const ua = navigator.userAgent;
    return /Android|Mobi/i.test(ua);
};

function useEventListener(eventName, handler, element = document) {
    const savedHandler = React.useRef();

    React.useEffect(() => {
        savedHandler.current = handler
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

const CustomCursor = ({ color = '255, 255, 255', outerAlpha = 1, innerSize = 8, outerSize = 20, outerScale = 5, innerScale = 0.7 }) => {

    const cursorOuterRef = React.useRef();
    const cursorInnerRef = React.useRef();
    const requestRef = React.useRef();
    const previousTimeRef = React.useRef();
    const [coords, setCoords] = React.useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = React.useState(true);
    const [isActive, setIsActive] = React.useState(false);
    const [isActiveClickable, setIsActiveClickable] = React.useState(false);
    let endX = React.useRef(0);
    let endY = React.useRef(0);

    const onMouseMove = React.useCallback(({ clientX, clientY }) => {
        setCoords({ x: clientX, y: clientY });
        cursorInnerRef.current.style.top = clientY + 'px';
        cursorInnerRef.current.style.left = clientX + 'px';
        endX.current = clientX;
        endY.current = clientY;
    }, []);

    const animateOuterCursor = React.useCallback((time) => {
        if (previousTimeRef.current !== undefined) {
            coords.x += (endX.current - coords.x) / 8;
            coords.y += (endY.current - coords.y) / 8;
            cursorOuterRef.current.style.top = coords.y + 'px';
            cursorOuterRef.current.style.left = coords.x + 'px';
        }
        previousTimeRef.current = time;
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
            cursorInnerRef.current.style.transform = `translate(-50%, -50%) scale(${innerScale})`;
            cursorOuterRef.current.style.transform = `translate(-50%, -50%) scale(${outerScale})`;
        } else {
            cursorInnerRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOuterRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    }, [innerScale, outerScale, isActive]);

    React.useEffect(() => {
        if (isActiveClickable) {
            cursorInnerRef.current.style.transform = `translate(-50%, -50%) scale(${innerScale * 1.2})`;
            cursorOuterRef.current.style.transform = `translate(-50%, -50%) scale(${outerScale * 1.4})`;
        }
    }, [innerScale, outerScale, isActiveClickable]);

    React.useEffect(() => {
        if (isVisible) {
            cursorInnerRef.current.style.transform = `translate(-50%, -50%) scale(1)`;
            cursorOuterRef.current.style.transform = `translate(-50%, -50%) scale(1)`;
        } else {
            cursorInnerRef.current.style.transform = `translate(-50%, -50%) scale(0)`;
            cursorOuterRef.current.style.transform = `translate(-50%, -50%) scale(0)`;
        }
    }, [isVisible]);

    React.useEffect(() => {
        const clickables = document.querySelectorAll(
            'a, input[type="submit"], input[type="image"], label[for], select, button, .link'
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
        })

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
    }, [isActive]);

    const styles = {
        cursorInner: {
            position: 'fixed',
            borderRadius: '50%',
            width: innerSize,
            height: innerSize,
            pointerEvents: 'none',
            mixBlendMode: 'difference',
            backgroundColor: `rgba(${color}, 1)`,
            // transition: 'opacity 0.15s ease-in-out, transform 0.25s ease-in-out',
            transition: 'transform 0.25s ease-in-out',
            zIndex: 1000,
            visibility: typeof navigator !== 'undefined' && isMobile() ? 'hidden' : 'visible' 
        },
        cursorOuter: {
            position: 'fixed',
            borderRadius: '50%',
            pointerEvents: 'none',
            width: outerSize,
            height: outerSize,
            mixBlendMode: 'difference',
            backgroundColor: `rgba(${color}, ${outerAlpha})`,
            // transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
            transition: 'transform 0.15s ease-in-out',
            zIndex: 1000,
            visibility: typeof navigator !== 'undefined' && isMobile() ? 'hidden' : 'visible' 
        }
    };

    return (
        <React.Fragment>
            <div ref={cursorOuterRef} style={styles.cursorOuter} />
            <div ref={cursorInnerRef} style={styles.cursorInner} />
        </React.Fragment>
    );

}

export default CustomCursor




// const isMobile = () => {
//     const ua = navigator.userAgent;
//     return /Android|Mobi/i.test(ua);
// };

// // let mousePosition = { x: -100, y: -100 };
// // let circlePosition = { x: -100, y: -100 };

// // const mouseCursor = React.createRef();


// const CustomCursor = () => {

//     const customCursor = React.useRef();
//     const endX = React.useRef(0);
//     const endY = React.useRef(0);
//     let animationFrame = React.useRef(undefined);

//     // const [position, setPosition] = useState({ x: 0, y: 0 });
//     // const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
//     const [customCursorPosition, setCustomCursorPosition] = useState({ x: -100, y: -100 });

//     const [hidden, setHidden] = useState(false);
//     const [clicked, setClicked] = useState(false);
//     const [linkHovered, setLinkHovered] = useState(false);

//     console.log('render')

//     const onMouseMove = React.useCallback(({ clientX, clientY }) => {
//         endX.current = clientX
//         endY.current = clientY
//     }, []);

//     const animateCursor = () => {
//         console.log('animateCursor')
//         console.log(endX)
//         console.log(endY)
//         const diffX = endX.current - customCursorPosition.x;
//         const diffY = endY.current - customCursorPosition.y;
//         setCustomCursorPosition({ x: customCursorPosition.x + diffX / 10, y: customCursorPosition.y + diffY / 10 });
//         // console.log(customCursorPosition)
//         customCursor.current.style.left = `${customCursorPosition.x + diffX / 10}px`;
//         customCursor.current.style.top = `${customCursorPosition.y + diffY / 10}px`;
//         animationFrame = window.requestAnimationFrame(animateCursor);
//         // console.log(customCursor.current)
//         // style={{
//         //     left: `${position.x}px`,
//         //     top: `${position.y}px`,
//         // }}
//     }

//     const onMouseLeave = () => {
//         setHidden(true);
//     };

//     const onMouseEnter = () => {
//         setHidden(false);
//     };

//     const onMouseDown = () => {
//         setClicked(true);
//     };

//     const onMouseUp = () => {
//         setClicked(false);
//     };

//     const addEventListeners = () => {
//         document.addEventListener("mousemove", onMouseMove);
//         document.addEventListener("mouseenter", onMouseEnter);
//         document.addEventListener("mouseleave", onMouseLeave);
//         document.addEventListener("mousedown", onMouseDown);
//         document.addEventListener("mouseup", onMouseUp);
//     }

//     const cleanAll = () => {
//         document.removeEventListener("mousemove", onMouseMove);
//         document.removeEventListener("mouseenter", onMouseEnter);
//         document.removeEventListener("mouseleave", onMouseLeave);
//         document.removeEventListener("mousedown", onMouseDown);
//         document.removeEventListener("mouseup", onMouseUp);
//         window.cancelAnimationFrame(animationFrame);
//     }

//     const handleLinkHoverEvents = () => {
//         document.querySelectorAll("a").forEach(el => {
//             el.addEventListener("mouseover", () => setLinkHovered(true));
//             el.addEventListener("mouseout", () => setLinkHovered(false));
//         });
//     };

//     const cursorClasses = classNames(
//         'custom-cursor',
//         {
//             'hidden': hidden,
//             'clicked': clicked,
//             'link-hovered': linkHovered
//         }
//     );

//     useEffect(() => {
//         addEventListeners();
//         handleLinkHoverEvents();
//         animateCursor();
//         return () => cleanAll();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [customCursorPosition]);

//     if (typeof navigator !== 'undefined' && isMobile()) return null;
//     return (
//         <div
//             className={cursorClasses}
//             ref={customCursor}
//         // style={{
//         //     left: `${position.x}px`,
//         //     top: `${position.y}px`,
//         // }}
//         />
//     )
// }

// export default CustomCursor
