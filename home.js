const video =
    document.getElementById("bg-video");

const hamburger =
    document.getElementById("hamburger");

const navMenu =
    document.getElementById("navMenu");


/*
    HAMBURGER LINES ANIMATE IN
    ONCE VIDEO STARTS PLAYING
*/

function triggerHamburger() {

    hamburger.classList.add("show");
}

video.addEventListener(
    "playing",
    triggerHamburger,
    { once: true }
);


/*
    FALLBACK — agar autoplay
    kisi wajah se turant fire
    na ho to bhi menu aa jaye
*/

setTimeout(
    triggerHamburger,
    600
);


/*
    HAMBURGER CLICK → TOGGLE NAV
*/

hamburger.addEventListener(
    "click",
    function () {

        navMenu.classList.toggle(
            "open"
        );

    }
);
