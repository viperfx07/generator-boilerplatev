var hidden, visibilityChange; 
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
    hidden = "hidden";
    visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
}



const addListener = (pageVisibilityHandler, blurHandler, focusHandler) => {
    // Warn if the browser doesn't support addEventListener or the Page Visibility API
    if (typeof document.addEventListener === "undefined" || hidden === undefined) {
        console.error("This demo requires a browser that supports the Page Visibility API.");
        return false;
    } else {
        // Handle page visibility change   
        document.addEventListener(visibilityChange, pageVisibilityHandler, false);
        window.addEventListener('focus', focusHandler, false);
        window.addEventListener('blur', blurHandler, false);
    }
};

const removeListener = (pageVisibilityHandler, blurHandler, focusHandler) => {
    // Warn if the browser doesn't support addEventListener or the Page Visibility API
    if (typeof document.addEventListener === "undefined" || hidden === undefined) {
        console.error("This demo requires a browser that supports the Page Visibility API.");
        return false;
    } else {
        // Handle page visibility change   
        document.removeEventListener(visibilityChange, pageVisibilityHandler, false);
        window.removeEventListener('focus', focusHandler, false);
        window.removeEventListener('blur', blurHandler, false);
    }
};

export { addListener, removeListener, hidden }