import constants from "./constants";

const functions = {

    isMobile: () => {
        const ua = navigator.userAgent;
        return /Android|Mobi/i.test(ua);
        // return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    },

    isLightOrDark: (color) => {
        let r, g, b, hsp;
        // Check the format of the color, HEX or RGB?
        if (color.match(/^rgb/)) {
            // If HEX --> store the red, green, blue values in separate variables
            color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

            r = color[1];
            g = color[2];
            b = color[3];
        }
        else {
            // If RGB --> Convert it to HEX: http://gist.github.com/983661
            color = +(
                "0x" + color.slice(1)
                    .replace(
                        color.length < 5 && /./g, '$&$&'
                    )
            );

            r = color >> 16;
            g = color >> 8 & 255;
            b = color & 255;
        }

        // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
        hsp = Math.sqrt(
            0.299 * (r * r) +
            0.587 * (g * g) +
            0.114 * (b * b)
        );

        // Using the HSP value, determine whether the color is light or dark
        if (hsp > 127.5) {
            return 'light';
        }
        else {
            return 'dark';
        }
    },

    setLightNavBarColor: (navBarRef) => {
        if (navBarRef && navBarRef.current.classList.contains("dark")) {
            navBarRef.current.classList.remove("dark");
        }
    },

    setDarkNavBarColor: (navBarRef) => {
        if (navBarRef && navBarRef.current) {
            navBarRef.current.classList.add("dark");
        }
    },

    isDarkNavBarColor: (navBarRef) => {
        return navBarRef.current.classList.contains("dark");
    },

    hideHomeTitles: (title) => {
        if (!title.classList.contains("hiddenEffect")) {
            title.classList.add("hiddenEffect");
        }
    },

    revealHomeTitles: (title) => {
        if (title.classList.contains("hiddenEffect")) {
            title.classList.remove("hiddenEffect");
        }
    },

    getAnimWordDuration: (name) => {
        if (name === constants.wordsRowNames.first) {
            return 70000;
        } else if (name === constants.wordsRowNames.second) {
            return 85000;
        } else if (name === constants.wordsRowNames.third) {
            return 60000;
        } else if (name === constants.wordsRowNames.fourth) {
            return 90000;
        }
    },

    setClass: (element, style) => {
        if (!element.classList.contains(style)) {
            element.classList.add(style);
        }
    },

    unsetClass: (element, style) => {
        if (element.classList.contains(style)) {
            element.classList.remove(style);
        }
    },

    setAnimDirection: (anim, direction) => {
        anim.effect.updateTiming({ direction });
        const ct = anim.effect.getComputedTiming();
        anim.currentTime = ct.currentIteration * ct.duration + (ct.duration - ct.localTime % ct.duration);
    },

}

export default functions