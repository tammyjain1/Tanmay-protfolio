const greetings = [

    "Hello",
    "नमस्ते",
    "नमस्कार",
    "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
    "નમસ્તે",
    "নমস্কার",
    "ଓଡ଼ିଆ ନମସ୍କାର",
    "నమస్కారం",
    "ನಮಸ್ಕಾರ",
    "வணக்கம்",
    "നമസ്കാര",
    "मरहबा",
    "السلام عليكم",
    "Hello"

];


const greetingElement =
    document.getElementById("greeting");

const counterElement =
    document.getElementById("counter");


/*
    COMPLETE INTRO = 4 SECONDS
*/

const totalDuration = 4000;


const startTime =
    performance.now();


function updateIntro(currentTime) {

    const elapsed =
        currentTime - startTime;


    const progress =
        Math.min(
            elapsed / totalDuration,
            1
        );


    /*
        GREETING
    */

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


        greetingElement.classList.remove(
            "show"
        );


        void greetingElement.offsetWidth;


        greetingElement.classList.add(
            "show"
        );
    }


    /*
        COUNTER
    */

    const number =
        Math.min(
            Math.floor(
                progress * 100
            ) + 1,
            100
        );


    counterElement.textContent =
        number;


    /*
        CONTINUE
    */

    if (progress < 1) {

        requestAnimationFrame(
            updateIntro
        );

    } else {

        counterElement.textContent =
            "100";


        setTimeout(function () {

            window.location.href =
                "home.html";

        }, 400);

    }

}


requestAnimationFrame(
    updateIntro
);
