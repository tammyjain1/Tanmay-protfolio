const video =
    document.getElementById("bg-video");


/*
    PICK VIDEO BASED ON SCREEN SIZE
*/

const isPhone =
    window.matchMedia(
        "(max-width: 600px)"
    ).matches;


video.src =
    isPhone
        ? "video-portrait.mp4"
        : "video-landscape.mp4";


video.load();

video.play().catch(function () {

    /*
        Agar autoplay block ho
        (rare on iOS), silently ignore
    */

});


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

