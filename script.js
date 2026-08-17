/* =========================
   GREETINGS
========================= */

const greetings = [

    "Hello",
    "नमस्ते",
    "नमस्कार",
    "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
    "नमस्कार",
    "કેમ છો",
    "নমস্কার",
    "ଓଡ଼ିଆ ନମସ୍କାର",
    "నమస్కారం",
    "ನಮಸ್ಕಾರ",
    "வணக்கம்",
    "നമസ്കാരം",
    "ನಮಸ್ಕಾರ",
    "मरहबा",
    "السلام عليكم",
    "Hello"

];


/* =========================
   ELEMENTS
========================= */

const greetingElement =
    document.getElementById("greeting");

const counterElement =
    document.getElementById("counter");


/* =========================
   SETTINGS
========================= */

const totalDuration = 7000; // 7 seconds


/* =========================
   START TIME
========================= */

const startTime = performance.now();


/* =========================
   ANIMATION
========================= */

function updateIntro(currentTime) {

    const elapsed =
        currentTime - startTime;

    const progress =
        Math.min(
            elapsed / totalDuration,
            1
        );


    /* =========================
       GREETING
    ========================= */

    const greetingIndex =
        Math.min(
            Math.floor(
                progress * greetings.length
            ),
            greetings.length - 1
        );


    if (
        greetingElement.dataset.index
        !== String(greetingIndex)
    ) {

        greetingElement.dataset.index =
            String(greetingIndex);

        greetingElement.textContent =
            greetings[greetingIndex];

        greetingElement.classList.remove("show");

        void greetingElement.offsetWidth;

        greetingElement.classList.add("show");
    }


    /* =========================
       COUNTER
    ========================= */

    const number =
        Math.min(
            Math.floor(progress * 100) + 1,
            100
        );

    counterElement.textContent = number;


    /* =========================
       CONTINUE
    ========================= */

    if (progress < 1) {

        requestAnimationFrame(
            updateIntro
        );

    } else {

        counterElement.textContent = "100";

        greetingElement.textContent =
            greetings[greetings.length - 1];
    }
}


/* =========================
   START
========================= */

requestAnimationFrame(updateIntro);
